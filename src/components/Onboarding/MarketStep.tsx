interface MarketStepProps {
  value: string[]
  onChange: (value: string[]) => void
}

const markets = [
  'Stocks',
  'Options',
  'Forex',
  'Crypto',
  'Futures',
  'Commodities',
  'Bonds',
  'ETFs',
]

export default function MarketStep({ value, onChange }: MarketStepProps) {
  const toggleMarket = (market: string) => {
    if (value.includes(market)) {
      onChange(value.filter((m) => m !== market))
    } else {
      onChange([...value, market])
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">What markets do you trade?</h2>
      <p className="text-gray-600">Select all that apply</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {markets.map((market) => (
          <button
            key={market}
            onClick={() => toggleMarket(market)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              value.includes(market)
                ? 'border-accent bg-green-50'
                : 'border-gray-200 hover:border-accent'
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(market)}
              onChange={() => toggleMarket(market)}
              className="mr-3 w-4 h-4 cursor-pointer"
            />
            <span className="text-gray-800 font-medium">{market}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
