const USERS_KEY = "tc_users";
const SESSION_KEY = "tc_session";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser({ name, email, password }) {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }
  const passwordHash = await hashPassword(password);
  const user = { id: crypto.randomUUID(), name, email: email.toLowerCase(), passwordHash };
  saveUsers([...users, user]);
  return { success: true, user: { id: user.id, name: user.name, email: user.email } };
}

export async function loginUser({ email, password }) {
  const users = getUsers();
  const passwordHash = await hashPassword(password);
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === passwordHash
  );
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
