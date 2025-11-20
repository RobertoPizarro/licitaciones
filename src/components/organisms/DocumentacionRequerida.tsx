
import React from 'react';
import { Scale, Wrench, PiggyBank } from 'lucide-react';
import DocumentSelector from '../molecules/DocumentSelector';
import './DocumentacionRequerida.css';
import { Documento } from '../../lib/types';

const DOCUMENTOS_LEGALES: Documento[] = [
  { id: 'acta-constitucion', name: 'Acta de Constitución' },
  { id: 'vigencia-poder', name: 'Certificado de Vigencia de Poder' },
  { id: 'ruc', name: 'RUC y Ficha RUC' },
  { id: 'dni-representante', name: 'DNI del Representante Legal' },
  { id: 'poder-representacion', name: 'Poder de Representación' },
  { id: 'no-impedimento', name: 'Declaración Jurada de No Impedimento' },
  { id: 'estatutos-empresa', name: 'Estatutos de la Empresa' },
  { id: 'buena-pro-anterior', name: 'Certificado de Buena Pro Anterior' },
  { id: 'licencia-funcionamiento', name: 'Licencia de Funcionamiento' },
];

const DOCUMENTOS_TECNICOS: Documento[] = [
    { id: 'cert-calidad-iso', name: 'Certificaciones de Calidad (ISO)' },
    { id: 'ficha-tecnica', name: 'Ficha Técnica del Producto/Servicio' },
    { id: 'cert-homologacion', name: 'Certificados de Homologación' },
    { id: 'catalogos-brochures', name: 'Catálogos y Brochures' },
    { id: 'especificaciones-tecnicas', name: 'Especificaciones Técnicas' },
    { id: 'muestras-prototipos', name: 'Muestras o Prototipos' },
    { id: 'cert-origen', name: 'Certificado de Origen' },
    { id: 'cert-garantia', name: 'Certificado de Garantía' },
    { id: 'plan-implementacion', name: 'Plan de implementación' },
    { id: 'metodologia-trabajo', name: 'Metodología de Trabajo' },
    { id: 'ordenes-compra-pasadas', name: 'Órdenes de Compra Pasadas' },
];

const DOCUMENTOS_FINANCIEROS: Documento[] = [
    { id: 'propuesta-economica', name: 'Propuesta Económica' }, // Marked as required
    { id: 'estados-financieros-auditados', name: 'Estados Financieros Auditados' },
    { id: 'linea-credito-aprobada', name: 'Línea de Crédito Aprobada' },
    { id: 'carta-fianza', name: 'Carta de Fianza' },
    { id: 'poliza-fianza', name: 'Póliza de Fianza' },
    { id: 'cert-no-adeudo-tributario', name: 'Certificado de No Adeudo Tributario' },
    { id: 'cert-no-adeudo-essalud', name: 'Certificado de No Adeudo a ESSALUD' },
    { id: 'balance-general', name: 'Balance General' },
    { id: 'estado-resultados', name: 'Estado de Resultados' },
    { id: 'flujo-caja-proyectado', name: 'Flujo de Caja Proyectado' },
    { id: 'referencia-bancaria', name: 'Referencia Bancaria' },
    { id: 'constancia-inscripcion-registro', name: 'Constancia de Inscripción en Registro' },
];

interface DocumentacionRequeridaProps {
    selectedDocs: Record<string, string[]>;
    onSelectedDocsChange: (newSelectedDocs: Record<string, string[]>) => void;
}

const DocumentacionRequerida: React.FC<DocumentacionRequeridaProps> = ({ selectedDocs, onSelectedDocsChange }) => {

    const handleSelectionChange = (category: string, selectedIds: string[]) => {
        onSelectedDocsChange({
            ...selectedDocs,
            [category]: selectedIds
        });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Documentación Requerida</h2>
                <p>Seleccione los documentos que los proveedores deberán presentar obligatoriamente</p>
            </div>
            <div className="card-body documentation-body">
                <DocumentSelector 
                    icon={<Scale size={24} />} 
                    title="Documentos Legales"
                    description="Documentación jurídica y constitutiva de la empresa"
                    options={DOCUMENTOS_LEGALES}
                    selected={selectedDocs.legal || []}
                    onChange={(selected) => handleSelectionChange('legal', selected)}
                />
                <DocumentSelector 
                    icon={<Wrench size={24} />} 
                    title="Documentos Técnicos"
                    description="Especificaciones técnicas y certificaciones"
                    options={DOCUMENTOS_TECNICOS}
                    selected={selectedDocs.technical || []}
                    onChange={(selected) => handleSelectionChange('technical', selected)}
                />
                <DocumentSelector 
                    icon={<PiggyBank size={24} />} 
                    title="Documentos Financieros"
                    description="Información económica y propuesta comercial"
                    options={DOCUMENTOS_FINANCIEROS}
                    selected={selectedDocs.financial || []}
                    onChange={(selected) => handleSelectionChange('financial', selected)}
                    requiredIds={['propuesta-economica']}
                />
            </div>
        </div>
    );
};

export default DocumentacionRequerida;
