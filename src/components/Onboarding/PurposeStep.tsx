interface PurposeStepProps {
  value: string
  onChange: (value: string) => void
}

const purposes = [
  { id: 'income', label: 'Generate Income', description: 'Primary income source' },
  { id: 'growth', label: 'Wealth Growth', description: 'Long-term wealth building' },
  { id: 'learning', label: 'Learning', description: 'Develop trading skills' },
  { id: 'passive', label: 'Passive Income', description: 'Supplement main income' },
]

export default function PurposeStep({ value, onChange }: PurposeStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">What's your trading purpose?</h2>
      <p className="text-gray-600">Help us understand your goals</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {purposes.map((purpose) => (
          <button
            key={purpose.id}
            onClick={() => onChange(purpose.id)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              value === purpose.id
                ? 'border-accent bg-green-50'
                : 'border-gray-200 hover:border-accent'
            }`}
          >
            <h3 className="font-bold text-lg text-gray-800">{purpose.label}</h3>
            <p className="text-gray-600 text-sm mt-2">{purpose.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
