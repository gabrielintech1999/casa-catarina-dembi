import { Link } from "react-router";


export default function NavBar() {
  return (
    <div>
        <Link to="/" >Home</Link>
        <Link to="/perfil" >perfil</Link>
        <Link to="/facturação" >facturação</Link>
        <Link to="/resultados" >resultados</Link>
        <Link to="/iniciar-sessao" >iniciar-sessao</Link>
        <Link to="/criar-conta" >criar conta</Link>
        <Link to="/sobre-nos" >Sobre-nos</Link>
    </div>
  )
}
