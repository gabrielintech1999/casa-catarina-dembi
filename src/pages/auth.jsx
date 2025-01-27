import GoogleIcon  from "../assets/google.png";
import { auth } from "../firebase/firebase";  
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default function Auth() {

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account", // Força o Google a exibir a seleção de conta
  });



  async function handleGoogle() {

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Informações do usuário autenticado
      console.log("Usuário autenticado:", user);
      return user;
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
      return null;
    }


    // logica de autwoneticação com o google
    // redirecionar para a pagina de login
  }



  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 mt-20">
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Bem-vindo</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Entrar
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">ou</p>
        </div>

        <button 
          type="button" 
          className="flex items-center justify-center bg-gray-100 w-full mt-4 py-3 border border-gray-600 rounded-lg  text-gray-600 hover:bg-gray-100 transition duration-300"  onClick={handleGoogle}>
          <img 
            src={GoogleIcon}
            alt="Google logo" 
            className="w-5 h-5 mr-2"
          />
          Continuar com Google
        </button>
      </form>
    </div>
  );
}
