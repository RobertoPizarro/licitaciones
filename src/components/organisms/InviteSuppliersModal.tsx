import React, { useState } from 'react';
import { Mail, Download } from 'lucide-react';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import './InviteSuppliersModal.css';

interface Supplier {
    id: number;
    name: string;
    ruc: string;
    email: string;
    category: string;
}

interface InviteSuppliersModalProps {
    isOpen: boolean;
    onClose: () => void;
    licitacionId: string;
    licitacionTitle: string;
    estimatedAmount: number;
    maxBudget: number;
    onSuppliersInvited?: (suppliers: string[]) => void;
}

const mockSuppliers: Supplier[] = [
    { id: 1, name: "Tech Solutions SAC", ruc: "20123456789", email: "ventas@techsolutions.com", category: "Tecnología" },
    { id: 2, name: "Computadoras del Perú SA", ruc: "20987654321", email: "contacto@computadoras.pe", category: "Tecnología" },
    { id: 3, name: "Digital Store EIRL", ruc: "20456789123", email: "info@digitalstore.com", category: "Tecnología" },
    { id: 4, name: "TechMart Perú S.A.C.", ruc: "20789123456", email: "ventas@techmart.pe", category: "Tecnología" },
    { id: 5, name: "Global Tech Solutions S.A.", ruc: "20321654987", email: "cotizaciones@globaltech.com.pe", category: "Tecnología" },
    { id: 6, name: "ElectroSystems del Sur E.I.R.L.", ruc: "20147258369", email: "ventas@electrosur.pe", category: "Tecnología" },
    { id: 7, name: "Distribuidora Integral S.A.C.", ruc: "20963852741", email: "info@distintegral.com", category: "Tecnología" },
    { id: 8, name: "Computación Integral Andina S.A.", ruc: "20258741963", email: "cotizaciones@compuandina.pe", category: "Tecnología" }
];

const requiredDocs = [
    "RUC y Ficha RUC",
    "DNI del Representante Legal",
    "Vigencia de Poder del Representante Legal",
    "Ficha Técnica del Producto",
    "Certificaciones de Calidad (ISO)",
    "Referencias Comerciales",
    "Propuesta Económica",
    "Estados Financieros Auditados",
    "Carta de Fianza"
];

const InviteSuppliersModal: React.FC<InviteSuppliersModalProps> = ({
    isOpen,
    onClose,
    licitacionId,
    licitacionTitle,
    maxBudget,
    onSuppliersInvited
}) => {
    const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);

    const handleToggleSupplier = (supplierId: number) => {
        setSelectedSuppliers(prev => {
            if (prev.includes(supplierId)) {
                return prev.filter(id => id !== supplierId);
            } else {
                return [...prev, supplierId];
            }
        });
    };

    const getSelectedEmails = () => {
        return mockSuppliers
            .filter(s => selectedSuppliers.includes(s.id))
            .map(s => s.email)
            .join(', ');
    };

    const getSelectedSupplierNames = () => {
        return mockSuppliers
            .filter(s => selectedSuppliers.includes(s.id))
            .map(s => s.name);
    };

    const emailSubject = `Invitación a Licitación - ${licitacionTitle}`;

    const emailBody = `Estimado Proveedor,

Le invitamos a participar en el proceso de licitación para la ${licitacionTitle}

Detalles de la licitación:
• Licitación N°: ${licitacionId}
• Descripción: Laptop G10, Cantidad: 15
• Presupuesto Máximo: S/ ${maxBudget.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
• Fecha límite para recibir propuestas: 10 Nov 2025

Adjunto encontrará las plantillas de la documentación requerida para su propuesta.

Por favor, envíe su propuesta completa antes de la fecha límite indicada.

Atentamente,
Juan Pérez - Módulo de Compras`;


    const handleOpenGmail = () => {
        const emails = getSelectedEmails();
        const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emails)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailto, '_blank');

        // Guardar proveedores invitados
        if (onSuppliersInvited) {
            onSuppliersInvited(getSelectedSupplierNames());
        }
    };

    const handleClose = () => {
        setSelectedSuppliers([]);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="invite-suppliers-modal">
                <div className="invite-suppliers-header">
                    <div className="invite-header-icon">
                        <Mail size={24} />
                    </div>
                    <div className="invite-header-text">
                        <h2>Invitar Proveedores</h2>
                        <p className="invite-subtitle">ID: {licitacionId} - {licitacionTitle}</p>
                    </div>
                </div>

                <div className="invite-suppliers-body">
                    {/* Sección de selección de proveedores */}
                    <div className="suppliers-section">
                        <div className="section-header">
                            <h3>Seleccionar Proveedores</h3>
                            <span className="selection-count">{selectedSuppliers.length} seleccionados</span>
                        </div>

                        <div className="suppliers-list">
                            {mockSuppliers.map(supplier => (
                                <div
                                    key={supplier.id}
                                    className={`supplier-item ${selectedSuppliers.includes(supplier.id) ? 'selected' : ''}`}
                                    onClick={() => handleToggleSupplier(supplier.id)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSuppliers.includes(supplier.id)}
                                        onChange={() => handleToggleSupplier(supplier.id)}
                                        className="supplier-checkbox"
                                    />
                                    <div className="supplier-info">
                                        <div className="supplier-name">{supplier.name}</div>
                                        <div className="supplier-details">
                                            RUC: {supplier.ruc} | {supplier.email}
                                        </div>
                                    </div>
                                    <Badge variant="info">{supplier.category}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sección de email - solo visible cuando hay seleccionados */}
                    {selectedSuppliers.length > 0 && (
                        <>
                            <div className="email-section">
                                <div className="form-field">
                                    <label>Correos Electrónicos</label>
                                    <input
                                        type="text"
                                        value={getSelectedEmails()}
                                        readOnly
                                        className="readonly-input"
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Asunto</label>
                                    <input
                                        type="text"
                                        value={emailSubject}
                                        readOnly
                                        className="readonly-input"
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Descripción del correo</label>
                                    <textarea
                                        value={emailBody}
                                        readOnly
                                        className="readonly-textarea"
                                        rows={10}
                                    />
                                </div>

                                <div className="documents-section">
                                    <div className="section-header">
                                        <h4>Documentos Requeridos (Plantillas)</h4>
                                    </div>
                                    <ul className="documents-list">
                                        {requiredDocs.map((doc, index) => (
                                            <li key={index}>{doc}</li>
                                        ))}
                                    </ul>
                                    <Button variant="primary" size="sm" className="download-button">
                                        <Download size={16} />
                                        Descargar Plantillas (ZIP)
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Mensaje cuando no hay seleccionados */}
                    {selectedSuppliers.length === 0 && (
                        <div className="empty-selection">
                            <p>Seleccione al menos un proveedor para continuar</p>
                        </div>
                    )}
                </div>

                <div className="invite-suppliers-footer">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {selectedSuppliers.length > 0 && (
                        <Button variant="primary" onClick={handleOpenGmail}>
                            <Mail size={16} />
                            Abrir Gmail
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default InviteSuppliersModal;
