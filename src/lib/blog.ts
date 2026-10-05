import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured, supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";
import type { Post, PostInput } from "./blog-shared";

export * from "./blog-shared";

const T = "posts";

// Public reads use the publishable key without cookies, so blog pages can be cached.
// RLS only returns published posts to this client.
function publicDb() {
  return createClient(supabaseUrl, supabasePublishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Published posts, newest first. Never throws: a missing table just means no posts yet. */
export async function listPublished(): Promise<Post[]> {
  if (!supabaseConfigured) return [];
  const { data, error } = await publicDb().from(T).select("*").eq("status", "published").lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }).limit(500);
  if (error) {
    console.error("blog: list failed", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPublished(slug: string): Promise<Post | null> {
  return (await listPublished()).find((p) => p.slug === slug) ?? null;
}

/* ---------- Admin ---------- */
export async function listAllPosts(): Promise<Post[]> {
  const { data, error } = await createAdminClient().from(T).select("*").order("updated_at", { ascending: false }).limit(1000);
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data } = await createAdminClient().from(T).select("*").eq("id", id).maybeSingle();
  return (data as Post | null) ?? null;
}


/** Create or update. Publishing for the first time stamps published_at (unless one was scheduled). */
export async function savePost(input: PostInput): Promise<Post> {
  const now = new Date().toISOString();
  const published_at = input.status === "published" ? input.published_at || now : input.published_at || null;
  const row = { ...input, published_at, updated_at: now };

  const db = createAdminClient();
  const { id, ...fields } = row;
  const q = id ? db.from(T).update(fields).eq("id", id) : db.from(T).insert(fields);
  const { data, error } = await q.select("*").single();
  if (error) throw new Error(error.code === "23505" ? "Another post already uses that URL slug." : error.message);
  return data as Post;
}

export async function deletePost(id: string) {
  const { error } = await createAdminClient().from(T).delete().eq("id", id);
  if (error) throw error;
}
