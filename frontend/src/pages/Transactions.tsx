import { JSX } from 'react'
import FormTransaction from '../components/FormTransaction'
import Header from '../components/Header'
import TransactionTable from '../components/TransactionTable'

export default function Transactions(): JSX.Element {
  return (
    <>
      <Header />
      <FormTransaction />
      <TransactionTable />
    </>
  )
}
