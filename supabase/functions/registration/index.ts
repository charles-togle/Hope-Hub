// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "npm:@supabase/supabase-js@2.43.4";

interface lectureProgress {
  title: string;
  key: string;
  status: string;
}

interface reqPayLoad {
  email: string;
  password: string;
  name: string;
  userType: "student" | "teacher";
  classCode: null;
  lectureProgress: lectureProgress[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { userData }: { userData: reqPayLoad } = await req.json();
  const { email, password, name, userType, lectureProgress } = userData;
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedName = name.trim();

  const fields = [trimmedEmail, trimmedPassword, trimmedName];
  const areAllFieldsFilled = fields.every((field) => field !== "");

  if (!areAllFieldsFilled) {
    return new Response(
      JSON.stringify({ message: "Please fill in all required fields" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: trimmedPassword,
      options: {
        emailRedirectTo:
          "https://hope-hub-fitness.vercel.app/auth/account-verification",
        data: {
          fullName: trimmedName,
          userType: userType,
          classCode: null,
          lectureProgress: lectureProgress,
          password: trimmedPassword,
        },
      },
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ data }), {
      headers: {...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const errorMessage = (err && typeof err === "object" && "message" in err)
      ? (err as { message: string }).message
      : String(err);

    return new Response(JSON.stringify({ message: errorMessage }), {
      headers: {...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
