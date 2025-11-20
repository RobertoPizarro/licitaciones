import React from 'react';
import Pill from '../atoms/Pill';
import EmptyState from './EmptyState';
import './PillList.css';

interface PillListProps {
    selectedIds: string[];
    options: Array<{ id: string; name: string }>;
    onRemove: (id: string) => void;
    requiredIds?: string[];
    emptyMessage?: string;
}

const PillList: React.FC<PillListProps> = ({
    selectedIds,
    options,
    onRemove,
    requiredIds = [],
    emptyMessage = 'No se han seleccionado documentos'
}) => {
    const getOptionName = (id: string) => options.find(opt => opt.id === id)?.name || id;

    if (selectedIds.length === 0) {
        return <EmptyState message={emptyMessage} />;
    }

    return (
        <div className="selected-pills-container">
            {selectedIds.map(id => {
                const isRequired = requiredIds.includes(id);
                return (
                    <Pill
                        key={id}
                        variant={isRequired ? 'secondary' : 'primary'}
                        onRemove={isRequired ? undefined : () => onRemove(id)}
                        className={isRequired ? 'pill-required' : ''}
                    >
                        {getOptionName(id)}
                    </Pill>
                );
            })}
        </div>
    );
};

export default PillList;
