import './App.css'
import PokemonList from './components/pokemon-list'
import { PokemonContext, usePokemonContext } from './hooks/useAppWithContext'

const App = () => {
  const pokemonContext = usePokemonContext()
  return (
    <PokemonContext.Provider value={pokemonContext}>
      <div className='p-6'>
        <h2 className='font-bold'>Pokemon List</h2>
        <PokemonList />
      </div>
    </PokemonContext.Provider>
  )
}

export default App
