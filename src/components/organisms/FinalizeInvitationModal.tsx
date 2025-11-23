import React from 'react';
import { CheckCircle } from 'lucide-react';
import ConfirmationModal from '../molecules/ConfirmationModal';
import Alert from '../atoms/Alert';
import './FinalizeInvitationModal.css';

interface FinalizeInvitationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    licitacionId: string;
    buyer: string;
    supervisor: string;
    estimatedAmount: number;
    maxBudget: number;
    invitedSuppliers: string[];
}

const FinalizeInvitationModal: React.FC<FinalizeInvitationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    licitacionId,
    buyer,
    supervisor,
    estimatedAmount,
    maxBudget,
    invitedSuppliers
}) => {
    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Finalizar Invitación"
            confirmText="Confirmar"
            cancelText="Cancelar"
            confirmVariant="primary"
            icon={<CheckCircle size={24} className="finalize-icon" />}
        >
            <div className="finalize-invitation-content">
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
                        <span className="info-value">S/ {estimatedAmount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Presupuesto máximo:</span>
                        <span className="info-value">S/ {maxBudget.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                {invitedSuppliers.length > 0 && (
                    <div className="invited-suppliers-section">
                        <h4>Proveedores invitados:</h4>
                        <ul className="suppliers-invited-list">
                            {invitedSuppliers.map((supplier, index) => (
                                <li key={index}>{supplier}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <Alert variant="info">
                    <p className="alert-title">Nota:</p>
                    <p>¿Confirma que ha enviado todas las invitaciones a los proveedores seleccionados?</p>
                    <p>La licitación pasará al siguiente estado y ya no podrá modificar las invitaciones</p>
                </Alert>
            </div>
        </ConfirmationModal>
    );
};

export default FinalizeInvitationModal;
