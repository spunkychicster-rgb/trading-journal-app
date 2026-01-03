import { useOnboarding } from './hooks/useOnboarding'
import OnboardingFlow from './components/Onboarding/OnboardingFlow'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const { isOnboardingComplete } = useOnboarding()

  return (
    <div className="min-h-screen bg-gray-50">
      {!isOnboardingComplete ? <OnboardingFlow /> : <Dashboard />}
    </div>
  )
}

export default App
