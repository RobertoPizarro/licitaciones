import React from 'react';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import CardBody from '../atoms/CardBody';
import EmptyState from '../molecules/EmptyState';

const LicitacionProposals: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <h2>Propuestas Recibidas (0)</h2>
            </CardHeader>
            <CardBody>
                <EmptyState message="No hay propuestas recibidas" />
            </CardBody>
        </Card>
    );
};

export default LicitacionProposals;
