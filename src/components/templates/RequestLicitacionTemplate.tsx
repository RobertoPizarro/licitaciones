
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetallesLicitacion from '../organisms/DetallesLicitacion';
import DocumentacionRequerida from '../organisms/DocumentacionRequerida';
import Resumen from '../molecules/Resumen';
import { Item } from '../../lib/types';

const hardcodedTitle = "Licitación de Suministros y Servicios TI";
const hardcodedNotes = "Requerimos la cotización para la renovación de equipos y la contratación de servicios de soporte técnico especializado.";
const hardcodedItems: Item[] = [
  { id: 'prod-1', type: 'Producto', description: 'Laptop de alto rendimiento para desarrolladores', quantity: 10, price: 6000 },
  { id: 'serv-1', type: 'Servicio', description: 'Consultoría y desarrollo de software a medida', estimatedHours: 120, hourlyRate: 200 }
];

const ReadOnlyItem = ({ item }: { item: Item }) => {
  const total = item.type === 'Producto'
    ? (item.quantity || 0) * (item.price || 0)
    : (item.estimatedHours || 0) * (item.hourlyRate || 0);

  return (
    <div className="readonly-item-card">
      <div className="licitacion-item-grid">
        <div><label>Tipo</label><p>{item.type}</p></div>
        <div><label>Descripción</label><p>{item.description}</p></div>
        {item.type === 'Producto' ? (
          <>
            <div><label>Cantidad</label><p>{item.quantity}</p></div>
            <div><label>Precio Uni.</label><p>S/ {item.price?.toFixed(2)}</p></div>
          </>
        ) : (
          <>
            <div><label>Horas Estimadas</label><p>{item.estimatedHours}</p></div>
            <div><label>Tarifa / Hora</label><p>S/ {item.hourlyRate?.toFixed(2)}</p></div>
          </>
        )}
        <div className="total-column"><label>Total Item</label><p>S/ {total.toFixed(2)}</p></div>
      </div>
    </div>
  );
};

const RequestLicitacionTemplate: React.FC = () => {
  const navigate = useNavigate();

  const [title] = useState(hardcodedTitle);
  const [notes] = useState(hardcodedNotes);
  const [items] = useState<Item[]>(hardcodedItems);

  const [budget, setBudget] = useState<number | string>('');
  const [deadline, setDeadline] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<Record<string, string[]>>({ financial: ['propuesta-economica'] });

  const [budgetError, setBudgetError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');

  const totalAmount = items.reduce((sum, item) => {
    const total = item.type === 'Producto'
      ? (item.quantity || 0) * (item.price || 0)
      : (item.estimatedHours || 0) * (item.hourlyRate || 0);
    return sum + total;
  }, 0);

  const handleSubmit = () => {
    let isValid = true;

    // Reset errors
    setBudgetError('');
    setDeadlineError('');

    if (!budget) {
      setBudgetError('Por favor, ingrese un presupuesto.');
      isValid = false;
    } else if (parseFloat(String(budget)) < totalAmount) {
      setBudgetError(`El presupuesto no puede ser menor al monto total estimado (S/ ${totalAmount.toFixed(2)}).`);
      isValid = false;
    }

    if (!deadline) {
      setDeadlineError('Por favor, seleccione una fecha límite.');
      isValid = false;
    }

    if (isValid) {
      alert('¡Licitación creada con éxito!');
      navigate('/licitacioneslist');
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>Crear Licitación</h1>
        <p>Complete el formulario especializado para iniciar el proceso de licitación formal.</p>
      </header>

      <div className="main-page-content">

        <div className="card">
          <div className="card-header"><h2>Información General</h2><p>Datos precargados para esta licitación de ejemplo.</p></div>
          <div className="card-body">
            <div className="readonly-info"><label>Título</label><p>{title}</p></div>
            <div className="readonly-info"><label>Notas</label><p>{notes}</p></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h2>Ítems Solicitados</h2><p>Datos precargados para esta licitación de ejemplo.</p></div>
          <div className="card-body">
            {items.map((item) => <ReadOnlyItem key={item.id} item={item} />)}
          </div>
        </div>

        <DetallesLicitacion
          budget={budget}
          onBudgetChange={setBudget}
          deadline={deadline}
          onDeadlineChange={setDeadline}
          totalAmount={totalAmount}
          budgetError={budgetError}
          deadlineError={deadlineError}
        />
        <DocumentacionRequerida selectedDocs={selectedDocs} onSelectedDocsChange={setSelectedDocs} />

        <Resumen
          totalAmount={totalAmount}
          onSubmit={handleSubmit}
          title={title}
          items={items}
          subtitle="Revisar el monto máximo, la fecha límite y los documentos requetidos"
          buttonText="Crear licitación"
        />
      </div>
    </>
  );
};

export default RequestLicitacionTemplate;
