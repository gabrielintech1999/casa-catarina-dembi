// import { useEffect, useState } from "react";

// export default function App() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch("http://localhost:3000/products");
//       const data = await response.json();
//       setProducts(data);
//       setFilteredProducts(data);
//       console.log(data);

//     };

//     fetchProducts();
//   }, []);


// function filterProducts(category){

//   setCategory(category); // Atualiza a categoria selecionada
//   if (category === "") {
//     // Se a categoria estiver vazia, mostrar todos os produtos
//     setFilteredProducts(products);
//   } else {
//     // Filtrar produtos com base na categoria
//     const filtered = products.filter(
//       (product) => product.category === category
//     );
//     setFilteredProducts(filtered);
//   }
  
//   console.log(category)
// }


//   if (!products.length) {
//     return <h1>Carregando...</h1>;
//   }

//   return (
//     <div>
//       <h1>Pagina de produtos</h1>


//       <div className="overflow-x-auto">
//   <div className="flex flex-row gap-4 w-max">
//     <button
//       onClick={() => filterProducts("cosmeticos")}
//       className="bg-blue-500 text-white px-2 py-1 rounded-lg"
//     >
//       Cosmeticos
//     </button>
//     <button
//       onClick={() => filterProducts("Material escolar")}
//       className="bg-blue-500 text-white px-2 py-1 rounded-lg"
//     >
//       Material Escolar
//     </button>
//     <button
//       onClick={() => filterProducts("Matérias de Costura")}
//       className="bg-blue-500 text-white px-2 py-1 rounded-lg"
//     >
//       Materiais de Costura
//     </button>
//     <button
//       onClick={() => filterProducts("Material de Escritório")}
//       className="bg-blue-500 text-white px-2 py-1 rounded-lg"
//     >
//       Material de Escritório
//     </button>
//     <button
//       onClick={() => filterProducts("Higiene")}
//       className="bg-blue-500 text-white px-2 py-1 rounded-lg"
//     >
//       Higiene
//     </button>
//     <button
//       onClick={() => filterProducts("")} // Exibir todos os produtos
//       className="bg-gray-500 text-white px-2 py-1 rounded-lg"
//     >
//       Mostrar Todos
//     </button>
//   </div>
// </div>


//       {filteredProducts.map((product) => (
//         <div  key={product.id} className="border border-black rounded-lg p-4 m-4">
//           <h2>nome: {product.name}</h2>
//           <h2>Preco: {product.price} Kz</h2>
//         </div>
//       ))}

     
//     </div>
//   );
// }

import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/home";
import { Cart } from "./pages/cart";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/productdetail";
import Profile from "./pages/profile";
import Auth from "./pages/auth";
import Protected from "./components/Protected";

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

        <Route element={<Protected />}>
          <Route path="/carinho-de-compras" element={<Cart />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        <Route path="/auth" element={<Auth />} />

        <Route path="/produtos/:id/:name" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
