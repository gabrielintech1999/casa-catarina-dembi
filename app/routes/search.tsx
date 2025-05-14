import { collection, getDocs } from "firebase/firestore";
import { useLoaderData, Await, Link } from "react-router";
import { Suspense, useState, useMemo } from "react";
import type { Route } from "./+types/search";
import { db } from "~/utils/firebase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Encontre os seus items favoritos" },
    {
      name: "description",
      content: "Pesquise e encontre produtos de qualidade!",
    },
  ];
}

interface Product {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
  description?: string;
}

const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export function loader() {

   let products = fetchProducts()

  return { products };
}

export default function Results() {
  const { products } = useLoaderData() as { products: Promise<Product[]> };
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  const filteredProducts = useMemo(() => {
    return (productsList: Product[]) => {
      if (!inputValue.trim()) {
        return productsList;
      }
      return productsList.filter((product) =>
        product.name.toLowerCase().includes(inputValue.toLowerCase())
      );
    };
  }, [inputValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nossos Produtos</h1>
      <div className="mb-6">
        <div className="flex">
          <input
            aria-label="pesquisar por produtos"
            id="buscar"
            name="q"
            placeholder="Buscar produtos"
            type="search"
            value={inputValue}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-l w-full"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            aria-label="Limpar busca"
          >
            {inputValue ? "✕" : "Buscar"}
          </button>
        </div>
      </div>

      <Suspense
        fallback={<p className="text-center">Carregando produtos...</p>}
      >
        <Await resolve={products}>
          {(productsList) => (
            <>
              {inputValue && (
                <p className="mb-4">
                  {filteredProducts(productsList).length}{" "}
                  {filteredProducts(productsList).length === 1
                    ? "resultado"
                    : "resultados"}{" "}
                  para "{inputValue}"
                </p>
              )}
              {!filteredProducts(productsList) ||
              filteredProducts(productsList).length === 0 ? (
                <div className="p-6 text-center bg-gray-100 rounded">
                  <p className="text-lg">
                    Nenhum produto encontrado
                    {inputValue ? ` para "${inputValue}"` : ""}.
                  </p>
                  {inputValue && (
                    <button
                      onClick={() => setInputValue("")}
                      className="mt-2 text-blue-500 hover:underline"
                    >
                      Limpar busca
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts(productsList).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {

  console.log(product)
  return (
    <article className="rounded p-4 hover:shadow-lg transition-shadow">
    <Link to={`/items/${product.name}/${product.id}`}>
        {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover mb-2"
        />
      )}
      <h2 className="text-lg font-semibold">{product.name}</h2>
      {product.price !== undefined && (
        <p className="text-gray-700">
          Kz{" "}
          {product.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      )}
      {product.description && (
        <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
      )}
    </Link>
    </article>
  );
}
