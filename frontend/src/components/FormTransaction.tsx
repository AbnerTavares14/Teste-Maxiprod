import { JSX, useState, useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionContext'

export default function FormTransaction(): JSX.Element {
  const [formData, setFormData] = useState({
    person_id: 0,
    description: '',
    amount: 0,
    type: 'receita',
  })
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('Falha no contexto')
  }
  const { setTransactions, transactions } = context

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setFormData({
        person_id: 0,
        description: '',
        amount: 0,
        type: 'receita',
      })
      const data = await response.json()
      setTransactions([...transactions, data])
    } else {
      setFormData({
        person_id: 0,
        description: '',
        amount: 0,
        type: 'receita',
      })
      const error = await response.json()
      alert(error.message)
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-15">
        <h2 className="text-2xl font-bold mb-4">Nova Transação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">ID da Pessoa</label>
            <input
              type="number"
              name="person_id"
              value={formData.person_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Descrição</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Valor</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="receita">receita</option>
              <option value="despesa">despesa</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Salvar Transação
          </button>
        </form>
      </div>
    </>
  )
}
