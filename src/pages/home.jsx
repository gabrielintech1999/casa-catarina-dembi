// Import Swiper React components
import {Link} from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { db } from '../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

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
  const [products, setProducts] = useState([])



  useEffect(()=>{

  async  function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products")); // Substitua "products" pelo nome da sua coleção
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
    }

    fetchProducts()



  }, [])
  return (
    <main>
      {/* Carrossel */}
      <Carroussel />

      {/* Produtos */}
      <div className="content">
      {products.map((product) => (
          <article className="product" key={product.id}>
            <a href="/pages/productdetail.html">
              <div>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="info">
                <div>{product.name}</div>
                <div>
                  Kz <strong>{product.price}</strong>
                </div>
                <div>
                  <button className="product-btn">Comprar</button>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
