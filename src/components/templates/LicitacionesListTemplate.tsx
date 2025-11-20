
import { useState, useMemo } from 'react';
import LicitacionesTable from '../organisms/LicitacionesTable';
import FilterBar from '../molecules/FilterBar';
import Pagination from '../molecules/Pagination';
import { allLicitaciones } from '../../lib/mock-data';
import { Licitacion } from '../../lib/types';

const LicitacionesListTemplate = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const filteredLicitaciones = useMemo(() => {
        let licitaciones: Licitacion[] = [...allLicitaciones];
        if (searchQuery) {
            licitaciones = licitaciones.filter(lic =>
                lic.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lic.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (status) {
            licitaciones = licitaciones.filter(lic => lic.estado === status);
        }
        if (startDate) {
            licitaciones = licitaciones.filter(lic => new Date(lic.fechaCreacion) >= new Date(startDate));
        }
        if (endDate) {
            licitaciones = licitaciones.filter(lic => new Date(lic.fechaCreacion) <= new Date(endDate));
        }
        return licitaciones;
    }, [searchQuery, status, startDate, endDate]);

    const handleApplyFilters = () => {
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatus('');
        setStartDate('');
        setEndDate('');
        setCurrentPage(1);
    };

    const paginatedLicitaciones = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredLicitaciones.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredLicitaciones, currentPage]);

    return (
        <>
            <header className="page-header">
                <div className="header-content">
                    <h1>Gestión de Licitaciones</h1>
                    <p>Consulte el estado y avance de todos los procesos de licitación.</p>
                </div>
            </header>
            <div className="main-page-content">
                <FilterBar
                    searchQuery={searchQuery} onSearchQueryChange={setSearchQuery}
                    status={status} onStatusChange={setStatus}
                    startDate={startDate} onStartDateChange={setStartDate}
                    endDate={endDate} onEndDateChange={setEndDate}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />
                <LicitacionesTable licitaciones={paginatedLicitaciones} />
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredLicitaciones.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default LicitacionesListTemplate;
