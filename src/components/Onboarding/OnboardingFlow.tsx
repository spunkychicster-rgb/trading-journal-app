import { useState } from 'react'
import { useOnboarding } from '../../hooks/useOnboarding'
import ExperienceStep from './ExperienceStep'
import BrokerStep from './BrokerStep'
import MarketStep from './MarketStep'
import PurposeStep from './PurposeStep'

type OnboardingStep = 'experience' | 'broker' | 'market' | 'purpose'

const steps: OnboardingStep[] = ['experience', 'broker', 'market', 'purpose']

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('experience')
  const {
    profile,
    updateExperience,
    updateBrokers,
    updateMarkets,
    updatePurpose,
    completeOnboarding,
  } = useOnboarding()

  const stepIndex = steps.indexOf(currentStep)
  const progress = ((stepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1])
    } else {
      completeOnboarding()
    }
  }

  const handlePrev = () => {
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1])
    }
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 'experience':
        return !!profile.experience
      case 'broker':
        return profile.brokers.length > 0
      case 'market':
        return profile.markets.length > 0
      case 'purpose':
        return !!profile.purpose
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Trading Journal</h1>
          <p className="text-gray-600">Let's get you started with your trading journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Step {stepIndex + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <div className="card mb-8">
          {currentStep === 'experience' && (
            <ExperienceStep
              value={profile.experience}
              onChange={updateExperience}
            />
          )}
          {currentStep === 'broker' && (
            <BrokerStep value={profile.brokers} onChange={updateBrokers} />
          )}
          {currentStep === 'market' && (
            <MarketStep value={profile.markets} onChange={updateMarkets} />
          )}
          {currentStep === 'purpose' && (
            <PurposeStep value={profile.purpose} onChange={updatePurpose} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className={`btn-secondary disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {stepIndex === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
