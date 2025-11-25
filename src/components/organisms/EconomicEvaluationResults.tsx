import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { EconomicEvaluation } from '../../lib/types';
import './EconomicEvaluationResults.css';

interface EconomicEvaluationResultsProps {
    evaluatedProviders: EconomicEvaluation[];
}

const EconomicEvaluationResults: React.FC<EconomicEvaluationResultsProps> = ({ evaluatedProviders }) => {
    if (evaluatedProviders.length === 0) {
        return null;
    }

    return (
        <div className="economic-evaluation-results">
            <h3 className="results-title">Resultados de Evaluación</h3>

            <div className="results-list">
                {evaluatedProviders.map(provider => (
                    <div
                        key={provider.providerId}
                        className={`result-item ${provider.status}`}
                    >
                        <div className="result-icon">
                            {provider.status === 'approved' ? (
                                <CheckCircle size={20} />
                            ) : (
                                <XCircle size={20} />
                            )}
                        </div>

                        <div className="result-info">
                            <div className="result-provider-name">{provider.providerName}</div>
                            <div className="result-status">
                                {provider.status === 'approved' ? (
                                    <>
                                        <span className="status-label">Aprobado</span>
                                        {provider.score !== undefined && (
                                            <span className="result-score">
                                                Puntuación: {provider.score} / 100
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <span className="status-label">RECHAZADO</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EconomicEvaluationResults;
