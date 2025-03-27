import { Link } from "react-router";
import { CgShoppingCart } from "react-icons/cg";
import { FaCreditCard } from "react-icons/fa";
import type { Route } from "./+types/productdetail";

import { db } from "~/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export async function loader({ params }: Route.ComponentProps) {
  const { id, name } = params;

  console.log(params);

  if (!id) {
    console.error("ID não fornecido!");
    return null;
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = docSnap.data();
      product.id = id; // Adicionando o id ao objeto do produto
      return { product };
    } else {
      console.log("Produto não encontrado");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: any) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Produto adicionado ao carrinho!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-xl font-semibold mb-4">
        Kz{" "}
        {product.price.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>

      <div className="flex gap-2 justify-between items-center mb-4">
        <p>Quantidade</p>
        <div className="flex gap-8 bg-gray-100 p-2 rounded">
          <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <button
          onClick={addToCart}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <CgShoppingCart className="mr-2" /> Adicionar ao carrinho
        </button>
        <Link
          to={`/facturação?name=${product.name}`}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <FaCreditCard className="mr-2" /> Comprar Agora
        </Link>
      </div>
      <p className="text-lg mb-4">
        <div className="mt-2">
          <b>Descrição:</b> <br />
        </div>
        {product.description}
      </p>
    </div>
  );
}
