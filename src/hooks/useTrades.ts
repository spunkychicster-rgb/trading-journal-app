import { useLocalStorage } from './useLocalStorage'
import { Trade, DashboardStats } from '../types'
import { v4 as uuidv4 } from 'uuid'

export function useTrades() {
  const [trades, setTrades] = useLocalStorage<Trade[]>('trades', [])

  const addTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: uuidv4(),
    }
    setTrades([...trades, newTrade])
    return newTrade
  }

  const updateTrade = (id: string, updates: Partial<Trade>) => {
    setTrades(
      trades.map((trade) => (trade.id === id ? { ...trade, ...updates } : trade))
    )
  }

  const deleteTrade = (id: string) => {
    setTrades(trades.filter((trade) => trade.id !== id))
  }

  const closeTrade = (id: string, exitPrice: number, exitDate: string) => {
    const trade = trades.find((t) => t.id === id)
    if (!trade) return

    const profitLoss =
      trade.direction === 'long'
        ? (exitPrice - trade.entryPrice) * trade.quantity
        : (trade.entryPrice - exitPrice) * trade.quantity

    const returnPercentage = (profitLoss / (trade.entryPrice * trade.quantity)) * 100

    updateTrade(id, {
      status: 'closed',
      exitPrice,
      exitDate,
      profitLoss,
      returnPercentage,
    })
  }

  const calculateStats = (): DashboardStats => {
    const closedTrades = trades.filter((t) => t.status === 'closed')
    const winningTrades = closedTrades.filter((t) => (t.profitLoss || 0) > 0)
    const losingTrades = closedTrades.filter((t) => (t.profitLoss || 0) < 0)

    const totalProfitLoss = trades.reduce((sum, t) => sum + (t.profitLoss || 0), 0)
    const avgWin = winningTrades.length > 0
      ? winningTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) / winningTrades.length
      : 0
    const avgLoss = losingTrades.length > 0
      ? Math.abs(losingTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0) / losingTrades.length)
      : 0
    const profitFactor = avgLoss > 0 ? (avgWin * winningTrades.length) / (avgLoss * losingTrades.length) : 0

    let consecutiveWins = 0
    let consecutiveLosses = 0
    let currentWins = 0
    let currentLosses = 0

    closedTrades.forEach((trade) => {
      if ((trade.profitLoss || 0) > 0) {
        currentWins++
        currentLosses = 0
        consecutiveWins = Math.max(consecutiveWins, currentWins)
      } else {
        currentLosses++
        currentWins = 0
        consecutiveLosses = Math.max(consecutiveLosses, currentLosses)
      }
    })

    return {
      totalTrades: trades.length,
      winRate: closedTrades.length > 0
        ? (winningTrades.length / closedTrades.length) * 100
        : 0,
      totalProfitLoss,
      averageWin: avgWin,
      averageLoss: avgLoss,
      profitFactor,
      consecutiveWins,
      consecutiveLosses,
    }
  }

  return {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    closeTrade,
    calculateStats,
  }
}
