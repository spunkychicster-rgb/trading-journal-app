import { useTrades } from '../../hooks/useTrades'

export default function Analytics() {
  const { calculateStats } = useTrades()
  const stats = calculateStats()

  const StatCard = ({
    label,
    value,
    suffix,
    color,
  }: {
    label: string
    value: number | string
    suffix?: string
    color?: 'green' | 'red' | 'blue' | 'yellow'
  }) => {
    const colorClasses = {
      green: 'text-green-600',
      red: 'text-red-600',
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
    }

    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <p className={`text-3xl font-bold mt-2 ${color ? colorClasses[color] : 'text-gray-800'}`}>
          {typeof value === 'number' ? value.toFixed(2) : value}
          {suffix && <span className="text-sm ml-1">{suffix}</span>}
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Trades" value={stats.totalTrades} color="blue" />
        <StatCard label="Win Rate" value={stats.winRate} suffix="%" color="green" />
        <StatCard
          label="Total P/L"
          value={stats.totalProfitLoss}
          suffix="$"
          color={stats.totalProfitLoss > 0 ? 'green' : 'red'}
        />
        <StatCard label="Profit Factor" value={stats.profitFactor} color="yellow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Average Win" value={stats.averageWin} suffix="$" color="green" />
        <StatCard label="Average Loss" value={stats.averageLoss} suffix="$" color="red" />
        <StatCard label="Consecutive Wins" value={stats.consecutiveWins} color="green" />
        <StatCard label="Consecutive Losses" value={stats.consecutiveLosses} color="red" />
      </div>
    </div>
  )
}
