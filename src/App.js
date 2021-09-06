import { useEffect, useState } from 'react'
import './App.css'
import Bulbasaur from './download.jpeg'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const getPokemonList = async () => {
    setLoading(true)
    const pokemonList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2')
      .then((res) => res.json())
      .then((res) => res.results || [])
      .catch((e) => {
        console.log('error: ', e)
      })
    await Promise.all(pokemonList.map((pl) => fetch(pl.url)))
      .then(async (res) => {
        const res0 = await res[0].json()
        const res1 = await res[1].json()
        const [pokemon0, pokemon1] = pokemonList
        pokemon0.data = res0
        pokemon1.data = res1
      })
      .catch((e) => console.log(e))
    setPokemons(pokemonList)
    setLoading(false)
  }
  useEffect(() => {
    getPokemonList()
  }, [])
  return (
    <div className='p-6'>
      <h2 className='font-bold'>Pokemon List</h2>
      <div className='mt-4 grid grid-cols-4 gap-4'>
        {loading && 'Loading...'}
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className='border border-gray-200 rounded-md p-4 shadow-sm text-center'>
            <div className='flex justify-center'>
              <img className='h-28 w-auto' src={pokemon.data.sprites.front_default} alt='' />
            </div>
            <p className='text-gray-400 text-sm'>#00{pokemon.data.id}</p>
            <p className='my-3'>{pokemon.name}</p>
            <div className='flex justify-center items-center'>
              {pokemon.data.types?.map((type) => (
                <p className='px-2 py-0.5 text-sm rounded bg-green-800 text-white mx-1'>{type.type.name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
