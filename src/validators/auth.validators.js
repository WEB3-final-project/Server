export const validateCreateUserData = (body) => {
  const { email, password } = body;
  if (!email || !password) {
    return "Email and password are required";
  }
  if (password.length < 8) {
    return "Password too short";
  }
  if (password.length > 100) {
    return "Password too long";
  }
  if (email.length > 100) {
    return "Email too long";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format";
  }
  return null;
}
export const validateLoginUser = (body) => {
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  return null;
}