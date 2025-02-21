import { useState, ReactNode } from 'react'
import { PersonContext, PersonContextType } from './PersonContext'

interface personProviderProps {
  children: ReactNode
}

export function PersonProvider({ children }: personProviderProps) {
  const [people, setPeople] = useState<PersonContextType['people']>([])

  return (
    <PersonContext.Provider value={{ people, setPeople }}>
      {children}
    </PersonContext.Provider>
  )
}
