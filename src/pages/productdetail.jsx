import "../style/productdetail.css";

function ProductDetail() {
  return (
    <main>
      <article className="product-card">
        <div className="product-image">
          <img
            src="https://m.media-amazon.com/images/I/413K0MlBc7L._SX300_SY300_QL70_FMwebp_.jpg"
            alt="Perfume Matte"
          />
        </div>
        <div className="product-details">
          <h2 className="product-title">Perfume Matte</h2>
          <p className="product-category">
            Categoria: <span>Fragrâncias</span>
          </p>
          <p className="product-price">Kz 15,000</p>
          <p className="product-description">
            Uma fragrância suave e marcante que combina frescor e elegância.
            Ideal para todas as ocasiões.
          </p>
          <button className="buy-button">Comprar</button>
        </div>
      </article>
    </main>
  );
}

export default ProductDetail;
