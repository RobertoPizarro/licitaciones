import React from 'react';
import './DetallesSolicitud.css';
import { DetallesSolicitudProps } from '../../lib/types';

const DetallesSolicitud: React.FC<DetallesSolicitudProps> = ({ title, onTitleChange, notes, onNotesChange, titleError }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Detalles de la Solicitud</h2>
        <p>Ingresa un título y las notas adicionales de manera opcional.</p>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="titulo">Título de la solicitud</label>
          <input
            id="titulo"
            type="text"
            placeholder="Ingrese un título para la solicitud"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          {titleError && <p className="error-message">{titleError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="notas">Notas adicionales</label>
          <textarea
            id="notas"
            placeholder="Agregue notas o comentarios adicionales"
            rows={4}
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DetallesSolicitud;
