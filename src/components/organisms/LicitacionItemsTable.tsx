import React from 'react';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import CardBody from '../atoms/CardBody';
import './LicitacionItemsTable.css';

const LicitacionItemsTable: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <h2>Ítems</h2>
            </CardHeader>
            <CardBody className="items-table-body">
                <table className="items-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Descripción</th>
                            <th className="text-center">Cantidad / Horas</th>
                            <th className="text-right">Precio Uni. / Tarifa</th>
                            <th className="text-right">Total Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="item-type-badge">Producto</span></td>
                            <td>Laptops hp G10</td>
                            <td className="text-center">15</td>
                            <td className="text-right">S/. 2,600.00</td>
                            <td className="text-right">S/. 39,000.00</td>
                        </tr>
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default LicitacionItemsTable;
