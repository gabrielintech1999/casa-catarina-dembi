import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useCart } from "../context/CartContext"; // 🔹 Importando o contexto

export async function loader({ params }) {
  const { id } = params;

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

const ProductDetail = () => {
  const { product } = useLoaderData();
  const { addToCart } = useCart(); // 🔹 Usando o contexto do carrinho

  console.log(product);

  const [selectedImage, setSelectedImage] = useState(
    product ? product.image[0] : ""
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [quantity, setQuantity] = useState(1); // 🔹 Estado para a quantidade

  if (!product) {
    return <p>Produto não encontrado ou erro ao carregar os dados.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="relative">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-80 h-80 object-cover my-4 cursor-pointer rounded-lg border shadow-md"
          onClick={() => setIsFullScreen(true)}
        />
      </div>
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {product.image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            className={`w-16 h-16 object-cover cursor-pointer border rounded-md ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold text-green-600">Kz {product.price}</p>
      <p className="text-sm text-gray-500">
        Estoque disponível: {product.stock}
      </p>

      <div className="mt-2">
        <label className="block text-sm">Quantidade:</label>
        <input
          type="number"
          min="1"
          max={Number(product.stock)}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-1 w-16"
        />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          })
        }
      >
        Adicionar ao Carrinho
      </button>

      <Link
        to={`/facturaçao?name=${encodeURIComponent(product.name)}&price=${
          product.price
        }&id=${product.id}`}
        className="inline-block px-4 py-2 bg-red-500 text-white rounded mt-4"
      >
        Comprar Agora
      </Link>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Avaliações:</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border p-2 mt-2">
              <p className="text-sm font-bold">{review.user}</p>
              <p className="text-sm text-yellow-500">
                {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">Nenhuma avaliação disponível.</p>
        )}
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsFullScreen(false)}
          >
            ✖
          </button>
          <img
            src={selectedImage}
            alt="Imagem Ampliada"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;