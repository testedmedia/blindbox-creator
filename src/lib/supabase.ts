import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let _supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables not configured");
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export async function addToWaitlist(email: string, role?: string) {
  const { data, error } = await getSupabase()
    .from("blindbox_waitlist")
    .upsert({ email, role }, { onConflict: "email" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createOrder(order: {
  email: string;
  stripe_session_id?: string;
  stripe_payment_intent?: string;
  products: { id: string; name: string; qty: number; price: number }[];
  total_cents: number;
  status?: string;
}) {
  const { data, error } = await getSupabase()
    .from("blindbox_orders")
    .insert(order)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createSubscription(sub: {
  email: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  tier: string;
}) {
  const { data, error } = await getSupabase()
    .from("blindbox_subscriptions")
    .upsert(sub, { onConflict: "email" })
    .select()
    .single();

  if (error) throw error;
  return data;
}
