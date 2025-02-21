import { JSX, useEffect, useContext, useState } from 'react'
import Header from '../components/Header'
import FormPeople from '../components/FormPeople'
import { PersonContext } from '../contexts/PersonContext'

interface People {
  id: number
  name: string
  age: number
}

export default function People(): JSX.Element {
  const context = useContext(PersonContext)
  if (!context) {
    throw new Error('Contexto não carregado')
  }
  const { people, setPeople } = context

  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const peoplePaginated = people.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then((response) => response.json())
      .then((data) => setPeople(data))
  }, [setPeople])

  async function deletePerson(id: number) {
    try {
      await fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE',
      })
      setPeople(people.filter((person) => person.id !== id))
    } catch (error) {
      console.error('Erro ao deletar pessoa:', error)
    }
  }

  return (
    <>
      <Header />
      <main>
        <FormPeople />
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-bold mt-15 mb-6">Lista de Pessoas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Nome
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Idade
                  </th>
                </tr>
              </thead>
              <tbody>
                {people.length > 0 ? (
                  peoplePaginated.map((person) => (
                    <tr
                      key={person.id}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center ">
                        {person.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center ">
                        {person.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center ">
                        {person.age}
                      </td>
                      <td className="border border-gray-300 px-0.5 w-10 py-1 text-center ">
                        <button
                          onClick={() => deletePerson(person.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      Nenhuma pessoa cadastrada
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
                disabled={page * itemsPerPage >= people.length}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition cursor-pointer"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
