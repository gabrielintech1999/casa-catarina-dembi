// Import Swiper React components
import {Link} from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function Carroussel() {
  return (
    <Swiper
      loop={true}
      spaceBetween={0}
      navigation={true}
      slidesPerView={1}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, // Continua mesmo após interação do usuário
      }}
    >
      {/* Renderizar slides dinamicamente */}
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src="https://media.istockphoto.com/id/1413950709/photo/young-afro-woman-using-mobile-phone-at-coffee-shop.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=bTYbxmyfRtOt8ZXen5jDw835fi1YCWh6OziUtNFivLI="
              alt={`banner-home-${index}`}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default function Home() {
  return (
    <main>
      {/* Carrossel */}
      <Carroussel />

      {/* Produtos */}
      <div className="content">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <article className="product" key={index}>
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
