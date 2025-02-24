import { useState } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function loader() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { productsList };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Response("Failed to fetch products", { status: 500 });
  }
}

export default function Results() {
  const { productsList } = useLoaderData(); // Carregar os dados do loader
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtra os produtos com base na pesquisa do usuário
  const filteredProducts = productsList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Cabeçalho com botão de voltar */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 hover:text-blue-500"
        >
          <ArrowLeftIcon className="w-6 h-6 mr-2" /> Voltar
        </button>
        <button className="text-gray-700 hover:text-red-500">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Barra de busca */}
      <div className="relative w-full max-w-3xl mx-auto mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
        <input
          type="search"
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de produtos */}
      <div className="flex flex-col gap-4 p-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({ id, name, image, price }) {
  return (
    <article className="border rounded-lg p-4 flex flex-col items-center bg-gray-50 shadow-sm w-full aspect-square">
      <Link to={`/produtos/${id}/${name}`} className="w-full h-full flex flex-col">
        <div className="w-full h-40 flex-grow mb-2">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="w-full text-center px-2 flex flex-col items-center">
          <div className="font-bold text-sm md:text-lg truncate w-full">{name}</div>
          <div className="text-green-600 text-sm md:text-lg font-semibold mt-1">
            Kz {price.toLocaleString("pt-AO")}
          </div>
        </div>
      </Link>
    </article>
  );
}
