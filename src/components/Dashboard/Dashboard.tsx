import { useOnboarding } from '../../hooks/useOnboarding'
import TradeLogger from './TradeLogger'
import VisualCalendar from './VisualCalendar'
import Analytics from './Analytics'

export default function Dashboard() {
  const { profile } = useOnboarding()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Trading Journal</h1>
          <p className="text-gray-600 mt-2">
            Welcome, {profile.experience} trader! Track your trades and improve your strategy.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6">
          {/* Analytics Section */}
          <Analytics />

          {/* Trade Logger and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TradeLogger />
            </div>
            <div>
              <VisualCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
