import { Link, useNavigate } from "react-router"; 
import type { Route } from "./+types/cart";
import { FaCreditCard } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Carrinho de Compras" },
    { name: "description", content: "Bem-vindo ao carrinho de compras!" },
  ];
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  console.log(total)

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
    <div className="p-4 max-w-4xl mx-auto">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Carrinho Vazio</h2>
          <p>
            Adicione produtos ao carrinho clicando no botão{" "}
            <b>Adicionar ao Carrinho</b> na página de detalhes do produto.
          </p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 items-center mb-4 border-b pb-4"
            >
              <div className="w-24 h-24 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <b className="text-green-700">
                  {item.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  Kz
                </b>
                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded mt-2">
                  <button onClick={() => removeItem(item.id)} title="Remover">
                    <GoTrash />
                  </button>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </article>
          ))}

          <div className="flex justify-between items-center my-4">
            <p className="text-lg font-semibold">Total</p>
            <b className="text-xl text-green-700">
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              Kz
            </b>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to={`/facturacao?total=${total}&quantity=${cartItems.length}`}
              className="bg-green-600 text-white p-2 rounded flex items-center gap-2 justify-center"
            >
              <FaCreditCard />
              Finalizar Compra
            </Link>
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 p-2 rounded flex items-center gap-2 justify-center"
            >
              <IoIosArrowRoundBack /> 
              Continuar Comprando
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
