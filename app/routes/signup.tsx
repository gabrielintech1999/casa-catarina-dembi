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
      content:
        "Se registre no site para poderes comprar e teres um experiencia personalizada!",
    },
  ];
}


export async function action({ request }) {
  const formData = Object.fromEntries(await request.formData());

  const parsedData = {
    name: formData.name,
    address: formData.address,
    phone: formData.phone,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    acceptedTerms: formData.acceptedTerms === "on",
  };

  const validation = signupSchema.safeParse(parsedData);
  if (!validation.success) {
    return { errors: validation.error.format() };
  }

  try {
    let customer =   await createCustomer(
      parsedData.name,
      parsedData.address,
      parsedData.phone,
      parsedData.password,
      parsedData.acceptedTerms
    );
    return redirect("/", {
      headers: {
        "set-Cookie": await userCookie.serialize(customer)
      }
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
    <div>
      <div className="p-4 text-2xl">
        <Link to="/">
          <FaTimes />
        </Link>
      </div>
      <div className="p-4">
        <div className="text-center mb-8">
          <h1>Casa Catarina Dembe <sub>AO</sub></h1>
          <div>Todos os dados serão protegidos</div>
        </div>

        <div className="flex items-center gap-24 justify-center text-[30px] mb-4">
          <div className="flex items-center justify-center text-center flex-col">
            <FaGift />
            <span className="text-gray-500 text-[10px]">Promoções Exclusivas</span>
          </div>
          <div className="flex items-center justify-center text-center flex-col">
            <FaTruck />
            <span className="text-gray-500 text-[10px]">Envio grátis para muitas compras</span>
          </div>
        </div>

        <Form method="post" autoComplete="off" className="flex flex-col gap-3 py-4" replace>
          <InputField name="name" type="text" placeholder="Nome Completo" errors={errors} />
          <InputField name="address" type="text" placeholder="Endereço" errors={errors} />
          <InputField name="phone" type="tel" placeholder="Número de Telefone" errors={errors} />
          <InputField name="password" type="password" placeholder="Password" errors={errors} />
          <InputField name="confirmPassword" type="password" placeholder="Confirmar Password" errors={errors} />
          <label className="flex gap-2">
            <input name="acceptedTerms" type="checkbox" />
            <span>Aceito os termos de uso e condições</span>
          </label>
          {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms._errors[0]}</p>}
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          <button
              disabled={navigation.state === "submitting"}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex justify-center items-center"
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
        </Form>
      </div>
    </div>
  );
}

function InputField({ name, type, placeholder, errors }) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border border-gray-400 p-4 rounded w-full"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]._errors[0]}</p>}
    </div>
  );
}









// import { Link, Form } from "react-router";
// import { FaTimes, FaGift, FaTruck } from "react-icons/fa";

// export default function Signup() {
//   return (
//     <div>
//       <div className="p-4 text-2xl">
//         <Link to="/">
//           <FaTimes />
//         </Link>
//       </div>
//       <div className="p-4">
//         <div className="text-center mb-8">
//           <h1>
//             Casa Catarina Dembe <sub>AO</sub>
//           </h1>
//           <div>Todos os dados serão protegidos</div>
//         </div>

//         <div className="flex items-center gap-24 justify-center text-[30px] mb-4">
//           <div className="flex items-center justify-center text-center flex-col">
//             <FaGift />
//             <span className="text-gray-500 text-[10px]">Promoções Exclusivas</span>
//           </div>
//           <div className="flex items-center justify-center text-center flex-col">
//             <FaTruck />
//             <span className="text-gray-500 text-[10px]">
//               Envio grátis para muitas compras
//             </span>
//           </div>
//         </div>

//         <Form method="post" autoComplete="off" className="flex flex-col gap-3 py-4">
//           <input
//             name="name"
//             type="text"
//             placeholder="Nome Completo"
//             className={inputStyle}
//           />
//           <input
//             name="address"
//             type="text"
//             placeholder="Endereço"
//             className={inputStyle}
//           />
//           <input
//             name="phone"
//             type="tel"
//             placeholder="Número de Telefone"
//             className={inputStyle}
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             className={inputStyle}
//           />
//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirmar Password"
//             className={inputStyle}
//           />
//           <label className="flex gap-2">
//             <input name="acceptedTerms" type="checkbox" />
//             <span>Aceito os termos de uso e condições</span>
//           </label>
//           <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-600">
//             Criar Conta
//           </button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// const inputStyle = "border border-gray-400 p-4 rounded";
 


// export default function Signup() {
//   return (
//       <h1>Signup</h1>
//   )
// }


