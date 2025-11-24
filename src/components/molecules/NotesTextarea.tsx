import React from 'react';
import Label from '../atoms/Label';
import Textarea from '../atoms/Textarea';
import './NotesTextarea.css';

interface NotesTextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const NotesTextarea: React.FC<NotesTextareaProps> = ({
    value,
    onChange,
    placeholder = 'Ingrese observaciones o notas adicionales...',
    disabled = false
}) => {
    return (
        <div className="notes-textarea">
            <Label>Notas y Observaciones</Label>
            <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                rows={4}
            />
        </div>
    );
};

export default NotesTextarea;
