import "server-only";

/**
 * The members' WhatsApp community invite. Server-only on purpose: site.ts ships to every
 * visitor's browser, so the link lives here and is only rendered on member pages (welcome,
 * dashboard). WHATSAPP_INVITE_URL overrides it; the old public variable still works.
 */
export const whatsappInvite =
  process.env.WHATSAPP_INVITE_URL || process.env.NEXT_PUBLIC_WHATSAPP_INVITE_URL || "https://chat.whatsapp.com/Kvs4bhjMYC0KNmvF3mYESn";
