import { useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useSearchParams } from "react-router"; // Correção na importação
import { GoSearch } from "react-icons/go";
import { NavLink } from "react-router";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

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

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">
          <Link to="/">Casa Catarina Dembi</Link>
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Link to="/perfil">
              <CiUser size={38} />
            </Link>
          </div>

          {/* Shopping Cart */}

          <div className="relative">
            <Link to="/carrinho-de-compras">
              <GoSearch className="mr-2 text-4xl" />
            </Link>
          </div>
          <div className="relative">
            <Link to="/carrinho-de-compras">
              <CgShoppingCart className="mr-2 text-4xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <div className="flex gap-5 text-lg font-medium text-gray-600">
          <NavLink to="/"   className={({ isActive }) =>
            `hover:text-green-600 transition duration-200 relative ${
              isActive ? "text-green-600 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-green-600" : ""
            }`
          }>
            Produtos
          </NavLink>
          <NavLink
            to="/sobre-nos"
            className="hover:text-green-600 transition duration-200"
          >
            Sobre Nós
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
