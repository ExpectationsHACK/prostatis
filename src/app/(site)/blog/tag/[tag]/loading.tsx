import { PageSkeleton } from "@/components/skeleton";

// Shown instantly while this page loads, so slow connections see the page's shape, not a blank screen.
export default function Loading() {
  return <PageSkeleton />;
}
