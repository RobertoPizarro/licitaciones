import React from 'react';
import { Item } from '../../lib/types';
import Label from '../atoms/Label';
import './ReadOnlyItem.css';

interface ReadOnlyItemProps {
    item: Item;
}

const ReadOnlyItem: React.FC<ReadOnlyItemProps> = ({ item }) => {
    const total = item.type === 'Producto'
        ? (item.quantity || 0) * (item.price || 0)
        : (item.estimatedHours || 0) * (item.hourlyRate || 0);

    return (
        <div className="readonly-item-card">
            <div className="readonly-item-grid">
                <div>
                    <Label>Tipo</Label>
                    <p>{item.type}</p>
                </div>
                <div>
                    <Label>Descripción</Label>
                    <p>{item.description}</p>
                </div>
                {item.type === 'Producto' ? (
                    <>
                        <div>
                            <Label>Cantidad</Label>
                            <p>{item.quantity}</p>
                        </div>
                        <div>
                            <Label>Precio Uni.</Label>
                            <p>S/ {item.price?.toFixed(2)}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <Label>Horas Estimadas</Label>
                            <p>{item.estimatedHours}</p>
                        </div>
                        <div>
                            <Label>Tarifa / Hora</Label>
                            <p>S/ {item.hourlyRate?.toFixed(2)}</p>
                        </div>
                    </>
                )}
                <div className="total-column">
                    <Label>Total Item</Label>
                    <p>S/ {total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ReadOnlyItem;
