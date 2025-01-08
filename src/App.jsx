import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Cart } from "./pages/cart";

import Header from "./components/Header";
import Footer from "./components/Footer";

function NotFound() {
  return (
    <main>
      <h1>Ou pagina que estas a procura na o existe ou tas perdido</h1>

      <a href="/">Voltar para a home</a>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<h1>clientes</h1>} />
        <Route path="/carinho-de-compras" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
