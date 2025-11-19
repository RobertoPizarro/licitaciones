
import React from 'react';
import './DetallesLicitacion.css';
import { DetallesLicitacionProps } from '../../lib/types';

const DetallesLicitacion: React.FC<DetallesLicitacionProps> = ({ 
  budget, 
  onBudgetChange,
  deadline,
  onDeadlineChange,
  budgetError,
  deadlineError
}) => {

  return (
    <div className="card">
      <div className="card-header">
        <h2>Detalles de la Licitación</h2>
        <p>Complete la información específica para este proceso de licitación</p>
      </div>
      <div className="card-body">
        <div className="licitacion-details-grid">
          
          <div className="form-group">
            <label htmlFor="presupuesto">Presupuesto Máximo</label>
            <div className="input-group">
                <span className="input-group-text">S/</span>
                <input 
                    type="number"
                    id="presupuesto"
                    value={budget}
                    onChange={(e) => onBudgetChange(e.target.value)}
                    placeholder="0.00"
                    min="0"
                />
            </div>
            {budgetError && <p className="error-message">{budgetError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fecha-limite">Fecha Límite para Recibir Propuestas</label>
            <input
              type="date"
              id="fecha-limite"
              value={deadline}
              onChange={(e) => onDeadlineChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
            />
            {deadlineError && <p className="error-message">{deadlineError}</p>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetallesLicitacion;
