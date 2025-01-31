import { useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Para navegação no React Router

  // Sugestões simuladas (pode substituir por dados reais)
  const suggestions = ["Alfinete de Prata", "Agulha de Costura", "Tesoura", "Linha de Algodão"]
    .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center p-6">
      {/* Cabeçalho com botão de voltar */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4">
        <button onClick={() => navigate("/")} className="flex items-center text-gray-700 hover:text-blue-500">
          <ArrowLeftIcon className="w-6 h-6 mr-2" /> Voltar
        </button>
        <button className="text-gray-700 hover:text-red-500">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Barra de busca */}
      <div className="relative w-full max-w-lg">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        <input
          type="search"
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-10 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sugestões de pesquisa */}
      {searchTerm && (
        <ul className="mt-4 w-full max-w-lg bg-gray-100 rounded-lg shadow-md p-2">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer rounded-md">
                {item}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Nenhum resultado encontrado.</li>
          )}
        </ul>
      )}
    </div>
  );
}
