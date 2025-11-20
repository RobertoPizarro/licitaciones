
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import './DocumentSelector.css';
import { DocumentSelectorProps } from '../../lib/types';

const DocumentSelector: React.FC<DocumentSelectorProps> = ({ 
    icon, 
    title, 
    description,
    options,
    selected,
    onChange,
    requiredIds = []
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleOptionClick = (optionId: string) => {
        if (requiredIds.includes(optionId)) return; 

        const newSelected = selected.includes(optionId)
            ? selected.filter(id => id !== optionId)
            : [...selected, optionId];
        onChange(newSelected);
    };

    const handleSelectAll = () => {
        if (selected.length === options.length) {
            onChange(requiredIds);
        } else {
            onChange(options.map(opt => opt.id));
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getOptionName = (id: string) => options.find(opt => opt.id === id)?.name || id;

    return (
        <div className="document-selector-container" ref={dropdownRef}>
            <div className="selector-header">
                <div className="selector-icon">{icon}</div>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>

            <div className="custom-select-wrapper">
                <div className={`custom-select ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
                    <div className="custom-select-trigger">
                        <span>Seleccionar documento...</span>
                        <ChevronDown size={20} className={`chevron ${isOpen ? 'open' : ''}`}/>
                    </div>
                </div>
                {isOpen && (
                    <div className="custom-options">
                        <div className="option-item select-all-item">
                            <input 
                                type="checkbox" 
                                id={`select-all-${title}`}
                                checked={selected.length === options.length}
                                onChange={handleSelectAll}
                            />
                            <label htmlFor={`select-all-${title}`}>Seleccionar Todos</label>
                        </div>
                        {options.map(option => (
                            <div key={option.id} className="option-item">
                                <input 
                                    type="checkbox" 
                                    id={option.id}
                                    checked={selected.includes(option.id)}
                                    onChange={() => handleOptionClick(option.id)}
                                    disabled={requiredIds.includes(option.id)}
                                />
                                <label htmlFor={option.id}>{option.name}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="selected-pills-container">
                {selected.length > 0 ? selected.map(id => (
                    <div key={id} className={`pill ${requiredIds.includes(id) ? 'required' : ''}`}>
                        <span>{getOptionName(id)}</span>
                        {!requiredIds.includes(id) && (
                            <X size={14} className="remove-pill" onClick={() => handleOptionClick(id)} />
                        )}
                    </div>
                )) : (
                    <p className="no-docs-message">No se han seleccionado documentos</p>
                )}
            </div>
        </div>
    );
};

export default DocumentSelector;
