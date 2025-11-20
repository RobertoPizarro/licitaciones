import React from 'react';
import Router from './router/Router';
import Sidebar from './components/organisms/Sidebar';

const App: React.FC = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content-area">
        <div className="page-container">
          <Router />
        </div>
      </main>
    </div>
  );
};

export default App;
