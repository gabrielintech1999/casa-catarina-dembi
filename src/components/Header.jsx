export default  function Header() {
    return(
      <header className="header">
      <div className="header-container">
        <div className="profile-picture">
          <img className="profile-image" alt="Foto do perfil do cliente" />
        </div>
        <h1 className="logo">
          <a href="index.html">Casa Catarina Dembi</a>
        </h1>
        <div className="cart-icon">
         <a href="carinho-de-compras">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
         </a>
        </div>
      </div>
      <input
        className="search-bar"
        type="search"
        placeholder="Buscar produtos..."
      />
      <nav>
       <div className="links">
          <a href=".">Produtos</a>
          <a href="checkout.html">Facturação</a>
          <a href="about.html">Sobre Nós</a>
       </div>
      </nav>
    </header> 
    )

  
}