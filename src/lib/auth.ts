import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "";
const AUTH_TOKEN = process.env.AUTH_TOKEN || "";

export function createToken() {
  const payload = {
    t: AUTH_TOKEN,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    const result = jwt.verify(token, JWT_SECRET);
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    return result && result.t === AUTH_TOKEN;
  } catch (err) {
    return false;
  }
}

export async function isLoggedIn() {
  "use server";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token);
  if (!token) {
    return false;
  }
  return verifyToken(token);
}
