import React from 'react';
import './TimelineItem.css';
import { Check } from 'lucide-react';

interface TimelineItemProps {
    stepNumber: number;
    title: string;
    description?: string;
    status: 'active' | 'completed' | 'pending';
    isLast?: boolean;
    children?: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
    stepNumber,
    title,
    description,
    status,
    isLast = false,
    children
}) => {
    return (
        <div className={`timeline-item ${status}`}>
            <div className="timeline-marker-container">
                <div className={`timeline-marker ${status}`}>
                    {status === 'completed' ? <Check size={14} /> : stepNumber}
                </div>
                {!isLast && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
                <div className="timeline-header">
                    <h4 className="timeline-title">{title}</h4>
                    {status === 'active' && <span className="status-badge">Estado actual</span>}
                </div>
                {description && <p className="timeline-description">{description}</p>}
                {children && <div className="timeline-actions">{children}</div>}
            </div>
        </div>
    );
};

export default TimelineItem;
