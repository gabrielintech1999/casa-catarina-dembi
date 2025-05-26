import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router";
import type { Route } from "./+types/congratulations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Obrigada pela compra" },
    {
      name: "description",
      content: "Obrigada por confiares em nós!",
    },
  ];
}

export default function Congratulations() {
  useEffect(() => {
    localStorage.setItem("purchaseConfirmed", "true");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Obrigado pela sua compra!
      </h1>
      <Confetti />
      <p className="text-lg text-gray-600 mb-8">
        Seu pedido foi processado com sucesso.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Voltar à Página Principal
      </Link>
    </div>
  );
}
