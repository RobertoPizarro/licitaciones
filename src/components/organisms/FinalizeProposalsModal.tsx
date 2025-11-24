import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import NoteBox from '../atoms/NoteBox';
import './FinalizeProposalsModal.css';

interface FinalizeProposalsModalProps {
    isOpen: boolean;
    onClose: () => void;
    licitacionId: string;
    buyerName: string;
    supervisorName: string;
    estimatedAmount: number;
    maxBudget: number;
    suppliersWithProposals: string[];
    suppliersWithoutDocs: number;
    onConfirm?: () => void;
}

const FinalizeProposalsModal: React.FC<FinalizeProposalsModalProps> = ({
    isOpen,
    onClose,
    licitacionId,
    buyerName,
    supervisorName,
    estimatedAmount,
    maxBudget,
    suppliersWithProposals,
    suppliersWithoutDocs,
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
            <div className="finalize-proposals-modal">
                <div className="finalize-proposals-header">
                    <div className="finalize-header-icon">
                        <CheckCircle size={24} />
                    </div>
                    <div className="finalize-header-text">
                        <h2>Finalizar Registro</h2>
                    </div>
                </div>

                <div className="finalize-proposals-body">
                    <div className="licitacion-info-card">
                        <div className="info-item">
                            <span className="info-label">ID:</span>
                            <span className="info-value">{licitacionId}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Comprador:</span>
                            <span className="info-value">{buyerName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Supervisor:</span>
                            <span className="info-value">{supervisorName}</span>
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

                    {suppliersWithoutDocs > 0 && (
                        <div className="warning-alert">
                            <AlertTriangle size={20} />
                            <span>Hay {suppliersWithoutDocs} proveedores sin documentos registrados</span>
                        </div>
                    )}

                    <NoteBox>
                        <p>¿Confirme que se han registrado todas las propuestas? La licitación pasará al siguiente estado y ya no podrá modificar las propuestas</p>
                    </NoteBox>
                </div>

                <div className="finalize-proposals-footer">
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

export default FinalizeProposalsModal;
