import { JSX, useState, useContext } from 'react'
import { PersonContext } from '../contexts/PersonContext'

export default function FormPeople(): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
  })
  const context = useContext(PersonContext)
  if (!context) {
    throw new Error('Contexto não existe')
  }
  const { people, setPeople } = context

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formData.name, age: formData.age }),
    })

    if (response.ok) {
      setFormData({
        name: '',
        age: 0,
      })
      const data = await response.json()
      setPeople([...people, data])
    } else {
      const error = await response.json()
      alert(error.message)
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-15">
        <h2 className="text-2xl font-bold mb-4">Nova Pessoa</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Idade
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md mt-10 bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-600  cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  )
}
