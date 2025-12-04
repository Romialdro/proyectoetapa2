import { useState } from "react";
import { BACKEND_URL } from "../../api/ApiConfig";

function FormContacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    comentarios: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.comentarios) {
      return alert("Completá todos los campos obligatorios.");
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Mensaje enviado con éxito.");
        setForm({ nombre: "", email: "", comentarios: "" });
      } else {
        alert("Error al enviar el mensaje.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error de conexión.");
    }
  };

  return (
    <section className="form-wrapper">
      <h2><i className="fas fa-envelope"></i> Contacto</h2>

      <form onSubmit={handleSubmit} className="alta-form">
        <div className="input-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="comentarios">Comentarios *</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={form.comentarios}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default FormContacto;
