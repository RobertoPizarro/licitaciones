import React from 'react';
import './PageHeader.css';

interface PageHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, className }) => {
    const headerClassName = `page-header ${className || ''}`.trim();

    return (
        <header className={headerClassName}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </header>
    );
};

export default PageHeader;
