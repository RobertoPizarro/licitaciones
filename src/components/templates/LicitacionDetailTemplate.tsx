import React, { useState } from 'react';
import { ArrowLeftFromLine } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import LicitacionTimeline from '../organisms/LicitacionTimeline';
import LicitacionGeneralInfo from '../organisms/LicitacionGeneralInfo';
import LicitacionItemsTable from '../organisms/LicitacionItemsTable';
import LicitacionProposals from '../organisms/LicitacionProposals';
import LicitacionRequiredDocs from '../organisms/LicitacionRequiredDocs';
import ApprovalModal from '../organisms/ApprovalModal';
import CancellationModal from '../organisms/CancellationModal';
import InviteSuppliersModal from '../organisms/InviteSuppliersModal';
import FinalizeInvitationModal from '../organisms/FinalizeInvitationModal';
import RegisterProposalModal from '../organisms/RegisterProposalModal';
import FinalizeProposalsModal from '../organisms/FinalizeProposalsModal';
import SendToEvaluationModal from '../organisms/SendToEvaluationModal';
import { Proposal } from '../molecules/ProposalCard';
import { LicitacionStatus } from '../../lib/types';
import './LicitacionDetailTemplate.css';

interface LicitacionDetailTemplateProps {
    id: string;
    title: string;
    createdDate: string;
    buyer: string;
    supervisor: string;
    currentStatus: LicitacionStatus;
    timestamps: Partial<Record<LicitacionStatus, string>>;
    estimatedAmount: number;
    maxBudget: number;
    proveedoresCount?: number;
    propuestasRegistradas?: number;
    propuestasAprobadasTecnicamente?: number;
    propuestasAprobadasEconomicamente?: number;
    onApprove: () => void;
    onReject: () => void;
    onFinalizarInvitacion?: () => void;
    onFinalizarRegistro?: () => void;
    onEnviarEvaluacion?: () => void;
    onIniciarEvaluacionTecnica?: () => void;
    onIniciarEvaluacionEconomica?: () => void;
    onGenerarContrato?: () => void;
    onEnviarOrdenCompra?: () => void;
}

