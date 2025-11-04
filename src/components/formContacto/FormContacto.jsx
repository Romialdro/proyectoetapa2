import { useState } from "react";

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

    const payload = {
      nombre: String(form.nombre),
      email: String(form.email),
      comentarios: String(form.comentarios),
    };

    try {
      const res = await fetch("https://6908e53d2d902d0651b21158.mockapi.io/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Mensaje enviado con éxito.");
        setForm({ nombre: "", email: "", comentarios: "" });
      } else {
        alert("Error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }

    // Simulación de envío sin backend
    /* console.log("Simulando envío de mensaje:", payload);
    alert("Mensaje enviado con éxito.");
    setForm({ nombre: "", email: "", comentarios: "" }); */
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
          ></textarea>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default FormContacto;

 