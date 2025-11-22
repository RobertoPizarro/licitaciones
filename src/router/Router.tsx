
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LicitacionesListPage from '../pages/LicitacionesListPage';
import LicitacionPage from '../pages/LicitacionPage';
import LicitacionDetailPage from '../pages/LicitacionDetailPage';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/licitacioneslist" element={<LicitacionesListPage />} />
      <Route path="/licitacion" element={<LicitacionPage />} />
      <Route path="/licitacion/detail" element={<LicitacionDetailPage />} />
    </Routes>
  );
};

export default Router;
