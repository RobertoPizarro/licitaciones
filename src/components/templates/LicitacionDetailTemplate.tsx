import React from 'react';
import { ArrowLeftFromLine } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import LicitacionTimeline from '../organisms/LicitacionTimeline';
import LicitacionGeneralInfo from '../organisms/LicitacionGeneralInfo';
import LicitacionItemsTable from '../organisms/LicitacionItemsTable';
import LicitacionProposals from '../organisms/LicitacionProposals';
import LicitacionRequiredDocs from '../organisms/LicitacionRequiredDocs';
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
    onApprove: () => void;
    onReject: () => void;
}

const LicitacionDetailTemplate: React.FC<LicitacionDetailTemplateProps> = ({
    id,
    title,
    createdDate,
    buyer,
    supervisor,
    currentStatus,
    timestamps,
    onApprove,
    onReject
}) => {
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
                            <span><strong>Supervisor:</strong> {supervisor}</span>
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
                        onApprove={onApprove}
                        onReject={onReject}
                    />
                </div>
                <div className="licitacion-detail-right-col">
                    <LicitacionGeneralInfo />
                    <LicitacionItemsTable />
                    <LicitacionProposals />
                    <LicitacionRequiredDocs />
                </div>
            </div>
        </>
    );
};

export default LicitacionDetailTemplate;
