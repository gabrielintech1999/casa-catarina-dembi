import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();

  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchTerm);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Atualiza a URL com o parâmetro de pesquisa
    setSearchParams(value ? { pesquisa: value } : {});
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col p-4 bg-white shadow-md">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Profile Section */}
        <div className="border border-gray-300 rounded-full w-12 h-12 overflow-hidden">
          <Link to="/perfil">
            {false ? (
              <img src="user.photoURL" alt="Perfil" className="w-12 h-12" />
            ) : (
              <UserCircleIcon className="w-12 h-12" />
            )}
          </Link>
        </div>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">
          <Link to="/">Casa Catarina Dembi</Link>
        </h1>

        {/* Shopping Cart */}
        <div>
          <Link to="carinho-de-compras">
            <ShoppingBagIcon className="h-8 w-8 text-green-600 hover:text-green-800 transition duration-200" />
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <Link to={"/resultados"}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
            id="search"
            type="search"
            placeholder="buscar produtos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav>
        <div className="flex gap-5 text-lg font-medium text-gray-600">
          <Link to="/" className="hover:text-green-600 transition duration-200">
            Produtos
          </Link>
          <Link
            to="checkout"
            className="hover:text-green-600 transition duration-200"
          >
            Facturação
          </Link>
          <Link
            to="about"
            className="hover:text-green-600 transition duration-200"
          >
            Sobre Nós
          </Link>
        </div>
      </nav>
    </header>
  );
}
