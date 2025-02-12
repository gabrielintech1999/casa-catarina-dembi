import { useNavigate, useSearchParams, Link } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const id = searchParams.get("id");

  const handleCancel = () => {
    // Adicione lógica para o botão de cancelar, se necessário
    alert("Ação de cancelamento!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 w-full">
        {/* Título */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          <Link
            to={`/produtos/${id}/${name}`}
            relative="path"
            style={{ textDecoration: "none", fontSize: "24px" }}
          >
            &#8592; Voltar
          </Link>{" "}
          Finalizar Compra
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Revise suas informações e escolha a forma de pagamento.
        </p>

        {/* Resumo do Pedido */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800">
            Resumo do Pedido
          </h2>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="flex justify-between text-gray-700">
              <span>Produto:</span>
              <span>Camiseta Premium</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>Quantidade:</span>
              <span>1</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>Preço:</span>
              <span>Kz 5.000</span>
            </div>
            <div className="flex justify-between text-gray-800 font-semibold mt-4 border-t pt-2">
              <span>Total:</span>
              <span>Kz 5.000</span>
            </div>
          </div>
        </div>

        {/* Informações do Comprador */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800">
            Informações do Comprador
          </h2>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Endereço de Entrega
              </label>
              <input
                type="text"
                placeholder="Seu endereço"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Telefone
              </label>
              <input
                type="tel"
                placeholder="Seu telefone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Formas de Pagamento */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800">
            Formas de Pagamento
          </h2>
          <form className="mt-4">
            {/* Pagamento à mão */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Pagamento à Mão
              </label>
              <input
                type="text"
                placeholder="Confirme seu nome para registro"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Aviso sobre outras formas de pagamento */}
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Outras formas de pagamento estarão disponíveis em breve, como
                TPA e transferência bancária.
              </p>
            </div>

            {/* Botões de ação */}

            {/* Botão de confirmação */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
            >
              Confirmar Pagamento
            </button>
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
            >
              Cancelar Pagamento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
