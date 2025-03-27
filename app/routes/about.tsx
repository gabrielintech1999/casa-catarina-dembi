import Footer from "~/components/Footer";
import type { Route } from "../+types/about";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saiba mais" },
    { name: "description", content: "Mais sobre o site!" },
  ];
}

export default function About() {
  return (
   <div>
     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      

      <a href="/">← Voltar à Página Principal</a>
      <h1 className="text-3xl font-bold mt-4 text-gray-800">Sobre o site e o projeto</h1>
      <p className="mt-2 text-gray-700">
          Este é um projeto para obtenção do título de Técnico Médio. O projeto foi
          feito com o propósito de demonstrar um e-commerce desenvolvido por{" "}
          <strong>Marta S. B. Antunes</strong>, tutorado por{" "}
          <strong>Wagnel Sambo</strong>.
        </p>

      <h1 className="text-3xl font-bold mt-4 text-gray-800">Sobre Nós</h1>

      <div className="mt-4 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800">Nossa História</h2>
        <p className="mt-2">
          Desde 2005, a <strong>Casa Catarina Dembi</strong> tem sido uma referência no comércio local, trazendo qualidade, tradição e inovação para seus clientes. A jornada começou no <strong>Bairro Gika</strong>, onde a paixão pelo empreendedorismo e o compromisso com o atendimento de excelência rapidamente conquistaram a confiança da comunidade.
        </p>
        <p className="mt-2">
          Com o crescimento da clientela e a demanda por mais produtos, expandimos e tivemos uma loja no <strong>Pio</strong>, onde fortalecemos ainda mais nossa presença. Atualmente, estamos localizados no <strong>Copo Frio</strong> e no <strong>Cabassango (depois da praça)</strong>, sempre oferecendo uma experiência de compra única.
        </p>
        <p className="mt-2">
          Agora, com a chegada do <strong>e-commerce</strong>, damos mais um passo importante na nossa história, permitindo que clientes de qualquer lugar tenham acesso aos nossos produtos com facilidade, segurança e a mesma qualidade que sempre nos marcou.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Funcionalidades</h2>
        <p className="mt-2">Explore o site para descobrir todas as funcionalidades:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>Autenticação de usuário usando uma base de dados não relacional</li>
          <li>Um carrinho de compras para armazenar produtos</li>
          <li>Uma barra de pesquisa para encontrar produtos rapidamente</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Saber Mais</h2>
        <p className="mt-2">
          Entre em contato diretamente com a desenvolvedora através dos seguintes números:{" "}
          <b className="text-gray-900">924 911 148 / 928 758 826</b>.
        </p>
      </div>

      
    </div>
    <Footer />
   </div>
  );
}
