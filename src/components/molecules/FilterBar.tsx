
import React from 'react';
import './FilterBar.css';
import { Search, X } from 'lucide-react';
import Button from '../atoms/Button';
import { FilterBarProps } from '../../lib/types';
const STATUS_OPTIONS = [
    'BORRADOR',
    'NUEVA',
    'EN INVITACION',
    'CON PROPUESTAS',
    'EN EVALUACION',
    'ADJUDICADO',
    'CON CONTRATO',
    'FINALIZADA',
    'CANCELADA',
];

const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery, onSearchQueryChange,
    status, onStatusChange,
    startDate, onStartDateChange,
    endDate, onEndDateChange,
    onApplyFilters,
    onClearFilters
}) => {

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onStartDateChange(e.target.value);
    };
    
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onEndDateChange(e.target.value);
    };

    return (
        <div className="card filter-bar-card">
            <div className="filter-grid">
                <div className="filter-item search-filter">
                    <label htmlFor="search">Buscar por Título o ID</label>
                    <div className="input-with-icon">
                        <Search size={18} className="input-icon" />
                        <input
                            type="text"
                            id="search"
                            placeholder="E.g., Compra de equipo..."
                            value={searchQuery}
                            onChange={(e) => onSearchQueryChange(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="filter-item">
                    <label htmlFor="status">Estado</label>
                    <select id="status" value={status} onChange={(e) => onStatusChange(e.target.value)} className="form-input">
                        <option value="">Todos</option>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
                    </select>
                </div>

                <div className="filter-item">
                    <label htmlFor="start-date">Fecha Desde</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="form-input"
                        max={endDate || undefined}
                    />
                </div>

                <div className="filter-item">
                    <label htmlFor="end-date">Fecha Hasta</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="form-input"
                        min={startDate || undefined}
                    />
                </div>
            </div>
            <div className="filter-actions">
                <Button variant="secondary" size="sm" onClick={onClearFilters}>
                    <X size={16} />
                    <span>Limpiar Filtros</span>
                </Button>
                <Button variant="primary" size="sm" onClick={onApplyFilters}>
                    <span>Aplicar Filtros</span>
                </Button>
            </div>
        </div>
    );
};

export default FilterBar;
