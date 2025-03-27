import { UserCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useSearchParams } from "react-router";

// Importação do contexto do carrinho

export default function Header() {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams(value ? { pesquisa: value } : {});
  }; 

  return (
    <header className="sticky top-0 z-50 flex flex-col p-4 bg-white shadow-md md:flex-row md:justify-between md:items-center">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4 md:mb-0">
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
        <div className="relative">
          <Link to="carinho-de-compras">
          <CgShoppingCart className="mr-2 text-4xl" /> 
            {true > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {0}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 md:mb-0 md:flex-1 md:mx-4">
        <Link to={"/resultados"}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
            id="search"
            type="search"
            placeholder="buscar produtos..."
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
            to="sobre-nos"
            className="hover:text-green-600 transition duration-200"
          >
            Sobre Nós
          </Link>
        </div>
      </nav>
    </header>
  );
}
