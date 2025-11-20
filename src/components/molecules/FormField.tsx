import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Select from '../atoms/Select';
import ErrorMessage from '../atoms/ErrorMessage';
import './FormField.css';

type FormFieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FormFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    htmlFor?: string;
    children: React.ReactElement<any>;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    required = false,
    error,
    htmlFor,
    children
}) => {
    // Clone the child element and add error prop if it exists
    const childWithError = React.cloneElement(children, {
        error: !!error,
        ...children.props
    });

    return (
        <div className="form-field">
            <Label htmlFor={htmlFor} required={required}>
                {label}
            </Label>
            {childWithError}
            <ErrorMessage>{error}</ErrorMessage>
        </div>
    );
};

export default FormField;
