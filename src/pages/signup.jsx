import React from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("phone");
  const password = formData.get("password");

  const error = validateFormData({ email, password });
  if (error) {
    return error;
  }

  try {
    const data = await registerUser({ email, password });
    return redirect("/login");
  } catch (err) {
    return err.message;
  }
}

// Função de validação
function validateFormData({ email, password }) {
  if (!email || !password) {
    return "Todos os campos são obrigatórios.";
  }
  if (!/^\d{9}$/.test(email)) {
    return "Número de telefone inválido. Deve ter 9 dígitos.";
  }
  if (password.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }
  return null;
}

// Função de registro fake com atraso de 3 segundos
async function registerUser({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ email });
      } else {
        reject(new Error("Erro ao criar conta"));
      }
    }, 3000); // 3 segundos de atraso
  });
}

export default function Signup() {
  const errorMessage = useActionData();
  const navigation = useNavigation();

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crie sua conta</h1>
        <div className="text-center">
          {errorMessage && <h3 className="text-red-500 mb-4">{errorMessage}</h3>}
        </div>
        <Form method="post" className="space-y-4" replace>
          <div>
            <input
              name="phone"
              type="tel"
              placeholder="Número de Telefone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              disabled={navigation.state === "submitting"}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex justify-center items-center"
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
                  Criando...
                </>
              ) : (
                "Criar Conta"
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
