import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import TradeList from './features/trades/TradeList';
import TradeForm from './features/trades/TradeForm';
import TradeEdit from './features/trades/TradeEdit';

export default function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/trades" replace />} />
        <Route path="/trades" element={<TradeList />} />
        <Route path="/trades/new" element={<TradeForm />} />
        <Route path="/trades/:id/edit" element={<TradeEdit />} />
      </Routes>
    </div>
  );
}