const LicitacionDetailTemplate: React.FC<LicitacionDetailTemplateProps> = ({
    id,
    title,
    createdDate,
    buyer,
    supervisor,
    currentStatus,
    timestamps,
    estimatedAmount,
    maxBudget,
    proveedoresCount: _proveedoresCount,
    propuestasRegistradas: _propuestasRegistradas,
    propuestasAprobadasTecnicamente,
    propuestasAprobadasEconomicamente,
    onApprove,
    onReject,
    onFinalizarInvitacion,
    onFinalizarRegistro,
    onEnviarEvaluacion,
    onIniciarEvaluacionTecnica,
    onIniciarEvaluacionEconomica,
    onGenerarContrato,
    onEnviarOrdenCompra
}) => {
    // Modal states
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showCancellationModal, setShowCancellationModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showFinalizeInviteModal, setShowFinalizeInviteModal] = useState(false);
    const [showRegisterProposalModal, setShowRegisterProposalModal] = useState(false);
    const [showFinalizeProposalsModal, setShowFinalizeProposalsModal] = useState(false);
    const [showSendToEvaluationModal, setShowSendToEvaluationModal] = useState(false);

    // Approval/Rejection states
    const [isApproved, setIsApproved] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [supervisorName, setSupervisorName] = useState(supervisor);

    // Supplier invitation states
    const [invitedSuppliers, setInvitedSuppliers] = useState<string[]>([]);

    // Proposal registration states
    const [registeredProposals, setRegisteredProposals] = useState<Proposal[]>([]);
    const [isCancelledNoProposals, setIsCancelledNoProposals] = useState(false);

    const handleApproveClick = () => {
        setShowApprovalModal(true);
    };

    const handleCancelClick = () => {
        setShowCancellationModal(true);
    };

    const handleApprovalConfirm = () => {
        setIsApproved(true);
        setSupervisorName('Mario Altamirano');
        setShowApprovalModal(false);
        onApprove();
    };

    const handleCancellationConfirm = () => {
        setIsRejected(true);
        setSupervisorName('Mario Altamirano');
        setShowCancellationModal(false);
        onReject();
    };

    // Mock suppliers for registration (should come from API/Props in real app)
    const mockSuppliersForRegistration = [
        { id: 1, name: "Tech Solutions SAC", ruc: "20123456789", email: "ventas@techsolutions.com" },
        { id: 2, name: "Computadoras del Perú SA", ruc: "20987654321", email: "contacto@computadoras.pe" },
        { id: 3, name: "Digital Store EIRL", ruc: "20456789123", email: "info@digitalstore.com" },
        { id: 4, name: "TechMart Perú S.A.C.", ruc: "20789123456", email: "ventas@techmart.pe" },
        { id: 5, name: "Global Tech Solutions S.A.", ruc: "20321654987", email: "cotizaciones@globaltech.com.pe" }
    ];

    const handleRegistrarPropuesta = () => {
        setShowRegisterProposalModal(true);
    };

    const handleFinalizarRegistroClick = () => {
        setShowFinalizeProposalsModal(true);
    };

    const handleRegisterProposalConfirm = (supplierId: number, _files: File[]) => {
        const supplier = mockSuppliersForRegistration.find(s => s.id === supplierId);
        if (supplier) {
            const newProposal: Proposal = {
                id: supplier.id,
                supplierName: supplier.name,
                ruc: supplier.ruc,
                technicalStatus: 'Pending',
                economicStatus: 'Pending'
            };

            // Check if already registered to avoid duplicates
            if (!registeredProposals.find(p => p.id === supplierId)) {
                setRegisteredProposals(prev => [...prev, newProposal]);
            }
        }
        setShowRegisterProposalModal(false);
    };

    const handleConfirmFinalizeProposals = () => {
        setShowFinalizeProposalsModal(false);
        if (registeredProposals.length === 0) {
            setIsCancelledNoProposals(true);
        } else {
            onFinalizarRegistro?.();
        }
    };

    const handleSendToEvaluation = () => {
        setShowSendToEvaluationModal(true);
    };

    const handleConfirmSendToEvaluation = () => {
        setShowSendToEvaluationModal(false);
        onEnviarEvaluacion?.();
    };

    const handleInviteSuppliers = () => {
        setShowInviteModal(true);
    };

    const handleFinalizarInvitacionClick = () => {
        setShowFinalizeInviteModal(true);
    };

    const handleConfirmFinalizeInvitation = () => {
        setShowFinalizeInviteModal(false);
        onFinalizarInvitacion?.();
    };

    return (
        <>
            <div className="licitacion-detail-header-wrapper">
                <PageHeader
                    title={title}
                    description={
                        <div className="header-metadata">
                            <span><strong>ID:</strong> {id}</span>
                            <span><strong>Fecha creación:</strong> {createdDate}</span>
                            <span><strong>Comprador:</strong> {buyer}</span>
                            <span><strong>Supervisor:</strong> {isApproved || isRejected ? supervisorName : supervisor}</span>
                        </div>
                    }
                />
                <Button variant="secondary" size="sm" onClick={() => window.history.back()}>
                    <ArrowLeftFromLine size={16} />
                    Volver
                </Button>
            </div>

            <div className="licitacion-detail-layout">
                <div className="licitacion-detail-left-col">
                    <LicitacionTimeline
                        currentStatus={currentStatus}
                        timestamps={timestamps}
                        onApprove={handleApproveClick}
                        onReject={handleCancelClick}
                        isApproved={isApproved}
                        supervisorName={supervisorName}
                        isRejected={isRejected}
                        proveedoresCount={invitedSuppliers.length}
                        propuestasRegistradas={registeredProposals.length}
                        propuestasAprobadasTecnicamente={propuestasAprobadasTecnicamente}
                        propuestasAprobadasEconomicamente={propuestasAprobadasEconomicamente}
                        onRegistrarPropuesta={handleRegistrarPropuesta}
                        onInvitarProveedores={handleInviteSuppliers}
                        onFinalizarInvitacion={handleFinalizarInvitacionClick}
                        onFinalizarRegistro={handleFinalizarRegistroClick}
                        onEnviarEvaluacion={handleSendToEvaluation}
                        onIniciarEvaluacionTecnica={onIniciarEvaluacionTecnica}
                        onIniciarEvaluacionEconomica={onIniciarEvaluacionEconomica}
                        onGenerarContrato={onGenerarContrato}
                        onEnviarOrdenCompra={onEnviarOrdenCompra}
                        isCancelledNoProposals={isCancelledNoProposals}
                    />
                </div>
                <div className="licitacion-detail-right-col">
                    <LicitacionGeneralInfo />
                    <LicitacionItemsTable />
                    <LicitacionProposals proposals={registeredProposals} />
                    <LicitacionRequiredDocs />
                </div>
            </div>

            {/* Modals */}
            <ApprovalModal
                isOpen={showApprovalModal}
                onClose={() => setShowApprovalModal(false)}
                onConfirm={handleApprovalConfirm}
                licitacionId={id}
                buyer={buyer}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
            />

            <CancellationModal
                isOpen={showCancellationModal}
                onClose={() => setShowCancellationModal(false)}
                onConfirm={handleCancellationConfirm}
                licitacionId={id}
                buyer={buyer}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
            />

            <InviteSuppliersModal
                isOpen={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                licitacionId={id}
                licitacionTitle={title}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
                onSuppliersInvited={setInvitedSuppliers}
            />

            <FinalizeInvitationModal
                isOpen={showFinalizeInviteModal}
                onClose={() => setShowFinalizeInviteModal(false)}
                onConfirm={handleConfirmFinalizeInvitation}
                licitacionId={id}
                buyer={buyer}
                supervisor={supervisorName}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
                invitedSuppliers={invitedSuppliers}
            />

            <RegisterProposalModal
                isOpen={showRegisterProposalModal}
                onClose={() => setShowRegisterProposalModal(false)}
                licitacionId={id}
                licitacionTitle={title}
                suppliers={mockSuppliersForRegistration.filter(s => invitedSuppliers.includes(s.name))}
                onRegisterProposal={handleRegisterProposalConfirm}
            />

            <FinalizeProposalsModal
                isOpen={showFinalizeProposalsModal}
                onClose={() => setShowFinalizeProposalsModal(false)}
                onConfirm={handleConfirmFinalizeProposals}
                licitacionId={id}
                buyerName={buyer}
                supervisorName={supervisorName}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
                suppliersWithProposals={registeredProposals.map(p => p.supplierName)}
                suppliersWithoutDocs={Math.max(0, (invitedSuppliers.length > 0 ? invitedSuppliers.length : mockSuppliersForRegistration.length) - registeredProposals.length)}
            />

            <SendToEvaluationModal
                isOpen={showSendToEvaluationModal}
                onClose={() => setShowSendToEvaluationModal(false)}
                onConfirm={handleConfirmSendToEvaluation}
                licitacionId={id}
                buyer={buyer}
                supervisor={isApproved || isRejected ? supervisorName : supervisor}
                estimatedAmount={estimatedAmount}
                maxBudget={maxBudget}
                suppliersWithProposals={registeredProposals.map(p => p.supplierName)}
            />
        </>
    );
};

export default LicitacionDetailTemplate;
