import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/cart";
import { FaCreditCard } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { useState, useEffect } from "react";

import { IoIosArrowRoundBack } from "react-icons/io"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "carinho de compras" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (items: any[]) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
  <div className="min-h-screen bg-white p-4 max-w-md mx-auto overflow-auto my-5">
      <header className=" p-2 bg-white shadow-md md:flex-row md:justify-between md:items-center">
      <button onClick={() => navigate(-1)}>
      <IoIosArrowRoundBack size={30}  />
      </button>
      </header>
      <div className="p-4 h-screen">
    
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2>Carrinho Vazio</h2>
          <p>
            Adicione produtos ao carrinho clicando no botão{" "}
            <b>Adicionar ao Carrinho</b> na página de detalhes do produto
          </p>
        </div>
      ) : (
        cartItems.map((item) => (
          <article key={item.id} className="flex gap-4">
            <div>
              <img src={item.image} alt={item.name} />
            </div>
            <div>
              <div>
                <h3>{item.name}</h3>
                <b>
                  {item.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  Kz
                </b>
              </div>
              <div className="flex gap-8 bg-gray-100 p-2 rounded">
                <button onClick={() => removeItem(item.id)}>
                  <GoTrash />
                </button>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          </article>
        ))
      )}
      <div className="flex justify-between items-center my-4">
        <p>Total</p>
        <b>
          {total.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          Kz
        </b>
      </div>
      <div>
        {cartItems.length > 0 && (
          <Link
            to="/facturacao"
            className="bg-green-600 text-white p-2 rounded flex items-center gap-2"
          >
            <FaCreditCard />
            Finalizar Compra
          </Link>
        )}
        <Link
          to="/"
          className="bg-gray-200 text-gray-700 p-2 rounded flex items-center gap-2 mt-2"
        >
          <FaCreditCard />
          Continuar Comprando
        </Link>

      </div>
    </div>
  </div>
  );
}
