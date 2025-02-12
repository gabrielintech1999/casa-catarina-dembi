import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id, name } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Simulação de API (Substituir pelo fetch real)
    setTimeout(() => {
      const productData = {
        id,
        name,
        price: 200,
        description: "Este é um ótimo produto com excelente qualidade!",
        images: [
          "https://forprint.pt/image/cache/data/5602024006102-1000x1000.jpg",
          "https://sacaria.vteximg.com.br/arquivos/ids/155447-1000-1000/Alfinete-Prata-N%C2%AA-01---Trader.jpg?v=637172801988600000",
          "https://cdn.awsli.com.br/800x800/1812/1812949/produto/187389323ef0fa2da8f.jpg",
          "https://i.pinimg.com/736x/3d/5d/b6/3d5db6abf5eaa4ad6cdaa11b0d162e7a.jpg",
        ],
        stock: 10,
        reviews: [
          { user: "João", rating: 5, comment: "Produto incrível!" },
          { user: "Ana", rating: 4, comment: "Gostei bastante, recomendo!" },
        ],
      };

      setProduct(productData);
      setSelectedImage(productData.images[0]); // Define a primeira imagem como padrão
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      {/* Imagem principal com clique para tela cheia */}
      <div className="relative">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-80 h-80 object-cover my-4 cursor-pointer rounded-lg border shadow-md"
          onClick={() => setIsFullScreen(true)}
        />
      </div>
      {/* Miniaturas das imagens */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {product.images.map((img, index) => (
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
      </button>{" "}
      <br />

      <Link  to="/facturaçao?name=Silken%20Natural%20Hair%20Soft%20&%20Rich%20Condicionador&price=15000&id=0REjMYouYgFi2rCMUtSq" className="inline-block  px-4 py-2 bg-red-500 text-white rounded mt-4">
        Comprar Agora
      </Link>
      {/* Avaliações dos usuários */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Avaliações:</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="border p-2 mt-2">
            <p className="text-sm font-bold">{review.user}</p>
            <p className="text-sm text-yellow-500">
              {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
      {/* Modal de imagem em tela cheia */}
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
