// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "npm:supabase-js@2";

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
    return new Response("ok", { headers: corsHeaders });
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
      { status: 400, headers: { "Content-Type": "application/json" } },
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
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const errorMessage = (err && typeof err === "object" && "message" in err)
      ? (err as { message: string }).message
      : String(err);

    return new Response(JSON.stringify({ message: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

// const { data, error } = await supabase.auth.signUp({
//   email: email,
//   password: password,
//   options: {
//     emailRedirectTo:
//       "https://hope-hub-fitness.vercel.app/auth/account-verification",
//     data: {
//       fullName: name,
//       userType: userType,
//       classCode: classCode,
//       lectureProgress: lectureProgress,
//       password: password,
//     },
//   },
// });

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/registration' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
