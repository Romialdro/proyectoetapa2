function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section contact">
          <h4><i className="fas fa-store"></i> Mi Tienda</h4>
          <p><i className="fas fa-envelope"></i> contacto@mitienda.com</p>
          <p><i className="fas fa-phone"></i> +54 11 1234-5678</p>
        </div>

        <div className="footer-section links">
          <h4><i className="fas fa-link"></i> Enlaces útiles</h4>
          <ul>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Política de envíos</a></li>
            <li><a href="#">Términos y condiciones</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4><i className="fas fa-share-alt"></i> Redes</h4>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/541132495810" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Aldrovandi. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;