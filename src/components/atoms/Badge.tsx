import React from 'react';
import './Badge.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'info' | 'success' | 'warning' | 'danger';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'info' }) => {
    return (
        <span className={`badge badge-${variant}`}>
            {children}
        </span>
    );
};

export default Badge;
