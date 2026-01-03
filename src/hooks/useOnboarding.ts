import { useLocalStorage } from './useLocalStorage'
import { UserProfile } from '../types'

const defaultProfile: UserProfile = {
  experience: 'beginner',
  brokers: [],
  markets: [],
  purpose: '',
  onboardingComplete: false,
}

export function useOnboarding() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('userProfile', defaultProfile)

  const updateExperience = (experience: UserProfile['experience']) => {
    setProfile({ ...profile, experience })
  }

  const updateBrokers = (brokers: string[]) => {
    setProfile({ ...profile, brokers })
  }

  const updateMarkets = (markets: string[]) => {
    setProfile({ ...profile, markets })
  }

  const updatePurpose = (purpose: string) => {
    setProfile({ ...profile, purpose })
  }

  const completeOnboarding = () => {
    setProfile({ ...profile, onboardingComplete: true })
  }

  const isOnboardingComplete = profile.onboardingComplete

  return {
    profile,
    updateExperience,
    updateBrokers,
    updateMarkets,
    updatePurpose,
    completeOnboarding,
    isOnboardingComplete,
  }
}
