import React from 'react';
import { Link } from 'react-router-dom';
export default function NavBar(){
  return (
    <nav style={{ display:'flex', gap:12, padding:12 }}>
      <Link to="/trades">Trades</Link>
      <Link to="/trades/new">New Trade</Link>
    </nav>
  );
}