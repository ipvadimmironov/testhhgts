
import './App.css'
import Main from './pages/main'
import { PrimeReactProvider } from 'primereact/api';


function App() {

  return (
    <PrimeReactProvider>
      <Main />
    </PrimeReactProvider>
  )
}

export default App
