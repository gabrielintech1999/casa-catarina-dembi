// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// function ProductDetail() {
//   const { id, name } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log(id, name);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         // Referência ao documento do produto no Firestore
//         const productRef = doc(db, "products", id);
//         const productSnap = await getDoc(productRef);

//         if (productSnap.exists()) {
//           // Se o produto existir, armazene os dados no estado
//           setProduct(productSnap.data());
//         } else {
//           console.log("Produto não encontrado!");
//         }
//       } catch (error) {
//         console.error("Erro ao buscar produto:", error);
//       } finally {
//         setLoading(false); // Finaliza o carregamento
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return <p className="mt-24 h-screen">Carregando...</p>; // Exibe uma mensagem de carregamento
//   }

//   if (!product) {
//     return <p>Produto não encontrado.</p>; // Exibe uma mensagem se o produto não for encontrado
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//       <img src={product.image} alt={product.name} className="w-64 h-64 my-4" />
//       <p className="text-lg text-gray-700">{product.description}</p>
//       <p className="text-xl font-semibold text-green-600">Kz {product.price}</p>
//       <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//         Adicionar ao Carrinho
//       </button>
//     </div>
//   );
// }

// export default ProductDetail;



import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id, name } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de API (Substituir pelo fetch real)
    setTimeout(() => {
      setProduct({
        id,
        name,
        price: 200,
        description: "Este é um ótimo produto com excelente qualidade!",
        image: "/path-to-image.jpg",
        stock: 10,
        reviews: [
          { user: "João", rating: 5, comment: "Produto incrível!" },
          { user: "Ana", rating: 4, comment: "Gostei bastante, recomendo!" },
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg">Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-64 h-64 my-4" />
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold text-green-600">Kz {product.price}</p>
      <p className="text-sm text-gray-500">
        Estoque disponível: {product.stock}
      </p>

      {/* Seletor de quantidade */}
      <div className="mt-2">
        <label className="block text-sm">Quantidade:</label>
        <input
          type="number"
          min="1"
          max={product.stock}
          defaultValue="1"
          className="border p-1 w-16"
        />
      </div>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Adicionar ao Carrinho
      </button>

      {/* Avaliações dos usuários */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Avaliações:</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="border p-2 mt-2">
            <p className="text-sm font-bold">{review.user}</p>
            <p className="text-sm text-yellow-500">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
