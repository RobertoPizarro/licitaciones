import React from 'react';
import { Eye, Download, FileText } from 'lucide-react';
import './EconomicDocumentsList.css';

interface EconomicDocumentsListProps {
    disabled?: boolean;
}

const EconomicDocumentsList: React.FC<EconomicDocumentsListProps> = ({ disabled = false }) => {
    // Hardcoded economic documents (only 3)
    const documents = [
        { id: 'doc-econ-1', name: 'Propuesta_Economica.xlsx', size: '850 KB' },
        { id: 'doc-econ-2', name: 'Estados_Financieros_Auditados.pdf', size: '3.1 MB' },
        { id: 'doc-econ-3', name: 'Carta_Fianza.pdf', size: '1.2 MB' }
    ];

    const handleView = (docName: string) => {
        console.log(`[Mock] Ver documento: ${docName}`);
    };

    const handleDownload = (docName: string) => {
        console.log(`[Mock] Descargar documento: ${docName}`);
    };

    return (
        <div className={`economic-documents-list ${disabled ? 'disabled' : ''}`}>
            <h3 className="econ-docs-title">
                <FileText size={18} />
                Documentos Económicos Presentados
            </h3>

            {disabled && (
                <div className="econ-docs-empty-state">
                    <p>Seleccione un proveedor para iniciar la evaluación económica</p>
                    <p className="empty-subtext">Evalúe la propuesta económica y asigne una puntuación</p>
                </div>
            )}

            {!disabled && (
                <div className="econ-docs-items-container">
                    {documents.map(doc => (
                        <div key={doc.id} className="econ-doc-item">
                            <div className="econ-doc-icon">
                                <FileText size={20} />
                            </div>
                            <div className="econ-doc-info">
                                <div className="econ-doc-name">{doc.name}</div>
                                <div className="econ-doc-size">{doc.size}</div>
                            </div>
                            <div className="econ-doc-actions">
                                <button
                                    className="econ-doc-action-btn"
                                    onClick={() => handleView(doc.name)}
                                    title="Ver documento"
                                >
                                    <Eye size={16} />
                                </button>
                                <button
                                    className="econ-doc-action-btn"
                                    onClick={() => handleDownload(doc.name)}
                                    title="Descargar documento"
                                >
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EconomicDocumentsList;
