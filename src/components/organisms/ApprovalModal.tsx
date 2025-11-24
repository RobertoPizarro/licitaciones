import React from 'react';
import { CheckCircle } from 'lucide-react';
import ConfirmationModal from '../molecules/ConfirmationModal';
import NoteBox from '../atoms/NoteBox';
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
                        <span className="info-label">Monto estimado:</span>
                        <span className="info-value">S/ {estimatedAmount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Presupuesto máximo:</span>
                        <span className="info-value">S/ {maxBudget.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <NoteBox>
                    <p>¿Está seguro que desea aprobar la solicitud? Una vez aprobada, se enviará al siguiente nivel del flujo de licitación.</p>
                </NoteBox>
            </div>
        </ConfirmationModal>
    );
};

export default ApprovalModal;
