import { useContext } from 'react'
import { PokemonContext } from '../../hooks/useAppWithContext'
import PokemonCard from '../card'

const PokemonList = () => {
  const { pokemons } = useContext(PokemonContext)
  return (
    <div className='mt-4 grid grid-cols-4 gap-4'>
      {pokemons.map((pokemon) => {
        const { data, name } = pokemon
        const { id, sprites, types } = data
        return <PokemonCard key={id} imgSrc={sprites.front_default} id={id} name={name} types={types} />
      })}
    </div>
  )
}

export default PokemonList
