import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Item } from '../../lib/types';
import DetallesSolicitudForm from '../organisms/DetallesSolicitudForm';
import ProductosYServicios from '../organisms/ProductosYServicios';
import ResumenCard from '../organisms/ResumenCard';
import { LICITACION_THRESHOLD } from '../../lib/constants';

const SolicitudCompraTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [titleError, setTitleError] = useState('');

  const totalAmount = items.reduce((sum, item) => {
    const total = item.type === 'Producto'
      ? (item.quantity || 0) * (item.price || 0)
      : (item.estimatedHours || 0) * (item.hourlyRate || 0);
    return sum + total;
  }, 0);

  const handleSubmit = () => {
    // Validación del título
    if (!title.trim()) {
      setTitleError('Por favor, ingrese un título para la solicitud.');
      return;
    }

    setTitleError('');

    const isLicitacion = totalAmount > LICITACION_THRESHOLD;

    if (isLicitacion) {
      navigate(`/licitacion`);
    } else {
      alert('Creando solicitud de compra simple...');
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>Solicitud de Compra o Servicio</h1>
        <p>Complete los detalles de su solicitud. Puede agregar múltiples productos o servicios.</p>
      </header>

      <div className="main-page-content">
        <DetallesSolicitudForm
          title={title}
          onTitleChange={setTitle}
          notes={notes}
          onNotesChange={setNotes}
          titleError={titleError}
        />

        <ProductosYServicios
          items={items}
          onItemsChange={setItems}
        />

        <ResumenCard
          totalAmount={totalAmount}
          onSubmit={handleSubmit}
          title={title}
          items={items}
        />
      </div>
    </>
  );
};

export default SolicitudCompraTemplate;
