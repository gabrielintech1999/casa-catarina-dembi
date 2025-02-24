import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const  isLoggedIn = null
    const pathname = new URL(request.url).pathname
   // const isLoggedIn = localStorage.getItem("loggedin")

    if (!isLoggedIn) {
        throw redirect(
            `/auth?message=voce deve iniciar a sessão primeiro.&redirectTo=${pathname}`
        )
    }
}




export async function loader({ request }) {
  await requireAuth(request)
  return null;
}



export default function Profile() {
    return (
      <h1  style={{height: "100vh", marginTop:"175px"}}>
          Perfil
      </h1>
    );
  }
  