import { useState, ReactNode } from 'react'
import {
  TransactionContext,
  TransactionContextType,
} from './TransactionContext'

interface TransactionProviderProps {
  children: ReactNode
}

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<
    TransactionContextType['transactions']
  >([])

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  )
}
