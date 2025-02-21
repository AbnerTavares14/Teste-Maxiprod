import { JSX } from 'react'
import { Link } from 'react-router-dom'

export default function Header(): JSX.Element {
  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="flex justify-center align-top">
          <Link
            to="/"
            className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Pessoas
          </Link>
          <Link
            to="/transactions"
            className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Transações
          </Link>
          <Link
            to="/consultations"
            className="font-bold rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Consultas
          </Link>
        </nav>
      </header>
    </>
  )
}
