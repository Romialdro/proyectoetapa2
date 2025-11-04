import { useState, useEffect } from "react";
import { API_URL } from "../../api/ApiConfig";

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
    fetch(`${API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      "nombre", "precio", "categoria", "descripcionCorta",
      "descripcionLarga", "edadDesde", "edadHasta"
    ];
    const incompletos = camposObligatorios.filter((campo) => !producto[campo]);

    if (incompletos.length > 0) {
      return alert("Completá todos los campos obligatorios.");
    }

    const url = productoId
      ? `${API_URL}/productos/${productoId}`
      : `${API_URL}/productos`;

    const method = productoId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (res.ok) {
        alert(productoId ? "Producto editado con éxito." : "Producto agregado con éxito.");
        setProducto({
          nombre: "", precio: "", stock: "", marca: "", categoria: "", foto: "",
          descripcionCorta: "", descripcionLarga: "", envioSinCargo: false,
          edadDesde: "", edadHasta: "",
        });
        setProductoId(null);
        const actualizados = await fetch(`${API_URL}/productos`).then((r) => r.json());
        setProductos(actualizados);
      } else {
        alert("Error al guardar el producto.");
      }
    } catch (error) {
      console.error("Error al enviar producto:", error);
    }
  };

  const handleEditar = (prod) => {
    setProducto(prod);
    setProductoId(prod.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminar = async (id) => {
    const confirmacion = confirm("¿Seguro que querés eliminar este producto?");
    if (!confirmacion) return;

    try {
      const res = await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Producto eliminado.");
        const actualizados = await fetch(`${API_URL}/productos`).then((r) => r.json());
        setProductos(actualizados);
        if (productoId === id) {
          setProductoId(null);
          setProducto({
            nombre: "", precio: "", stock: "", marca: "", categoria: "", foto: "",
            descripcionCorta: "", descripcionLarga: "", envioSinCargo: false,
            edadDesde: "", edadHasta: "",
          });
        }
      } else {
        alert("Error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <section className="form-wrapper">
      <h2><i className="fas fa-plus-circle"></i> Alta de Productos</h2>
      <form onSubmit={handleSubmit} className="alta-form">
        <div className="input-group"><label>Nombre *</label><input name="nombre" value={producto.nombre} onChange={handleChange} required /></div>
        <div className="input-group"><label>Precio *</label><input name="precio" type="number" value={producto.precio} onChange={handleChange} required /></div>
        <div className="input-group"><label>Stock</label><input name="stock" type="number" value={producto.stock} onChange={handleChange} /></div>
        <div className="input-group"><label>Marca</label><input name="marca" value={producto.marca} onChange={handleChange} /></div>
        <div className="input-group"><label>Categoría *</label><input name="categoria" value={producto.categoria} onChange={handleChange} required /></div>
        <div className="input-group"><label>Foto (URL)</label><input name="foto" value={producto.foto} onChange={handleChange} /></div>
        <div className="input-group"><label>Descripción corta *</label><input name="descripcionCorta" value={producto.descripcionCorta} onChange={handleChange} required /></div>
        <div className="input-group"><label>Descripción larga *</label><textarea name="descripcionLarga" value={producto.descripcionLarga} onChange={handleChange} required /></div>
        <div className="input-group checkbox-group">
          <input type="checkbox" name="envioSinCargo" checked={producto.envioSinCargo} onChange={handleChange} id="envioSinCargo" />
          <label htmlFor="envioSinCargo">Envío sin cargo</label>
        </div>
        <div className="input-group"><label>Edad desde *</label><input name="edadDesde" type="number" value={producto.edadDesde} onChange={handleChange} required /></div>
        <div className="input-group"><label>Edad hasta *</label><input name="edadHasta" type="number" value={producto.edadHasta} onChange={handleChange} required /></div>

        <button type="submit">{productoId ? "Editar Producto" : "Guardar Producto"}</button>
        {productoId && (
          <button type="button" className="btn-eliminar" onClick={() => handleEliminar(productoId)}>
            Eliminar Producto
          </button>
        )}
      </form>

      <h2><i className="fas fa-box-open"></i> Listado de Productos</h2>
      <section>
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
              <tr key={prod.id}>
                <td><img src={prod.foto} alt={prod.nombre} /></td>
                <td>{prod.nombre}</td>
                <td>{prod.marca || "-"}</td>
                <td>{prod.categoria || "-"}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock || "-"}</td>
                <td>{prod.edadDesde}–{prod.edadHasta}</td>
                <td>{prod.envioSinCargo ? "Gratis" : "—"}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(prod)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(prod.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default FormAlta;