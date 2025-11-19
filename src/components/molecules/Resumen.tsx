import React from 'react';
import './Resumen.css';
import './Licitacion.css';
import { FileText, AlertTriangle, ArrowRight, Send } from 'lucide-react';
import Button from '../atoms/Button';
import { ResumenProps } from '../../lib/types';


const Resumen: React.FC<ResumenProps> = ({ 
    totalAmount, 
    onSubmit, 
    subtitle = 'Revisa el monto total y el tipo de proceso antes de continuar.',
    buttonText
}) => {
  const isLicitacion = totalAmount > 10000;

  const renderButton = () => {
    if (buttonText) {
        return (
            <Button variant="licitacion" onClick={onSubmit}>
                <Send size={20} />
                <span>{buttonText}</span>
            </Button>
        );
    }

    if (isLicitacion) {
        return (
            <Button variant="licitacion" onClick={onSubmit}>
                <ArrowRight size={20} />
                <span>Iniciar Proceso de Licitación</span>
            </Button>
        );
    } else {
        return (
            <Button variant="primary" onClick={onSubmit}>
                <Send size={20} />
                <span>Crear Solicitud</span>
            </Button>
        );
    }
  };

  return (
    <div className={`card summary-card ${isLicitacion ? 'licitacion-summary-card' : ''}`}>
        <div className="summary-card-header">
            <h2>Resumen</h2>
            <p>{subtitle}</p>
        </div>
        <div className="card-body">
            <div className="summary-item">
                <span>Monto Total Estimado:</span>
                <span className="total-amount">S/ {totalAmount.toFixed(2)}</span>
            </div>

            <div className={`process-type ${isLicitacion ? 'licitacion-process-type' : ''}`}>
                {isLicitacion ? (
                    <AlertTriangle className="icon" size={24} />
                ) : (
                    <FileText className="icon" size={24} />
                )}
                <div>
                    <p><strong>Tipo de Proceso: {isLicitacion ? 'Licitación' : 'Simple'}</strong></p>
                    <p>
                        {isLicitacion
                            ? 'Esta solicitud supera el límite y debe seguir un proceso de licitación formal.'
                            : 'Compra simple, rápida de bajo monto.'}
                    </p>
                </div>
            </div>

            <div className="button-container">
                {renderButton()}
            </div>
        </div>
    </div>
  );
};

export default Resumen;
