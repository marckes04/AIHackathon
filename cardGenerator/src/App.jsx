// src/App.jsx
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

export default function App() {
  const [listaTarjetas, setListaTarjetas] = useState(() => {
    const datosGuardados = localStorage.getItem('hackathon_tarjetas');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  // NUEVO: Estado para la tarjeta que se está editando actualmente
  const [tarjetaAEditar, setTarjetaAEditar] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    localStorage.setItem('hackathon_tarjetas', JSON.stringify(listaTarjetas));
  }, [listaTarjetas]);

  const manejarGuardarTarjeta = (datosTarjeta) => {
    if (tarjetaAEditar) {
      // MODO EDICIÓN: Buscamos la tarjeta por ID y reemplazamos sus datos
      const listaActualizada = listaTarjetas.map(t => 
        t.id === tarjetaAEditar.id ? { ...datosTarjeta } : t
      );
      setListaTarjetas(listaActualizada);
      setTarjetaAEditar(null); // Salimos del modo edición
    } else {
      // MODO CREACIÓN
      const nuevaTarjeta = { ...datosTarjeta, id: Date.now() };
      setListaTarjetas([...listaTarjetas, nuevaTarjeta]);
    }
  };

  const eliminarTarjeta = (id) => {
    setListaTarjetas(listaTarjetas.filter(t => t.id !== id));
    if (tarjetaAEditar?.id === id) setTarjetaAEditar(null);
  };

  const tarjetasFiltradas = listaTarjetas.filter(t =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Card Generator Pro</h1>
      
      <Form 
        onAgregarTarjeta={manejarGuardarTarjeta} 
        tarjetaAEditar={tarjetaAEditar}
        onCancelarEdicion={() => setTarjetaAEditar(null)}
      />

      <hr className="divider" />

      <div className="header-seccion">
        <h2 className="subtitle">Datos Desplegados</h2>
        <span className="badge-contador">Total: {listaTarjetas.length}</span>
      </div>

      {listaTarjetas.length > 0 && (
        <input
          type="text"
          placeholder="🔍 Buscar..."
          className="search-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      )}
      
      <div className="grid">
        {tarjetasFiltradas.map((t) => (
          <Card 
            key={t.id}
            tarjeta={t}
            onEliminar={eliminarTarjeta}
            onEdit={(tarjeta) => setTarjetaAEditar(tarjeta)}
          />
        ))}
      </div>
    </div>
  );
}