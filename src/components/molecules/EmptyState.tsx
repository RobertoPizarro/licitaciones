import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
    message: string;
    icon?: React.ReactNode;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon, className }) => {
    const emptyClassName = `empty-state ${className || ''}`.trim();

    return (
        <div className={emptyClassName}>
            {icon && <div className="empty-state-icon">{icon}</div>}
            <p className="empty-state-message">{message}</p>
        </div>
    );
};

export default EmptyState;
