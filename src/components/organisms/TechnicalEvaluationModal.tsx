import React, { useState, useMemo } from 'react';
import { Save } from 'lucide-react';
import WideModal from '../atoms/WideModal';
import Button from '../atoms/Button';
import EvaluationModalHeader from '../molecules/EvaluationModalHeader';
import ProviderSelectorCard from '../molecules/ProviderSelectorCard';
import NotesTextarea from '../molecules/NotesTextarea';
import DocumentsChecklist from '../molecules/DocumentsChecklist';
import EvaluableDocumentsList from './EvaluableDocumentsList';
import { DocumentEvaluation, ProviderEvaluation } from '../../lib/types';
import { EvaluationStatus } from '../atoms/EvaluationStatusButtons';
import './TechnicalEvaluationModal.css';

interface Supplier {
    id: number;
    name: string;
    ruc: string;
    email: string;
}

interface TechnicalEvaluationModalProps {
    isOpen: boolean;
    onClose: () => void;
    licitacionId: string;
    licitacionTitle: string;
    presupuesto?: string;
    solicitudOrigen?: string;
    fechaLimite?: string;
    comprador?: string;
    suppliers: Supplier[];
    onSaveEvaluation?: (evaluation: ProviderEvaluation) => void;
    onFinishEvaluation?: () => void;
}

const TechnicalEvaluationModal: React.FC<TechnicalEvaluationModalProps> = ({
    isOpen,
    onClose,
    licitacionId,
    licitacionTitle,
    suppliers,
    onSaveEvaluation,
    onFinishEvaluation
}) => {
    const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
    const [documentEvaluations, setDocumentEvaluations] = useState<Map<string, DocumentEvaluation>>(new Map());
    const [missingDocuments, setMissingDocuments] = useState<Set<string>>(new Set());
    const [notes, setNotes] = useState('');

    // Track evaluated providers to update stats
    const [evaluatedProviders, setEvaluatedProviders] = useState<Set<number>>(new Set());

    // Total documents count (hardcoded: 3 legal + 3 technical + 3 financial = 9)
    const totalDocuments = 9;

    // Calculate document stats for current provider
    const currentDocStats = useMemo(() => {
        const evaluations = Array.from(documentEvaluations.values());
        const evaluated = evaluations.filter(e => e.status !== null).length;
        return { evaluated };
    }, [documentEvaluations]);

    const selectedSupplier = suppliers.find(s => s.id === selectedSupplierId);

    const handleEvaluationChange = (documentId: string, status: EvaluationStatus) => {
        setDocumentEvaluations(prev => {
            const newMap = new Map(prev);
            const existingEval = prev.get(documentId);

            if (existingEval) {
                newMap.set(documentId, { ...existingEval, status });
            } else {
                newMap.set(documentId, {
                    documentId,
                    documentName: documentId,
                    fileSize: '0 KB',
                    status
                });
            }

            return newMap;
        });
    };

    const handleToggleMissingDocument = (documentId: string) => {
        setMissingDocuments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(documentId)) {
                newSet.delete(documentId);
            } else {
                newSet.add(documentId);
            }
            return newSet;
        });
    };

    const handleSelectSupplier = (supplierId: number) => {
        setSelectedSupplierId(supplierId);
        // Reset evaluations when changing supplier
        setDocumentEvaluations(new Map());
        setMissingDocuments(new Set());
        setNotes('');
    };

    const handleSave = () => {
        if (!selectedSupplier) return;

        const evaluation: ProviderEvaluation = {
            providerId: selectedSupplier.id,
            providerName: selectedSupplier.name,
            providerRuc: selectedSupplier.ruc,
            documentsEvaluation: Array.from(documentEvaluations.values()),
            notes,
            evaluatedCount: currentDocStats.evaluated,
            approvedCount: 0, // Logic for provider approval would go here
            rejectedCount: 0
        };

        if (onSaveEvaluation) {
            onSaveEvaluation(evaluation);
        } else {
            console.log('[Mock] Guardar evaluación:', evaluation);
        }

        // Mark provider as evaluated
        setEvaluatedProviders(prev => new Set(prev).add(selectedSupplier.id));

        // Reset form for next provider
        setSelectedSupplierId(null);
        setDocumentEvaluations(new Map());
        setMissingDocuments(new Set());
        setNotes('');
    };

    const handleFinish = () => {
        // Call callback to transition to next state (Economic Evaluation)
        if (onFinishEvaluation) {
            onFinishEvaluation();
        }
        handleClose();
    };

    const handleClose = () => {
        setSelectedSupplierId(null);
        setDocumentEvaluations(new Map());
        setMissingDocuments(new Set());
        setNotes('');
        setEvaluatedProviders(new Set());
        onClose();
    };

    return (
        <WideModal isOpen={isOpen} onClose={handleClose} width="wide" showCloseButton={false}>
            <div className="technical-evaluation-modal">
                <EvaluationModalHeader
                    licitacionId={licitacionId}
                    licitacionTitle={licitacionTitle}
                    totalProviders={suppliers.length}
                    evaluatedProviders={evaluatedProviders.size}
                    approvedProviders={0} // Placeholder
                    rejectedProviders={0} // Placeholder
                    onClose={handleClose}
                    onFinish={handleFinish}
                    canFinish={evaluatedProviders.size === suppliers.length}
                />

                <div className="evaluation-modal-body">
                    <div className="evaluation-left-column">
                        <DocumentsChecklist
                            checkedDocuments={missingDocuments}
                            onToggleDocument={handleToggleMissingDocument}
                            disabled={!selectedSupplierId}
                        />
                    </div>

                    <div className="evaluation-right-column">
                        <ProviderSelectorCard
                            suppliers={suppliers}
                            selectedSupplierId={selectedSupplierId}
                            onSelectSupplier={handleSelectSupplier}
                            totalFiles={totalDocuments}
                            evaluatedFiles={currentDocStats.evaluated}
                        />

                        <EvaluableDocumentsList
                            evaluations={documentEvaluations}
                            onEvaluationChange={handleEvaluationChange}
                            disabled={!selectedSupplierId}
                        />

                        <NotesTextarea
                            value={notes}
                            onChange={setNotes}
                            disabled={!selectedSupplierId}
                        />

                        <div className="evaluation-save-container">
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                disabled={!selectedSupplierId || currentDocStats.evaluated === 0}
                                className="save-evaluation-btn"
                            >
                                <Save size={18} />
                                Guardar Evaluación
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </WideModal>
    );
};

export default TechnicalEvaluationModal;
