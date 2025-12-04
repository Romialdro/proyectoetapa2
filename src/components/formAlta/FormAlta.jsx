import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../api/ApiConfig";
import sinStockImg from "../../assets/img/sinstock.jpg";

function FormAlta() {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    marca: "",
    categoria: "",
    foto: "",
    descripcionCorta: "",
    descripcionLarga: "",
    envioSinCargo: false,
    edadDesde: "",
    edadHasta: "",
  });

  const [productoId, setProductoId] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/productos`);
        const data = await res.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProductos([]);
      }
    };
    cargarProductos();
  }, []);

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Guardar producto (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const obligatorios = [
      "nombre",
      "precio",
      "categoria",
      "descripcionCorta",
      "descripcionLarga",
      "edadDesde",
      "edadHasta",
    ];

    const incompletos = obligatorios.filter((campo) => !producto[campo]);

    if (incompletos.length > 0) {
      alert("Completá todos los campos obligatorios.");
      return;
    }

    const url = productoId
      ? `${BACKEND_URL}/api/productos/${productoId}`
      : `${BACKEND_URL}/api/productos`;

    const method = productoId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!res.ok) {
        alert("Error al guardar el producto.");
        return;
      }

      alert(productoId ? "Producto editado con éxito." : "Producto agregado con éxito.");

      
      setProducto({
        nombre: "",
        precio: "",
        stock: "",
        marca: "",
        categoria: "",
        foto: "",
        descripcionCorta: "",
        descripcionLarga: "",
        envioSinCargo: false,
        edadDesde: "",
        edadHasta: "",
      });
      setProductoId(null);

     
      const actualizados = await fetch(`${BACKEND_URL}/api/productos`).then((r) => r.json());
      setProductos(Array.isArray(actualizados) ? actualizados : []);
    } catch (error) {
      console.error("Error al enviar producto:", error);
    }
  };

  const handleEditar = (prod) => {
    setProducto({
      nombre: prod.nombre ?? "",
      precio: prod.precio ?? "",
      stock: prod.stock ?? "",
      marca: prod.marca ?? "",
      categoria: prod.categoria ?? "",
      foto: prod.foto ?? "",
      descripcionCorta: prod.descripcionCorta ?? "",
      descripcionLarga: prod.descripcionLarga ?? "",
      envioSinCargo: prod.envioSinCargo ?? false,
      edadDesde: prod.edadDesde ?? "",
      edadHasta: prod.edadHasta ?? "",
    });

    setProductoId(prod._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eliminar producto
  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Seguro que querés eliminar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/productos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Error al eliminar.");
        return;
      }

      alert("Producto eliminado.");

      const actualizados = await fetch(`${BACKEND_URL}/api/productos`).then((r) => r.json());
      setProductos(Array.isArray(actualizados) ? actualizados : []);

      if (productoId === id) {
        setProductoId(null);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <section className="form-wrapper">
      <h2>Alta de Productos</h2>

      <form onSubmit={handleSubmit} className="alta-form">
        <div className="input-group">
          <label>Nombre</label>
          <input name="nombre" value={producto.nombre} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Precio</label>
          <input name="precio" type="number" value={producto.precio} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Stock</label>
          <input name="stock" type="number" value={producto.stock} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Marca</label>
          <input name="marca" value={producto.marca} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Categoría</label>
          <select className="table-responsive" name="categoria" value={producto.categoria} onChange={handleChange} required>
            <option value="">Seleccionar categoría</option>
            <option value="calzado">Calzado</option>
            <option value="elementos deportivos">Elementos deportivos</option>
            <option value="remeras y buzos">Remeras y buzos</option>
            <option value="tops">Tops</option>
            <option value="pantalones y calzas">Pantalones y calzas</option>
            <option value="camperas">Camperas</option>
          </select>
        </div>

        <div className="input-group">
          <label>Foto (URL)</label>
          <input name="foto" value={producto.foto} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Descripción corta</label>
          <input name="descripcionCorta" value={producto.descripcionCorta} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Descripción larga</label>
          <textarea name="descripcionLarga" value={producto.descripcionLarga} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Edad desde</label>
          <input name="edadDesde" type="number" value={producto.edadDesde} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Edad hasta</label>
          <input name="edadHasta" type="number" value={producto.edadHasta} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>
            <input type="checkbox" name="envioSinCargo" checked={producto.envioSinCargo} onChange={handleChange} />
            Envío sin cargo
          </label>
        </div>

        <button type="submit">{productoId ? "Editar producto" : "Agregar producto"}</button>
      </form>

      <h2>Listado de Productos</h2>
      <section className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Edad</th>
              <th>Envío</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id}>
                <td>
                  {prod.foto ? (
                    <img
                      src={prod.foto}
                      alt={prod.nombre}
                      style={{
                        width: 56,
                        height: 56,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{prod.nombre}</td>
                <td>{prod.marca || "—"}</td>
                <td>{prod.categoria || "—"}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock ?? "—"}</td>
                <td>
                  {prod.edadDesde ?? "—"}–{prod.edadHasta ?? "—"}
                </td>
                <td>{prod.envioSinCargo ? "Gratis" : "—"}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(prod)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(prod._id)}>Eliminar</button>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                  <img
                    src={sinStockImg}
                    alt="Sin stock"
                    style={{ width: 180, opacity: 0.9 }}
                  />
                  <p style={{ marginTop: 10, color: "#555" }}>No hay productos cargados.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default FormAlta;
