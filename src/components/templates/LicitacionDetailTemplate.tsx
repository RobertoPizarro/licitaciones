import React from 'react';
import PageHeader from '../molecules/PageHeader';
import LicitacionTimeline from '../organisms/LicitacionTimeline';
import LicitacionGeneralInfo from '../organisms/LicitacionGeneralInfo';
import LicitacionItemsTable from '../organisms/LicitacionItemsTable';
import LicitacionProposals from '../organisms/LicitacionProposals';
import LicitacionRequiredDocs from '../organisms/LicitacionRequiredDocs';
import './LicitacionDetailTemplate.css';

interface LicitacionDetailTemplateProps {
    id: string;
    title: string;
    createdDate: string;
    buyer: string;
    supervisor: string;
}

const LicitacionDetailTemplate: React.FC<LicitacionDetailTemplateProps> = ({
    id,
    title,
    createdDate,
    buyer,
    supervisor
}) => {
    return (
        <>
            <div className="licitacion-detail-header-wrapper">
                <PageHeader
                    title={title}
                    description={`ID: ${id}   Fecha creación: ${createdDate}   Comprador: ${buyer}   Supervisor: ${supervisor}`}
                />
                <button className="back-button" onClick={() => window.history.back()}>
                    ← Volver
                </button>
            </div>

            <div className="licitacion-detail-layout">
                <div className="licitacion-detail-left-col">
                    <LicitacionTimeline />
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
