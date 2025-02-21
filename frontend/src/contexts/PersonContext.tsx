import { createContext } from 'react'

interface Person {
  id: number
  name: string
  age: number
}

export interface PersonContextType {
  people: Person[]
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
}

export const PersonContext = createContext<PersonContextType | undefined>(
  undefined
)
