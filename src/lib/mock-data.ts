import type { Licitacion } from './types';

const STATUS_LIST = [
    'BORRADOR', 'NUEVA', 'EN INVITACION', 'CON PROPUESTAS', 
    'EN EVALUACION', 'ADJUDICADO', 'CON CONTRATO', 'FINALIZADA', 'CANCELADA'
];

export const allLicitaciones: Licitacion[] = Array.from({ length: 403 }, (_, i) => ({
    id: `2025${String(i + 1).padStart(3, '0')}`,
    titulo: `Equipo de Cómputo #${i + 1}`,
    fechaCreacion: new Date(2025, 0, 1 + i).toISOString().split('T')[0],
    presupuesto: 10000 + ((i * 1337) % 149000) + (i * 3.14),
    estado: STATUS_LIST[i % STATUS_LIST.length],
}));
