import "@/app/globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import BlogConfig from "@/lib/config";
import type { Metadata } from "next";
import { logout } from "@/app/lib/actions";
import { isLoggedIn } from "@/lib/auth";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const cejk = localFont({
  src: "./fonts/cejk-03-W03.ttf",
});

const blogTitle = process.env.BLOG_TITLE || "My Blog";
const blogDescription = process.env.BLOG_DESCRIPTION || "My personal blog";

export const metadata: Metadata = {
  title: {
    default: blogTitle,
    template: "%s | " + blogTitle,
  },
  description: blogDescription,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const login = await isLoggedIn();
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <body
        className={`${cejk.className} ${inter.className} h-full overflow-y-auto mx-auto px-4 flex flex-col items-center leading-relaxed tracking-wide text-gray-800 xl:w-1/2 lg:w-2/3 md:w-3/4 sm:w-4/5`}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-2xl text-gray-600 my-6">
            <Link href="/">{BlogConfig.title}</Link>
          </h1>
          {login && <button onClick={logout}>Logout</button>}
          {!login && (
            <Link href="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
        <div className="w-full flex-grow flex flex-col items-center justify-center">
          {children}
        </div>
        <div className="flex-grow-0 text-sm text-gray-400 py-4">
          Copyright &copy; {year}. All rights reserved.
        </div>{" "}
      </body>
    </html>
  );
}
