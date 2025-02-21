import { useEffect, useContext, useState } from 'react'
import { TransactionContext } from '../contexts/TransactionContext'

export default function TransactionTable() {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error('Falha no contexto')
  }

  const { transactions, setTransactions } = context

  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const paginatedTransactions = transactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  useEffect(() => {
    fetch('http://localhost:5000/transaction')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data)
      })
      .catch((error) => {
        console.error('Erro ao buscar transações:', error)
        setTransactions([])
      })
  }, [setTransactions])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Transações</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-center">
                ID da Transação
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                ID da Pessoa
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Nome
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Descrição
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Valor
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {transaction.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {transaction.person_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {transaction.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    R$ {transaction.amount.toFixed(2)}
                  </td>
                  <td
                    className={`border text-center border-gray-300 px-4 py-2 font-semibold ${
                      transaction.type === 'receita'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'receita' ? 'Entrada' : 'Saída'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Nenhuma transação encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition cursor-pointer"
          >
            Anterior
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * itemsPerPage >= transactions.length}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition cursor-pointer"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}
