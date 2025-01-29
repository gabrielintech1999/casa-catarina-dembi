import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Home, {loader as homeLoader} from "./pages/home";
import { Cart } from "./pages/cart";

import ProductDetail from "./pages/productdetail";
import Profile from "./pages/profile";
import Auth from "./pages/auth";
import RootLayout from "./RootLayout";

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
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}  loader={homeLoader} />

      <Route path="/carinho-de-compras" element={<Cart />} />
      <Route path="/perfil" element={<Profile />} />

      <Route path="/auth" element={<Auth />} />

      <Route path="/produtos/:id/:name" element={<ProductDetail />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
