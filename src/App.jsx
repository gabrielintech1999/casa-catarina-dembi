import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/home";
import { Cart } from "./pages/cart";
import { useState, useEffect } from "react";
import {
  CheckBadgeIcon,
  ShoppingBagIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

import ProductDetail, { loader as detailLoader } from "./pages/productdetail";
import Profile from "./pages/profile";
import Auth from "./pages/auth";
import RootLayout from "./RootLayout";
import Results from "./pages/results";
import CheckOut, { action as checkoutAction } from "./pages/checkout";

function NotFound() {
  return (
    <main>
      <h1>Ou pagina que estas a procura na o existe ou tas perdido</h1>

      <a href="/">Voltar para a home</a>
    </main>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} loader={homeLoader} />

        <Route path="/carinho-de-compras" element={<Cart />} />
    
        <Route path="/perfil" element={<Profile />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/produtos/:id/:name" element={<ProductDetail />} loader={detailLoader} />
      </Route>


      
      <Route  path="/resultados" element={<Results  />} />
      <Route path="/facturaçao" element={<CheckOut />} action={checkoutAction} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<LoadingFallback />} />
  );
}

const messages = [
  {
    text: "Carregando as melhores ofertas para você...",
    icon: <ShoppingBagIcon className="w-12 h-12 text-blue-500" />,
  },
  {
    text: "Preparando uma experiência incrível...",
    icon: <SpeakerWaveIcon className="w-12 h-12 text-yellow-500" />,
  },
  {
    text: "Quase lá! Só mais um instante...",
    icon: <CheckBadgeIcon className="w-12 h-12 text-green-500" />,
  },
];

const LoadingFallback = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500); // Troca de mensagem a cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
      {/* Ícone dinâmico */}
      <div className="mb-4">{messages[index].icon}</div>

      {/* Mensagem dinâmica */}
      <p className="text-lg font-medium text-center max-w-md">
        {messages[index].text}
      </p>

      {/* Spinner de carregamento */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-6"></div>
    </div>
  );
};
