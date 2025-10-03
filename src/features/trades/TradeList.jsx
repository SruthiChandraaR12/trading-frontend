import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrades, deleteTrade } from './tradesSlice';
import { Link } from 'react-router-dom';
import './TradeList.css';

export default function TradeList(){
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.trades);

  useEffect(() => { if (status === 'idle') dispatch(fetchTrades()); }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Trades</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Symbol</th><th>Type</th><th>Qty</th><th>Price</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map(trade => (
            <tr key={trade._id}>
              <td>{trade.symbol}</td>
              <td>{trade.type}</td>
              <td>{trade.quantity}</td>
              <td>{trade.price}</td>
              <td>{new Date(trade.date).toLocaleString()}</td>
              <td>
                <Link to={`/trades/${trade._id}/edit`}>Edit</Link>
                {' | '}
                <button onClick={() => dispatch(deleteTrade(trade._id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}