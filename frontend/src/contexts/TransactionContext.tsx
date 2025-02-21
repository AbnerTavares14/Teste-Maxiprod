import { createContext } from 'react'

interface Transaction {
  id: number
  person_id: number
  description: string
  amount: number
  type: string
  name: string
}

export interface TransactionContextType {
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined)
