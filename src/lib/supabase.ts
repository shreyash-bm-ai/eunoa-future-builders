import { createClient, type User } from "@supabase/supabase-js";

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

export type RegistrationMetadata = {
  parent_name: string;
  phone: string;
  child_name: string;
  child_grade: string;
};

function metadataFromUser(user: User): RegistrationMetadata | null {
  const meta = user.user_metadata ?? {};
  const { parent_name, phone, child_name, child_grade } = meta;
  if (
    typeof parent_name !== "string" ||
    typeof phone !== "string" ||
    typeof child_name !== "string" ||
    typeof child_grade !== "string" ||
    !parent_name ||
    !phone ||
    !child_name ||
    !child_grade
  ) {
    return null;
  }
  return { parent_name, phone, child_name, child_grade };
}

/** Create registrations row when user has a session (e.g. after email confirm). Idempotent. */
export async function ensureRegistrationFromUser(user: User) {
  if (!supabase) return;

  const profile = metadataFromUser(user);
  if (!profile) return;

  const { data: existing, error: selectError } = await supabase
    .from("registrations")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (selectError) {
    console.error("[Eunoa] Registration lookup error:", selectError);
    return;
  }
  if (existing) return;

  const { error: insertError } = await supabase.from("registrations").insert({
    id: user.id,
    email: user.email ?? "",
    ...profile,
  });

  if (insertError) {
    console.error("[Eunoa] Registration sync error:", insertError);
  }
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: Omit<UserProfile, "id" | "created_at" | "email">
) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: profile },
  });
  if (error) throw error;

  if (data.session?.user) {
    await ensureRegistrationFromUser(data.session.user);
  }

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  if (data.user) {
    await ensureRegistrationFromUser(data.user);
  }

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
