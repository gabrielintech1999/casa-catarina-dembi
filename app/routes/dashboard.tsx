import AccountSection from "~/components/AccountSection";
import { userCookie } from "~/utils/cookie";
import { requireAuth } from "~/utils/protect";
import type { Route } from "./+types/dashboard";
import { Link } from "react-router";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meu Perfil" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  let cookieString = request.headers.get("Cookie");
  let user = await userCookie.parse(cookieString || "");

  return { user };
}

export async function action() {
  // console.log("log out")

  return redirect("/", {
    headers: {
      "Set-Cookie": await userCookie.serialize("", {
        maxAge: 0,
      }),
    },
  });
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData.user;

  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          <a href="/">Casa Catarina Dembi</a>
        </h1>
        <button className="text-2xl">&#9776;</button> {/* Menu hamburguer */}
      </header>

      {/* Conta */}
      <h2 className="text-lg font-medium mb-4">Conta</h2>

      {/* Perfil */}
      <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 mb-4">
        <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
          {user.name[0].toUpperCase()}
        </div>
        <div className="text-sm">
          <p className="font-medium">{user.name}</p>
          <p>+244 {user.phone}</p>
        </div>
      </div>

      {/* Seções */}
      <AccountSection title="Endereços" desc={user.address} />
      <AccountSection title="Cartões" desc={"Nenhum"} />
      <AccountSection title="Encomendas" count={0} desc="Nenhum" />
      <AccountSection title="Ajuda" desc={"Entra em contacto connosco pra que possamos te ajudar"} />

      <form method="post">
        <button className="text-red-600 text-center mt-12 w-full pointer">
          Terminar Sessão
        </button>
      </form>
    </div>
  );
}

// import { userCookie } from "~/utils/cookie";
// import { requireAuth } from "~/utils/protect";
// import type { Route } from "./+types/dashboard";

// export default function Dashboard({ loaderData }: Route.ComponentProps) {

//   const user = loaderData.user;

//   return (
//     <div className="p-4">
//        <h1>Conta</h1>
//       <div className="mx-auto flex w-full  overflow-hidden border-gray-200  border rounded-8 mb-20 max-w-[432px] p-4 gap-4  rounded-12">
//           <div>
//             user
//           </div>
//           <div>
//             <div>{user.name}</div>
//             <div>{user.phone}</div>
//           </div>
//       </div>
//     </div>
//   );
// }

// <div className="bg-red-600 p-4 text-white font-bold">
// <h1>Hello home</h1>
// </div>
