import { Link, useNavigation } from "react-router";
import { FaTimes, FaGift, FaTruck } from "react-icons/fa";
import type { Route } from "./+types/signin";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Entrar na minha conta" },
    {
      name: "description",
      content:
        "Acesse a tua conta para poderes comprar e gerenciares as tuas informações!",
    },
  ];
}

export default function SignIn({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const message = loaderData;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-md w-full">
        {/* Close Button */}
        <div className="pt-4 text-2xl">
          <Link to="/">
            <FaTimes />
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Casa Catarina Dembe <sub>AO</sub>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Todos os dados serão protegidos
          </p>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-24 justify-center text-[24px] sm:text-[30px] mb-6">
          <div className="flex flex-col items-center text-center">
            <FaGift />
            <span className="text-gray-500 text-xs sm:text-sm">
              Promoções Exclusivas
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaTruck />
            <span className="text-gray-500 text-xs sm:text-sm">
              Envio grátis para muitas compras
            </span>
          </div>
        </div>

        {/* Error Messages */}
        {actionData?.error && (
          <div className="text-center text-red-500 text-sm mb-2">
            {actionData.error}
          </div>
        )}
        {message && (
          <div className="text-center text-red-500 text-sm mb-2">{message}</div>
        )}

        {/* Form */}
        <form
          method="post"
          autoComplete="off"
          className="flex flex-col gap-4 sm:gap-5 py-4"
        >
          <input
            name="phone"
            type="tel"
            placeholder="Número de Telefone"
            className={inputStyle}
          />
          {actionData?.fieldErrors?.phone && (
            <span className="text-red-500 text-sm">
              {actionData.fieldErrors.phone}
            </span>
          )}

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>
          {actionData?.fieldErrors?.password && (
            <span className="text-red-500 text-sm">
              {actionData.fieldErrors.password}
            </span>
          )}

          {/* Create Account */}
          <label className="flex gap-1 text-sm sm:text-base">
            <p>
              Não tem uma conta?{" "}
              <Link to="/criar-conta" className="text-blue-600">
                Crie uma conta
              </Link>
            </p>
          </label>

          {/* Submit Button */}
          <button
            disabled={navigation.state === "submitting"}
            className="w-full px-4 py-4 bg-green-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex justify-center items-center"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
                  ></path>
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Tailwind input styling
const inputStyle =
  "w-full border border-gray-400 p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500";

// Eye Icons
function EyeOpenIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7"
      />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 01-6 0m6 0a3 3 0 01-6 0"
      />
    </svg>
  );
}