// import { Form, Link, redirect, useNavigation } from "react-router";
// import type { Route } from "./+types/signup";
// import { createCustomer } from "~/utils/api";
// import { signupSchema } from "~/utils/validate";
// import { userCookie } from "~/utils/cookie";
// import { FaGift, FaTimes, FaTruck } from "react-icons/fa";
// import { requireAuth } from "~/utils/protect"; 

// export const loader = async ({request}: Route.LoaderArgs) => {
//   const user = await requireAuth(request)
//   return null;
// };

// export const action = async ({ request }: Route.ActionArgs) => {
//   const formData = Object.fromEntries(await request.formData());
//   formData.acceptedTerms = formData.acceptedTerms === "on"; // Convert to boolean
//   const res = signupSchema.safeParse(formData);  

//   if (!res.success) {
//     return { errors: res.error.format(), status: 400 };
//   }

//   try {
//     const customer = await createCustomer(
//       res.data.name,
//       res.data.address,
//       res.data.phone,
//       res.data.password,
//       res.data.acceptedTerms
//     );
//     return redirect("/", {
//       headers: {
//         "Set-Cookie": await userCookie.serialize(customer),
//       },
//     });
//   } catch (error) {
//     return { errors: { general: error.message } };
//   }
// };

// export default function Signup({ actionData }: Route.ComponentProps) {



//   const navigation = useNavigation();


  
//   return ( 
//     <div>
//       <div className="p-4 text-2xl">
//         <Link to=".."  relative="path" ><FaTimes /> </Link>
//       </div>
//       <div className="p-4">
//         <div className="text-center mb-8">
//           <div>
//             <h1>
//               Casa Catarina Dembe <sub>AO</sub>{" "}
//             </h1>
//           </div>
//           <div>Todos os dados serão protegidos</div>
//         </div>

//         <div className="flex items-center gap-24 justify-center text-[30px]">
//           <div className="flex items-center justify-center  text-center flex-col">
//             <FaGift />
//             <span className="text-gray-500 text-[10px]">
//               Promocões Exclusivas
//             </span>
//           </div>
//           <div className="flex items-center justify-center text-center flex-col">
//             <FaTruck />
//             <span className="text-gray-500 text-[10px]">
//               Envio gratis para muitas compras
//             </span>
//           </div>
//         </div>
//         <div>
//           {actionData?.errors?.general && <h3>{actionData.errors.general}</h3>}
//         </div>
//         <Form
//         replace
//           method="post"
//           autoComplete="off"
//           className=" flex flex-col gap-3 py-4"
//         >
//           <input
//             name="name"
//             type="text"
//             placeholder="Nome Completo"
//             autoFocus
//             className={inputStyle}
//           />
//           <div className={errorStyle}>
//             {actionData?.errors?.name && (
//               <p>{actionData.errors.name._errors[0]}</p>
//             )}
//           </div>
//           <input
//             name="address"
//             type="text"
//             placeholder="Endereço"
//             className={inputStyle}
//           />
//           <div className={errorStyle}>
//             {actionData?.errors?.address && (
//               <p>{actionData.errors.address._errors[0]}</p>
//             )}
//           </div>
//           <input
//             name="phone"
//             type="tel"
//             placeholder="Número de Telefone"
//             className={inputStyle}
//           />
//           <div className={errorStyle}> 
//           {actionData?.errors?.phone && (
//             <p>{actionData.errors.phone._errors[0]}</p>
//           )}
//           </div>
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             className={inputStyle}
//           />
//           <div className={errorStyle}>
//           {actionData?.errors?.password && (
//             <p>{actionData.errors.password._errors[0]}</p>
//           )}
//           </div>
//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirmar Password"
//             className={inputStyle}
//           />
//          <div className={errorStyle}>
//          {actionData?.errors?.confirmPassword && (
//             <p>{actionData.errors.confirmPassword._errors[0]}</p>
//           )}
//          </div>
//           <label className="flex gap-2">
//             <input name="acceptedTerms" type="checkbox" />
//             <span>Aceito os termos de uso e condições</span>
//           </label>
//           <div className={errorStyle}>
//           {actionData?.errors?.acceptedTerms && (
//             <p>{actionData.errors.acceptedTerms._errors[0]}</p>
//           )}
//           </div>
//           <button
//               disabled={navigation.state === "submitting"}
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex justify-center items-center"
//             >
//               {navigation.state === "submitting" ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 mr-3 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
//                     ></path>
//                   </svg>
//                   Criando...
//                 </>
//               ) : (
//                 "Criar Conta"
//               )}
//             </button>
//         </Form>
//       </div>  
//     </div>
//   );
// }

// const inputStyle = "border border-gray-400 p-4 rounded";

// const errorStyle = "text-red-600";
