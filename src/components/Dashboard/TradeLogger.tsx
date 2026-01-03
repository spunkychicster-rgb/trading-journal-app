import { useState } from 'react'
import { useTrades } from '../../hooks/useTrades'
import { Trade } from '../../types'

export default function TradeLogger() {
  const { addTrade, trades } = useTrades()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    symbol: '',
    entryPrice: '',
    quantity: '',
    direction: 'long' as const,
    broker: '',
    market: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.symbol &&
      formData.entryPrice &&
      formData.quantity &&
      formData.broker &&
      formData.market
    ) {
      addTrade({
        symbol: formData.symbol,
        entryPrice: parseFloat(formData.entryPrice),
        exitPrice: null,
        quantity: parseFloat(formData.quantity),
        entryDate: new Date().toISOString().split('T')[0],
        exitDate: null,
        direction: formData.direction,
        status: 'open',
        notes: formData.notes,
        profitLoss: null,
        returnPercentage: null,
        broker: formData.broker,
        market: formData.market,
      })
      setFormData({
        symbol: '',
        entryPrice: '',
        quantity: '',
        direction: 'long',
        broker: '',
        market: '',
        notes: '',
      })
      setShowForm(false)
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Trade Logger</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Log Trade'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Symbol"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Entry Price"
              step="0.01"
              value={formData.entryPrice}
              onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              step="0.01"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="input-field"
              required
            />
            <select
              value={formData.direction}
              onChange={(e) =>
                setFormData({ ...formData, direction: e.target.value as 'long' | 'short' })
              }
              className="input-field"
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
            <input
              type="text"
              placeholder="Broker"
              value={formData.broker}
              onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Market"
              value={formData.market}
              onChange={(e) => setFormData({ ...formData, market: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <textarea
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="input-field mb-4"
            rows={3}
          />
          <button type="submit" className="btn-primary w-full">
            Log Trade
          </button>
        </form>
      )}

      {/* Trades List */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-bold text-gray-700">Symbol</th>
              <th className="text-left py-3 px-4 font-bold text-gray-700">Entry</th>
              <th className="text-left py-3 px-4 font-bold text-gray-700">Qty</th>
              <th className="text-left py-3 px-4 font-bold text-gray-700">Direction</th>
              <th className="text-left py-3 px-4 font-bold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-bold text-gray-700">P/L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{trade.symbol}</td>
                <td className="py-3 px-4 text-gray-600">${trade.entryPrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-gray-600">{trade.quantity}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-bold ${
                      trade.direction === 'long' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                  >
                    {trade.direction.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-bold ${
                      trade.status === 'open' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                  >
                    {trade.status.toUpperCase()}
                  </span>
                </td>
                <td
                  className={`py-3 px-4 font-bold ${
                    (trade.profitLoss || 0) > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trade.profitLoss ? `$${trade.profitLoss.toFixed(2)}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
