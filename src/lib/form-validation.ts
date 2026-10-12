/**
 * Field checks for the account forms, shared by the server actions (the real check) and tests.
 * Each returns one plain message per field that needs fixing; an empty object means it's fine.
 */

export type FieldErrors = Partial<Record<"name" | "email" | "password" | "confirm" | "whatsapp", string>>;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function checkEmail(email: string): string | undefined {
  if (!email) return "Enter your email address.";
  if (!EMAIL_RE.test(email)) return "That doesn't look like an email address. Check for a missing @ or dot.";
}

export function checkNewPassword(password: string): string | undefined {
  if (!password) return "Choose a password.";
  if (password.length < 8) return `Use at least 8 characters (that's ${password.length}).`;
}

export function validateSignup(v: { name: string; email: string; password: string; whatsapp: string }): FieldErrors {
  const f: FieldErrors = {};
  if (!v.name) f.name = "Enter your full name.";
  const email = checkEmail(v.email);
  if (email) f.email = email;
  const pw = checkNewPassword(v.password);
  if (pw) f.password = pw;
  // Optional, but if given it must be a real number: we use it to add members to the community.
  const digits = v.whatsapp.replace(/\D/g, "");
  if (v.whatsapp && (digits.length < 10 || digits.length > 15)) f.whatsapp = "Enter a full phone number, like 0803 123 4567, or leave it empty.";
  return f;
}

export function validateNewPassword(password: string, confirm: string): FieldErrors {
  const f: FieldErrors = {};
  const pw = checkNewPassword(password);
  if (pw) f.password = pw;
  else if (password !== confirm) f.confirm = "The two passwords don't match. Type the same password in both boxes.";
  return f;
}

/** The summary line above the button when fields need fixing. */
export const fixFields = (f: FieldErrors) => {
  const n = Object.keys(f).length;
  return n === 1 ? "Please fix the highlighted field." : `Please fix the ${n} highlighted fields.`;
};
