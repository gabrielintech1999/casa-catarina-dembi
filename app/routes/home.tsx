import { Link, useLoaderData, useSearchParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AcademicCapIcon, BeakerIcon, BriefcaseIcon, CubeTransparentIcon, DevicePhoneMobileIcon, ScissorsIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { db } from "~/utils/firebase";
import type { Route } from "./+types/home";


const slideImages = [
  "https://media.istockphoto.com/id/1413950709/photo/young-afro-woman-using-mobile-phone-at-coffee-shop.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=bTYbxmyfRtOt8ZXen5jDw835fi1YCWh6OziUtNFivLI=",
  "https://media.istockphoto.com/id/1413950709/photo/young-afro-woman-using-mobile-phone-at-coffee-shop.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=bTYbxmyfRtOt8ZXen5jDw835fi1YCWh6OziUtNFivLI=",
  "https://media.istockphoto.com/id/1413950709/photo/young-afro-woman-using-mobile-phone-at-coffee-shop.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=bTYbxmyfRtOt8ZXen5jDw835fi1YCWh6OziUtNFivLI=",

]



export async function loader() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {productsList};
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Response("Failed to fetch products", { status: 500 });
  }
}

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
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-64 object-cover"
              src="https://media.istockphoto.com/id/1413950709/photo/young-afro-woman-using-mobile-phone-at-coffee-shop.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=bTYbxmyfRtOt8ZXen5jDw835fi1YCWh6OziUtNFivLI="
              alt={`banner-home-${index}`}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default function Home({loaderData}: Route.ComponentProps) {

  const { productsList } = loaderData;


  //console.log(productList);
  
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    if (message) {
      setWelcomeMessage(message);
      setTimeout(() => setWelcomeMessage(""), 5000);
    }
  }, []);

  

  const categories = [
    { name: "Cosméticos", icon: SparklesIcon, value: "cosmeticos" },
    {
      name: "Material Escolar",
      icon: AcademicCapIcon,
      value: "Material escolar",
    },
    {
      name: "Materiais de Costura",
      icon: ScissorsIcon,
      value: "Matérias de Costura",
    },
    {
      name: "Material de Escritório",
      icon: BriefcaseIcon,
      value: "Material escolar",
    },
    { name: "Higiene", icon: BeakerIcon, value: "Higiene" },
    { name: "Eletrônicos", icon: DevicePhoneMobileIcon, value: "Eletronicos" },
  ];

  const scrollCategories = () => {
    const container = document.querySelector('.categories-container .flex');
    container.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <>
      {welcomeMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
          {welcomeMessage}
        </div>
      )}
      <Carroussel />

      {/* Filtros */}
      <div className="categories-container my-4 relative">
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap px-4">
          {categories.map(({ name, icon: Icon, value }, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 transition"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              {name}
            </button>
          ))}
          <button
  
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 transition"
          >
            <CubeTransparentIcon className="w-5 h-5 text-gray-500" />
            Mostrar Todos
          </button>
        </div>
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md cursor-pointer"
          onClick={scrollCategories}
        >
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>

      {/* Produtos filtrados */}
      <div className="products-container grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 p-2">
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
}

function ProductCard({ id, name, image, price }) {

  return (
    <article
      className="product border rounded-lg p-4 flex flex-col items-center"
      key={id}
    >
      <Link to={`/items/${name}/${id}`}>
        <div className="w-full h-40 mb-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div> 
        <div className="info text-left">
          <div className="font-bold mb-2">{name}</div>
          <div className="text-lg text-green-600 mb-2">
            Kz <strong>{price}</strong>
          </div>
        </div>
      </Link>
    </article>
  );
}



