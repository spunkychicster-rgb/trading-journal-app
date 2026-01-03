interface BrokerStepProps {
  value: string[]
  onChange: (value: string[]) => void
}

const brokers = [
  'Interactive Brokers',
  'Charles Schwab',
  'Fidelity',
  'E*TRADE',
  'TD Ameritrade',
  'Webull',
  'Robinhood',
  'Polygon',
  'Binance',
  'Kraken',
  'Coinbase',
  'Other',
]

export default function BrokerStep({ value, onChange }: BrokerStepProps) {
  const toggleBroker = (broker: string) => {
    if (value.includes(broker)) {
      onChange(value.filter((b) => b !== broker))
    } else {
      onChange([...value, broker])
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Which brokers do you use?</h2>
      <p className="text-gray-600">Select all that apply</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {brokers.map((broker) => (
          <button
            key={broker}
            onClick={() => toggleBroker(broker)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              value.includes(broker)
                ? 'border-accent bg-green-50'
                : 'border-gray-200 hover:border-accent'
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(broker)}
              onChange={() => toggleBroker(broker)}
              className="mr-3 w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-800 font-medium">{broker}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
