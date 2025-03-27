import { Link, Form, useActionData, useNavigation, redirect } from "react-router";
import { FaTimes, FaGift, FaTruck } from "react-icons/fa";
import type { Route } from "./+types/signin";
import { userSchema } from "~/utils/validate";
import { loginUser } from "~/utils/api";
import { userCookie } from "~/utils/cookie";
import { useState, useEffect } from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "iniciar-sessao" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ request }:  Route.ActionArgs) {


  const msg =  new URL(request.url).searchParams.get("message")

  console.log(msg);
  
  return msg
}



export async function action({ request }: Route.ActionArgs) {

  
  const formData = await request.formData();
  console.log(formData); 
  const phone = String(formData.get("phone"));
  const password = String(formData.get("password"));

  const validationResult = userSchema.safeParse({ phone, password });
  if (!validationResult.success) {
    const fieldErrors = validationResult.error.errors.reduce(
      (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
      {} as Record<string, string>
    );
    return { fieldErrors };
  }

  try {
    const customer = await loginUser({ phone, password });
    console.log(customer);

    return redirect("/", { 
      headers: {
        "Set-Cookie": await userCookie.serialize(customer),
      },
    });
  } catch (err) {
    return { error: err.message };
  }
}

export default function SignIn({actionData, loaderData}: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const message = loaderData
  console.log(message);
  



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigation();



  return (
    <div>
      <div className="p-4 text-2xl">
        <Link to="..">
          <FaTimes />
        </Link>
      </div>
      <div className="p-4">
        <div className="text-center mb-8">
          <h1>
            Casa Catarina Dembe <sub>AO</sub>
          </h1>
          <div>Todos os dados serão protegidos</div>
        </div>

        <div className="flex items-center gap-24 justify-center text-[30px] mb-4">
          <div className="flex items-center justify-center text-center flex-col">
            <FaGift />
            <span className="text-gray-500 text-[10px]">
              Promoções Exclusivas
            </span>
          </div>
          <div className="flex items-center justify-center text-center flex-col">
            <FaTruck />
            <span className="text-gray-500 text-[10px]">
              Envio grátis para muitas compras
            </span>
          </div>
        </div>

        
        {actionData?.error && (
          <div className="text-center text-red-500">{actionData.error}</div>
        )}
        {message && (
          <div className="text-center text-red-500">{message}</div>
        )}
        <form
          method="post"
          autoComplete="off"
          className="flex flex-col gap-3 py-4"
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
              {showPassword ? (
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
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.823-.676 1.597-1.186 2.286M15 12a3 3 0 01-6 0m6 0a3 3 0 01-6 0m6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3m6 0c0-1.657-1.343-3-3-3s-3 1.343-3 3"
                  />
                </svg>
              ) : (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7 .274-.823.676-1.597 1.186-2.286M15 12a3 3 0 01-6 0m6 0a3 3 0 01-6 0m6 0c0 1.657-1.343 3-3 3s-3-1.343-3-3m6 0c0-1.657-1.343-3-3-3s-3 1.343-3 3"
                  />
                </svg>
              )}
            </button>
          </div>
          {actionData?.fieldErrors?.password && (
            <span className="text-red-500 text-sm">
              {actionData.fieldErrors.password}
            </span>
          )}

          <label className="flex gap-2">
            <p>
              Não tem uma conta?{" "}
              <Link to="/criar-conta" className="text-blue-600">
                Crie uma conta
              </Link>{" "}
            </p>
          </label>
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
              "Entar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = "w-full border-gray-400  p-4 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500";
