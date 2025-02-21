import { BrowserRouter, Routes, Route } from 'react-router-dom'
import People from './pages/People'
import Transactions from './pages/Transactions'
import Consult from './pages/Consult'
import { TransactionProvider } from './contexts/TransactionProvider'
import { PersonProvider } from './contexts/PersonProvider'

function App() {
  return (
    <BrowserRouter>
      <PersonProvider>
        <TransactionProvider>
          <Routes>
            <Route path="/" element={<People />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/consultations" element={<Consult />} />
          </Routes>
        </TransactionProvider>
      </PersonProvider>
    </BrowserRouter>
  )
}

export default App
