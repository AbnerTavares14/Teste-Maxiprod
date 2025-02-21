import { JSX, useState, useEffect } from 'react'
import Header from '../components/Header'

interface Consultation {
  id: number
  name: string
  income: number
  expenses: number
  balance: number
}

export default function Consult(): JSX.Element {
  const [consultations, setConsultations] = useState<Consultation[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/consultation')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setConsultations(data)
        } else {
          console.error('Erro: API retornou um formato inesperado', data)
          setConsultations([])
        }
      })
      .catch((error) => {
        alert(`Erro ao buscar consultas: ${error.message}`)
        setConsultations([])
      })
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-4x1 mx-auto p-6">
        <h2 className="text-2x1 font-bold mb-4">Consultas</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Nome
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Receita
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Despesa
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Saldo Líquido
                </th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation) => (
                <tr key={consultation.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {consultation.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {consultation.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    R${' '}
                    {consultation.income
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    R${' '}
                    {consultation.expenses
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    R${' '}
                    {consultation.balance
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
