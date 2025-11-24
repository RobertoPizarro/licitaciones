import React from 'react';
import { Eye, Hourglass } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import './ProposalCard.css';

export interface Proposal {
    id: number;
    supplierName: string;
    ruc: string;
    technicalStatus: 'Pending' | 'Approved' | 'Rejected';
    economicStatus: 'Pending' | 'Approved' | 'Rejected';
}

interface ProposalCardProps {
    proposal: Proposal;
    onViewDetails?: (id: number) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onViewDetails }) => {
    return (
        <div className="proposal-card">
            <div className="proposal-header">
                <h3 className="proposal-supplier-name">{proposal.supplierName}</h3>
                <span className="proposal-ruc">RUC: {proposal.ruc}</span>
            </div>

            <div className="proposal-body">
                <div className="proposal-statuses">
                    <Badge variant="neutral">
                        <Hourglass size={14} className="status-icon" />
                        Eval. Técnica Pendiente
                    </Badge>
                    <Badge variant="neutral">
                        <Hourglass size={14} className="status-icon" />
                        Eval. Económica Pendiente
                    </Badge>
                </div>

                <div className="proposal-actions">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewDetails && onViewDetails(proposal.id)}
                    >
                        <Eye size={16} />
                        Ver Detalles
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProposalCard;
