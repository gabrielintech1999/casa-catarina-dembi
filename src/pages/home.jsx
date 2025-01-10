import {Link} from "react-router-dom";

export default function Home() {
  return (
    <main>
    <div className="slide">
        <img src="https://media.istockphoto.com/id/1413950709/photo/young-afro-woman-using-mobile-phone-at-coffee-shop.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=bTYbxmyfRtOt8ZXen5jDw835fi1YCWh6OziUtNFivLI=" alt="banner-home" />
      </div>
      <div className="content">

        {Array(10).fill(0).map((_, index) => (
          <article className="product">
          <Link to={`${index + 1}`}>
            <div>
              <img
                src="https://m.media-amazon.com/images/I/413K0MlBc7L._SX300_SY300_QL70_FMwebp_.jpg"
                alt="Produto"
              />
            </div>
            <div className="info">
              <div>Perfume Matte</div>
              <div>
                Kz <strong>15,000</strong>
              </div>
              <div>
                <button className="product-btn">Comprar</button>
              </div>
            </div>
          </Link>
        </article>
        ))}
      </div>
    </main>
  );
}
