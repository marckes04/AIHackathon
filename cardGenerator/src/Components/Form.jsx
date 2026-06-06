// src/components/Form.jsx
import React, { useState, useEffect } from 'react';

export default function Form({ onAgregarTarjeta, tarjetaAEditar, onCancelarEdicion }) {
  const [formData, setFormData] = useState({
    titulo: '',
    nombre: '',
    descripcion: '',
    fecha: ''
  });

  // Si recibimos una tarjeta para editar, rellenamos el formulario
  useEffect(() => {
    if (tarjetaAEditar) {
      setFormData(tarjetaAEditar);
    } else {
      setFormData({ titulo: '', nombre: '', descripcion: '', fecha: '' });
    }
  }, [tarjetaAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregarTarjeta(formData); // App decidirá si crea o actualiza
    setFormData({ titulo: '', nombre: '', descripcion: '', fecha: '' });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`form-container ${tarjetaAEditar ? 'form-editing' : ''}`}
    >
      <h3 style={{color: tarjetaAEditar ? '#fbbf24' : '#38bdf8', marginTop: 0}}>
        {tarjetaAEditar ? 'Editar Tarjeta' : 'Nueva Tarjeta'}
      </h3>

      <div className="input-group">
        <label className="label">Título</label>
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} className="input" required />
      </div>

      <div className="input-group">
        <label className="label">Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="input" required />
      </div>

      <div className="input-group">
        <label className="label">Descripción</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="input textarea" required />
      </div>

      <div className="input-group">
        <label className="label">Fecha</label>
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="input" required />
      </div>

      <button type="submit" className="submit-button" style={{background: tarjetaAEditar ? '#d97706' : '#0284c7'}}>
        {tarjetaAEditar ? 'Guardar Cambios' : 'Enviar Datos'}
      </button>

      {tarjetaAEditar && (
        <button type="button" onClick={onCancelarEdicion} className="cancel-button">
          Cancelar
        </button>
      )}
    </form>
  );
}