import React from 'react';
import { Send } from 'lucide-react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import NoteBox from '../atoms/NoteBox';
import './SendToEvaluationModal.css';

interface SendToEvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    licitacionId: string;
    buyer: string;
    supervisor: string;
    estimatedAmount: number;
    maxBudget: number;
    suppliersWithProposals: string[];
    onConfirm?: () => void;
}

const SendToEvaluationModal: React.FC<SendToEvaluationModalProps> = ({
    isOpen,
    onClose,
    licitacionId,
    buyer,
    supervisor,
    estimatedAmount,
    maxBudget,
    suppliersWithProposals,
    onConfirm
}) => {
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="send-evaluation-modal">
                <div className="send-evaluation-header">
                    <div className="send-header-icon">
                        <Send size={24} />
                    </div>
                    <div className="send-header-text">
                        <h2>Enviar a Evaluación</h2>
                    </div>
                </div>

                <div className="send-evaluation-body">
                    <div className="licitacion-info-card">
                        <div className="info-item">
                            <span className="info-label">ID:</span>
                            <span className="info-value">{licitacionId}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Comprador:</span>
                            <span className="info-value">{buyer}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Supervisor:</span>
                            <span className="info-value">{supervisor}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Monto estimado:</span>
                            <span className="info-value">
                                S/ {estimatedAmount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Presupuesto máximo:</span>
                            <span className="info-value">
                                S/ {maxBudget.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    {suppliersWithProposals.length > 0 && (
                        <div className="suppliers-proposals-section">
                            <h4>Proveedores con propuestas:</h4>
                            <ul className="suppliers-proposals-list">
                                {suppliersWithProposals.map((supplier, index) => (
                                    <li key={index}>{supplier}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <NoteBox title="Nota:">
                        <p>¿Confirma el envió a evaluación? La licitación pasará al siguiente estado y tendra que esperar a que finalize la evaluación</p>
                    </NoteBox>
                </div>

                <div className="send-evaluation-footer">
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SendToEvaluationModal;
