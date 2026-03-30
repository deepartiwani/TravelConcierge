/**
 * Validates an email address format.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Returns a password strength descriptor based on the given password string.
 * Returns null when the password is empty.
 */
export function getPasswordStrength(password) {
  if (password.length === 0) return null;
  if (password.length < 8) return { label: "Too short", color: "bg-red-400", width: "w-1/4" };
  if (password.length < 12 && !/[A-Z]/.test(password)) return { label: "Weak", color: "bg-orange-400", width: "w-2/4" };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: "Strong", color: "bg-green-500", width: "w-full" };
  return { label: "Fair", color: "bg-yellow-400", width: "w-3/4" };
}
