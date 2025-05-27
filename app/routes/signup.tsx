import { FaGift, FaTimes, FaTruck } from 'react-icons/fa';
import { Form, Link, redirect, useActionData, useNavigation } from 'react-router';
import { createCustomer } from '~/utils/api';
import { userCookie } from '~/utils/cookie';
import { signupSchema } from '~/utils/validate';
import type { Route } from './+types/signup';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Criação de Conta" },
    {
      name: "description",
      content: "Se registre no site para poderes comprar e teres uma experiência personalizada!",
    },
  ];
}

export async function action({ request }) {
  const formData = Object.fromEntries(await request.formData());

  const parsedData = {
    name: formData.name,
    address: formData.address,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    acceptedTerms: formData.acceptedTerms === "on",
  };

  const validation = signupSchema.safeParse(parsedData);
  if (!validation.success) {
    return { errors: validation.error.format() };
  }

  try {
    const customer = await createCustomer(
      parsedData.name,
      parsedData.address,
      parsedData.phone,
      parsedData.password,
      parsedData.acceptedTerms
    );
    return redirect("/", {
      headers: {
        "set-Cookie": await userCookie.serialize(customer),
      },
    });
  } catch (error) {
    return { errors: { general: error.message } };
  }
}

export default function Signup() {
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const navigation = useNavigation();

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-2xl mb-4">
        <Link to="/" className="text-gray-500 hover:text-black transition">
          <FaTimes />
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-xl font-bold">Casa Catarina Dembe <sub className="text-sm">AO</sub></h1>
        <p className="text-gray-600">Todos os dados serão protegidos</p>
      </div>

      <div className="flex items-center justify-center gap-12 text-[24px] sm:text-[30px] mb-6">
        <div className="flex flex-col items-center text-center">
          <FaGift  />
          <span className="text-gray-500 text-xs">Promoções Exclusivas</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaTruck />
          <span className="text-gray-500 text-xs">Envio grátis para muitas compras</span>
        </div>
      </div>

      <Form method="post" autoComplete="off" className="flex flex-col gap-4" replace>
        <Input name="name" type="text" placeholder="Nome completo" errors={errors} />
        <Input name="address" type="text" placeholder="Endereço" errors={errors} />
        <Input name="phone" type="tel" placeholder="Número de Telefone" errors={errors} />
        <Input name="password" type="password" placeholder="Senha" errors={errors} />
        <Input name="confirmPassword" type="password" placeholder="Confirmar senha" errors={errors} />

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            name="acceptedTerms"
            type="checkbox"
            className="mt-1 accent-blue-500"
          />
          <span>Aceito os termos de uso e condições</span>
        </label>
        {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms._errors[0]}</p>}
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

        <button
          disabled={navigation.state === "submitting"}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-200 flex justify-center items-center"
          type="submit"
        >
          {navigation.state === "submitting" ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
                />
              </svg>
              Criando conta...
            </>
          ) : (
            "Criar conta"
          )}
        </button>
      </Form>
    </div>
  );
}

function Input({ name, type, placeholder, errors }) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 p-3 rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="text-red-500 text-sm mt-1">
          {errors[name]._errors[0]}
        </p>
      )}
    </div>
  );
}
