import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrades, updateTrade } from './tradesSlice';
import { useParams, useNavigate } from 'react-router-dom';

export default function TradeEdit(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const trade = useSelector(s => s.trades.items.find(t => t._id === id));
  const [form, setForm] = useState(null);

  useEffect(() => { if (!trade) dispatch(fetchTrades()); else setForm({ ...trade }); }, [trade, dispatch]);

  if (!form) return <p>Loading...</p>;

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(updateTrade({ id, trade: form }));
    nav('/trades');
  };

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:400 }}>
      <h3>Edit Trade</h3>
      <input placeholder="Symbol" value={form.symbol} onChange={e=>setForm({...form, symbol:e.target.value})} required />
      <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
        <option>BUY</option>
        <option>SELL</option>
      </select>
      <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form, quantity:+e.target.value})} required />
      <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:+e.target.value})} required />
      <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}></textarea>
      <button type="submit">Save</button>
    </form>
  );
}