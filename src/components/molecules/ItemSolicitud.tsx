import React from 'react';
import { Trash2 } from 'lucide-react';
import { Item } from '../../lib/types';
import Button from '../atoms/Button';
import { ItemSolicitudProps } from '../../lib/types';

const ItemSolicitud: React.FC<ItemSolicitudProps> = ({ item, onItemChange, onRemove }) => {

  const handleFieldChange = (field: keyof Item, value: any) => {
    const numericFields = ['quantity', 'price', 'estimatedHours', 'hourlyRate'];
    let processedValue = value;

    if (numericFields.includes(field)) {
        processedValue = parseFloat(value) || 0;
    }

    const updatedItem = { ...item, [field]: processedValue };

    if (field === 'type') {
      if (value === 'Producto') {
        updatedItem.estimatedHours = 0;
        updatedItem.hourlyRate = 0;
      } else {
        updatedItem.quantity = 1;
        updatedItem.price = 0;
      }
    }

    onItemChange(updatedItem);
  };

  const total = item.type === 'Producto' 
    ? (item.quantity || 0) * (item.price || 0) 
    : (item.estimatedHours || 0) * (item.hourlyRate || 0);

  return (
    <div className="solicitud-item-card">
      <div className="solicitud-item-grid">
        <div className="solicitud-col-span-2">
          <label>Tipo</label>
          <select value={item.type} onChange={(e) => handleFieldChange('type', e.target.value as Item['type'])}>
            <option value="Producto">Producto</option>
            <option value="Servicio">Servicio</option>
          </select>
        </div>
        <div className="solicitud-col-span-4">
          <label>Descripción</label>
          <input 
            type="text" 
            placeholder="Ej. Laptop, servicio de mantenimiento"
            value={item.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
        </div>

        {item.type === 'Producto' ? (
          <>
            <div className="solicitud-col-span-2">
              <label>Cantidad</label>
              <input 
                type="text"
                inputMode="decimal"
                value={item.quantity}
                onChange={(e) => handleFieldChange('quantity', e.target.value)}
              />
            </div>
            <div className="solicitud-col-span-2">
              <label>Precio Unitario</label>
              <input 
                type="text"
                inputMode="decimal"
                value={item.price}
                onChange={(e) => handleFieldChange('price', e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="solicitud-col-span-2">
              <label>Horas Estimadas</label>
              <input 
                type="text"
                inputMode="decimal"
                value={item.estimatedHours}
                onChange={(e) => handleFieldChange('estimatedHours', e.target.value)}
              />
            </div>
            <div className="solicitud-col-span-2">
              <label>Tarifa / Hora</label>
              <input 
                type="text"
                inputMode="decimal"
                value={item.hourlyRate}
                onChange={(e) => handleFieldChange('hourlyRate', e.target.value)}
              />
            </div>
          </>
        )}

        <div className="solicitud-total-column">
          <label>Total</label>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        <div className="solicitud-remove-column">
          <Button variant="danger" onClick={onRemove}>
            <Trash2 size={20} />
          </Button>
        </div>

      </div>
    </div>
  )
}

export default ItemSolicitud;
