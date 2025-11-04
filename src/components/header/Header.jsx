import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo.jpg";

function Header() {
  const { carrito } = useCart();
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <span>Mi Tienda</span>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i> Inicio
            </Link>
          </li>
          <li>
            <Link to="/alta">
              <i className="fas fa-plus-circle"></i> Alta
            </Link>
          </li>
          <li>
            <Link to="/nosotros">
              <i className="fas fa-users"></i> Nosotros
            </Link>
          </li>
          <li>
            <Link to="/contacto">
              <i className="fas fa-envelope"></i> Contacto
            </Link>
          </li>
          <li>
            <Link to="/carrito">
              <i className="fas fa-shopping-cart"></i> Carrito ({totalItems})
            </Link>
          </li>
        </ul>
      </nav>
      
      <div id="barra-busqueda">
        <form>
          <input type="text" placeholder="Buscar productos..." />
          <input type="submit" value="Buscar" />
        </form>
      </div>

      <div id="boton-carrito">
        <Link to="/carrito">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
    </header>
  );
}

export default Header;