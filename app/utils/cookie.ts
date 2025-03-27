import { createCookie } from "react-router";


let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
  console.warn(
    "🚨 No COOKIE_SECRET environment variable set, using default. The app is insecure in production."
  );
  secret = "default-secret";
} 


export const userCookie = createCookie("user", {
    secrets: [secret],
    // 30 days
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
    sameSite: "lax",
  });



export async function getUserFromCookie(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const user = await userCookie.parse(cookieHeader);
    return user;
  }