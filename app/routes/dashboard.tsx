import { requireAuth } from "~/utils/protect";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seja Bem-vindo" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
     await requireAuth(request);
  return null;
}


export default function Dashboard() {
  return (
    <div>
      <h1> Dashboard Page </h1>
    </div>
  );
}

// <div className="bg-red-600 p-4 text-white font-bold">
// <h1>Hello home</h1>
// </div>
