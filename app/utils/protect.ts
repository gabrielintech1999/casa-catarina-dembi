import { redirect } from "react-router";
import { getUserFromCookie } from "./cookie";

export async function requireAuth(request: Request) {
    // const session = getCookie("session");


    const user = await getUserFromCookie(request);

     const pathname = new URL(request.url).pathname;
   
     if (!user) {
       throw redirect(
         `/iniciar-sessao?message=voce deve iniciar a sessao primeiro.&redirectTo=${pathname}`
       );
     }

     return user;
   }