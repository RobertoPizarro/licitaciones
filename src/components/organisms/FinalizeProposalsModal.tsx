import React from 'react';
import { CheckCircle } from 'lucide-react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import NoteBox from '../atoms/NoteBox';
import Alert from '../atoms/Alert';
import LicitacionInfoCard from '../molecules/LicitacionInfoCard';
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
                    <LicitacionInfoCard
                        id={licitacionId}
                        buyer={buyerName}
                        supervisor={supervisorName}
                        estimatedAmount={estimatedAmount}
                        maxBudget={maxBudget}
                    />

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
                        <Alert variant="warning">
                            <span>Hay {suppliersWithoutDocs} proveedores sin documentos registrados</span>
                        </Alert>
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
