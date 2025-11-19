import React from 'react';

// ==================================================================
// TIPOS DE DATOS CENTRALES
// ==================================================================



// Átomos
// ------------------------------------------------------------------

export interface StatusPillProps {
  status: string;
}

// Moléculas
// ------------------------------------------------------------------

export interface DetallesSolicitudProps {
  title: string;
  onTitleChange: (value: string) => void; 
  notes: string;
  onNotesChange: (value: string) => void; 
  titleError?: string; // ERROR ESPECÍFICO PARA EL TÍTULO
}

export interface DocumentSelectorProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  options: Documento[];
  selected: string[];
  onChange: (selected: string[]) => void;
  requiredIds?: string[];
}

export interface FilterBarProps {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    startDate: string;
    onStartDateChange: (value: string) => void;
    endDate: string;
    onEndDateChange: (value: string) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

export interface ItemSolicitudProps {
  item: Item;
  onItemChange: (updatedItem: Item) => void;
  onRemove: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface ResumenProps {
  totalAmount: number;
  onSubmit: () => void;
  title: string;
  items: any[];
  subtitle?: string;
  buttonText?: string;
}

// Organismos
// ------------------------------------------------------------------

export interface DetallesLicitacionProps {
  budget: number | string;
  onBudgetChange: (value: number | string) => void;
  deadline: string;
  onDeadlineChange: (value: string) => void;
  totalAmount: number;
  budgetError?: string; // ERROR OPCIONAL PARA EL PRESUPUESTO
  deadlineError?: string; // ERROR OPCIONAL PARA LA FECHA
}

export interface Documento {
  id: string;
  name: string;
}

export interface LicitacionesTableProps {
    licitaciones: Licitacion[];
}

export interface ProductosYServiciosProps {
  items: Item[];
  onItemsChange: (items: Item[]) => void;
  error?: string;
}

// templates
// ------------------------------------------------------------------

export interface Item {
  id: string;
  type: 'Producto' | 'Servicio';
  description: string;
  quantity?: number;
  price?: number;
  estimatedHours?: number;
  hourlyRate?: number;
}

export interface Licitacion {
  id: string;
  titulo: string;
  fechaCreacion: string;
  presupuesto: number;
  estado: string;
}
