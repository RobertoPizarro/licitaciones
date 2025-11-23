import React from 'react';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import CardBody from '../atoms/CardBody';
import DocCategoryBlock from '../molecules/DocCategoryBlock';
import { Scale, Wrench, PiggyBank } from 'lucide-react';

const LicitacionRequiredDocs: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <h2>Documentos Requeridos</h2>
            </CardHeader>
            <CardBody>
                <DocCategoryBlock
                    icon={<Scale size={20} />}
                    title="Documentos Legales"
                    documents={[
                        "RUC y Ficha RUC",
                        "DNI del Representante Legal",
                        "Acta de Constitución"
                    ]}
                />
                <DocCategoryBlock
                    icon={<Wrench size={20} />}
                    title="Documentos Técnicos"
                    documents={[
                        "Ficha Técnica del Producto",
                        "Certificaciones de Calidad (ISO)",
                        "Catálogos y Brochures"
                    ]}
                />
                <DocCategoryBlock
                    icon={<PiggyBank size={20} />}
                    title="Documentos Financieros"
                    documents={[
                        "Propuesta Económica",
                        "Estados Financieros Auditados",
                        "Carta de Fianza"
                    ]}
                />
            </CardBody>
        </Card>
    );
};

export default LicitacionRequiredDocs;
