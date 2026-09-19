
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

const emailInput = document.getElementById("adminEmail");
const passwordInput = document.getElementById("adminPassword");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

async function adminLogin() {
  loginMessage.textContent = "Logging in...";

  const { data, error } = await db.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: passwordInput.value
  });

  if (error) {
    loginMessage.textContent = error.message;
    return;
  }

  const user = data.user;

  const { data: admin, error: adminError } = await db
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    await db.auth.signOut();
    loginMessage.textContent = "Admin access denied.";
    return;
  }

  loginSection.hidden = true;
  dashboardSection.hidden = false;

  await loadBusinesses();
  await loadPendingPhotos();
}

async function logout() {
  await db.auth.signOut();

  loginSection.hidden = false;
  dashboardSection.hidden = true;
}

loginButton.addEventListener("click", adminLogin);

document
  .getElementById("logoutButton")
  ?.addEventListener("click", logout);
