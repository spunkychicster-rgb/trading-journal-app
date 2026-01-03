import { useTrades } from '../../hooks/useTrades'
import { useMemo } from 'react'

export default function VisualCalendar() {
  const { trades } = useTrades()
  const [year, month] = useMemo(() => {
    const now = new Date()
    return [now.getFullYear(), now.getMonth()]
  }, [])

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const tradesByDate = useMemo(() => {
    const map = new Map<string, { wins: number; losses: number }>()
    trades.forEach((trade) => {
      const dateStr = trade.entryDate
      if (!map.has(dateStr)) {
        map.set(dateStr, { wins: 0, losses: 0 })
      }
      const data = map.get(dateStr)!
      if (trade.status === 'closed' && trade.profitLoss) {
        if (trade.profitLoss > 0) {
          data.wins++
        } else {
          data.losses++
        }
      }
    })
    return map
  }, [trades])

  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' })

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {monthName} {year}
      </h2>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold text-gray-600 p-2">
            {day}
          </div>
        ))}

        {Array(startingDayOfWeek)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}

        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const day = i + 1
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const tradeData = tradesByDate.get(dateStr)
            const hasWin = tradeData && tradeData.wins > 0
            const hasLoss = tradeData && tradeData.losses > 0

            let bgColor = 'bg-gray-50'
            if (hasWin && !hasLoss) bgColor = 'bg-green-200'
            else if (hasLoss && !hasWin) bgColor = 'bg-red-200'
            else if (hasWin && hasLoss) bgColor = 'bg-yellow-200'

            return (
              <div
                key={`day-${day}`}
                className={`p-3 rounded-lg text-center ${bgColor} border border-gray-200 h-16 flex flex-col items-center justify-center`}
              >
                <span className="font-bold text-gray-800 text-lg">{day}</span>
                {tradeData && (
                  <span className="text-xs text-gray-600 mt-1">
                    {tradeData.wins > 0 && <span className="text-green-600">W{tradeData.wins}</span>}
                    {tradeData.losses > 0 && <span className="text-red-600 ml-1">L{tradeData.losses}</span>}
                  </span>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
