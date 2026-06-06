// src/components/Card.jsx
import React from 'react';

// Corrección: Aseguramos que lea correctamente las propiedades desde el objeto 'tarjeta'
export default function Card({ tarjeta, onEliminar, onEdit }) {
  return (
    <div className="card">
      {/* Botón Eliminar */}
      <button className="delete-button" onClick={() => onEliminar(tarjeta.id)} title="Eliminar">
        ✕
      </button>
      
      {/* Botón Editar */}
      <button className="edit-button" onClick={() => onEdit(tarjeta)} title="Editar">
        ✎
      </button>
      
      {/* Pintamos explícitamente los atributos del objeto tarjeta */}
      <h3 className="card-title">{tarjeta.titulo || 'Sin Título'}</h3>
      <p className="card-text"><strong>Por:</strong> {tarjeta.nombre}</p>
      <p className="card-text"><strong>Descripción:</strong> {tarjeta.descripcion}</p>
      <div className="card-footer">
        <span>📅 {tarjeta.fecha}</span>
      </div>
    </div>
  );
}