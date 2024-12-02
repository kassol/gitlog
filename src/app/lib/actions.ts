"use server";
import { cookies } from "next/headers";
import { createToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const accessCode = process.env.ACCESS_CODE || "";

export async function login(formData: FormData) {
  const password = formData.get("password");
  console.log(password, accessCode);
  if (password === accessCode) {
    const token = createToken();
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });
    revalidatePath("/");
    redirect("/");
  } else {
    revalidatePath("/login");
    return redirect("/login?error=Invalid access code");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");
  redirect("/");
}
