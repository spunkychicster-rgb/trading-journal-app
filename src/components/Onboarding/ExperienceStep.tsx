import { UserProfile } from '../../types'

interface ExperienceStepProps {
  value: UserProfile['experience']
  onChange: (value: UserProfile['experience']) => void
}

const experiences = [
  { id: 'beginner', label: 'Beginner', description: 'Just starting my trading journey' },
  { id: 'intermediate', label: 'Intermediate', description: 'Trading for 1-3 years' },
  { id: 'advanced', label: 'Advanced', description: 'Trading for 3+ years' },
]

export default function ExperienceStep({ value, onChange }: ExperienceStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">What's your trading experience?</h2>
      <p className="text-gray-600">This helps us tailor the app to your needs</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {experiences.map((exp) => (
          <button
            key={exp.id}
            onClick={() => onChange(exp.id as UserProfile['experience'])}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              value === exp.id
                ? 'border-accent bg-green-50'
                : 'border-gray-200 hover:border-accent'
            }`}
          >
            <h3 className="font-bold text-lg text-gray-800">{exp.label}</h3>
            <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
