import React from 'react';
import { CheckCircle } from 'lucide-react';
import ConfirmationModal from '../molecules/ConfirmationModal';
import Alert from '../atoms/Alert';
import './ApprovalModal.css';

interface ApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    licitacionId: string;
    buyer: string;
    estimatedAmount: number;
    maxBudget: number;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    licitacionId,
    buyer,
    estimatedAmount,
    maxBudget
}) => {
    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Aprobar Solicitud"
            confirmText="Confirmar"
            cancelText="Cancelar"
            confirmVariant="primary"
            icon={<CheckCircle size={24} className="approval-icon" />}
        >
            <div className="approval-modal-content">
                <div className="licitacion-summary">
                    <div className="summary-item">
                        <span className="summary-label">ID:</span>
                        <span className="summary-value">{licitacionId}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Comprador:</span>
                        <span className="summary-value">{buyer}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Monto estimado:</span>
                        <span className="summary-value">S/ {estimatedAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Presupuesto máximo:</span>
                        <span className="summary-value">S/ {maxBudget.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <Alert variant="info">
                    <p className="alert-title">Nota:</p>
                    <p>¿Está seguro que desea aprobar la solicitud?</p>
                    <p>Una vez aprobada, se enviará al siguiente nivel del flujo de licitación.</p>
                </Alert>
            </div>
        </ConfirmationModal>
    );
};

export default ApprovalModal;
