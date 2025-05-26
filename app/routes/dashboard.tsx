import { useEffect, useState } from "react";
import { Link } from "react-router";
import jsPDF from "jspdf";
import AccountSection from "~/components/AccountSection";
import { userCookie } from "~/utils/cookie";
import { requireAuth } from "~/utils/protect";
import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";
import { gerarFaturaPDF } from "~/utils/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meu Perfil" },
    {
      name: "description",
      content: "Pagina onde podes gerenciares as tuas informações!",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  let cookieString = request.headers.get("Cookie");
  let user = await userCookie.parse(cookieString || "");

  return { user };
}

export async function action() {
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

  const [order, setOrder] = useState<any[]>([]);

  console.log(order);
  

  
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setOrder(cart);
  }, []);

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
      <AccountSection title="Encomendas" count={order.length} desc="Nenhum" />
      <AccountSection
        title="Ajuda"
        desc={"Entra em contacto connosco pra que possamos te ajudar"}
      />

      {/* Botão para baixar fatura */}
      <button
        onClick={() =>   gerarFaturaPDF(user, order)}
        type="button"
        className="bg-green-700 cursor-pointer text-white rounded-xl px-4 py-2 w-full mt-4"
      >
        Baixar Fatura em PDF
      </button>

      {/* Logout */}
      <form method="post">
        <button className="text-red-600 text-center mt-12 w-full pointer">
          Terminar Sessão
        </button>
      </form>
    </div>
  );
}
