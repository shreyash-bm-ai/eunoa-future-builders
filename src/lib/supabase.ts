import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Guard: warn in dev if env vars are missing.
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(
    "[Eunoa] Supabase env vars not found. " +
      "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. " +
      "Auth features will not work until these are provided."
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ─── Types ────────────────────────────────────────────────────────────────────
export type UserProfile = {
  id: string;
  email: string;
  parent_name: string;
  phone: string;
  child_name: string;
  child_grade: string;
  created_at?: string;
};

// ─── Auth helpers ─────────────────────────────────────────────────────────────
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: Omit<UserProfile, "id" | "created_at" | "email">
) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase.from("registrations").insert({
      id: data.user.id,
      email,
      parent_name: profile.parent_name,
      phone: profile.phone,
      child_name: profile.child_name,
      child_grade: profile.child_grade,
    });
    if (profileError) console.error("Profile insert error:", profileError);
  }

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}
