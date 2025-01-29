import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ProductDetail() {
  const { id, name } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(id, name);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Referência ao documento do produto no Firestore
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          // Se o produto existir, armazene os dados no estado
          setProduct(productSnap.data());
        } else {
          console.log("Produto não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="mt-24 h-screen">Carregando...</p>; // Exibe uma mensagem de carregamento
  }

  if (!product) {
    return <p>Produto não encontrado.</p>; // Exibe uma mensagem se o produto não for encontrado
  }

  return (
    <main>
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-category">
          Categoria: <span>{product.category}</span>
        </p>
        <p className="product-price">Kz {product.price}</p>
        <p className="product-description">{product.description}</p>
        <button className="buy-button">Addicionar ao carinho</button>
      </div>
    </article>
  </main>
  );
}

export default ProductDetail;
