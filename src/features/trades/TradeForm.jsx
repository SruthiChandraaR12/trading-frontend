import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTrade } from './tradesSlice';
import { useNavigate } from 'react-router-dom';

export default function TradeForm(){
  const [form, setForm] = useState({ symbol:'', type:'BUY', quantity:0, price:0, notes:'' });
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(createTrade(form));
    nav('/trades');
  };

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:400 }}>
      <h3>New Trade</h3>
      <input placeholder="Symbol" value={form.symbol} onChange={e=>setForm({...form, symbol:e.target.value})} required />
      <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
        <option>BUY</option>
        <option>SELL</option>
      </select>
      <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:+e.target.value})} required />
      <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:+e.target.value})} required />
      <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}></textarea>
      <button type="submit">Create</button>
    </form>
  );
}