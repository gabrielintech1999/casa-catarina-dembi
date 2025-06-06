import {
  useSearchParams,
  Link,
  Form,
  redirect,
  useActionData,
  useNavigation,
  useLocation,
} from "react-router";
import { useState } from "react";
import { requireAuth } from "~/utils/protect";
import type { Route } from "./+types/checkout";
import { userCookie } from "~/utils/cookie";
import { useNavigate } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  let user = await userCookie.parse(request.headers.get("Cookie"));

  console.log(user);
  return user;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Facturação de compra" },
    { name: "description", content: "Insere os detalhes de pagamento para finalizares a compra" },
  ];
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const validateOrderData = (orderData) => {
  const errors = {};

  if (!orderData.name || orderData.name.trim().length < 3) {
    errors.name =
      "O nome completo é obrigatório e deve ter pelo menos 3 caracteres.";
  }

  if (!orderData.address || orderData.address.trim().length < 5) {
    errors.address =
      "O endereço de entrega é obrigatório e deve ter pelo menos 5 caracteres.";
  }

  // Validação para aceitar exatamente 9 dígitos no número de telefone
  if (!orderData.phone || !/^\d{9}$/.test(orderData.phone)) {
    errors.phone =
      "O telefone é obrigatório e deve conter exatamente 9 dígitos.";
  }

  if (
    !orderData.confirmationName ||
    orderData.confirmationName.trim() !== orderData.name.trim()
  ) {
    errors.confirmationName =
      "O nome de confirmação deve ser igual ao nome completo.";
  }

  return errors;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const orderData = Object.fromEntries(formData);

  // Simular atraso de 2 segundos
  await delay(2000);

  // Validação usando a função separada
  const errors = validateOrderData(orderData);

  // Se houver erros, retorna-os ao cliente
  if (Object.keys(errors).length > 0) {
    return { errors }; // Pode ser customizado para devolver no formato correto
  }

  console.log("Dados válidos:", orderData);

  // Processar o pedido (redirecionar ou salvar no banco de dados)
  return redirect("/congratulations"); // Alterar rota conforme necessário
};

export default function Checkout({ loaderData }: Route.ComponentProps) {
    const location = useLocation();

  // Cria objeto URLSearchParams para manipular query params
  const queryParams = new URLSearchParams(location.search);

  // Pega valores
  const total = queryParams.get('total');       // '200'
  const quantity = queryParams.get('quantity'); // '1'

  console.log(total);
  


  const actionData = useActionData();

  console.log(loaderData);

  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const id = searchParams.get("id");

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          <Link
            to={`/`}
            style={{ textDecoration: "none", fontSize: "24px" }}
          >
            &#8592; Voltar
          </Link>{" "}
          Finalizar Compra
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Revise suas informações e escolha a forma de pagamento.
        </p>

        <Invoice quantity={quantity} total={total} customerName={loaderData.name} invoiceNumber="12345" />


        <Form method="post" onSubmit={handleSubmit}>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800">
              Informações do Comprador
            </h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  name="name"
                  id="name"
                  value={loaderData?.name}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    actionData?.errors?.name ? "border-red-500" : ""
                  }`}
                />
                {actionData?.errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.name}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Endereço de Entrega
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={loaderData?.address}
                  placeholder="Seu endereço"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    actionData?.errors?.address ? "border-red-500" : ""
                  }`}
                />
                {actionData?.errors?.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.address}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={loaderData?.phone}
                  placeholder="Seu telefone"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    actionData?.errors?.phone ? "border-red-500" : ""
                  }`}
                />
                {actionData?.errors?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.phone}  
                  </p> 
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800">
              Formas de Pagamento
            </h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                    Pagamento à Mão (Confirme seu nome)
                </label>
                <input
                  type="text"
                  name="confirmationName"
                  id="confirmationName"
                  placeholder="Confirme seu nome para registro"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    actionData?.errors?.confirmationName ? "border-red-500" : ""
                  }`}
                />
                {actionData?.errors?.confirmationName && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.confirmationName}
                  </p>
                )}
              </div>

              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
                <p className="text-sm">
                  Outras formas de pagamento estarão disponíveis em breve, como
                  TPA e transferência bancária.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || navigation.state === "submitting"}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4 flex items-center justify-center"
              >
                {isSubmitting || navigation.state === "submitting" ? (
                  <span className="loader mr-2"></span>
                ) : null}
                Confirmar o Pedido
              </button>

              <button
              onClick={() => navigate(-1)}
                type="button"
                className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
              >
                Cancelar o Pedido
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}



function Invoice({ quantity, total, customerName, invoiceNumber, date }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {/* Cabeçalho */}
      <header className="mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Factura</h1>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Cliente: {customerName || '---'}</span>
          <span>Nº: {invoiceNumber || '0001'}</span>
          <span>Data: {date || new Date().toLocaleDateString()}</span>
        </div>
      </header>

      {/* Conteúdo da fatura */}
      <section>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Resumo do Pedido</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Quantidade:</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between text-gray-800 font-semibold mt-4 border-t pt-2">
            <span>Total:</span>
            <span>Kz {total}</span>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        Obrigado pela sua compra!
      </footer>
    </div>
  );
}

