import { createContext, useEffect, useState } from 'react'

export const PokemonContext = createContext({ pokemons: [] })

export const usePokemonContext = () => {
  const [pokemons, setPokemons] = useState([])
  const getPokemonList = async () => {
    const pokemonList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
      .then((res) => res.json())
      .then((res) => res.results || [])
      .catch((e) => {
        console.log('error: ', e)
      })
    await Promise.all(pokemonList.map((pl) => fetch(pl.url)))
      .then(async (res) => {
        const res0 = await res[0].json()
        const res1 = await res[1].json()
        const res2 = await res[2].json()
        const res3 = await res[3].json()
        const res4 = await res[4].json()
        const [pokemon0, pokemon1, pokemon2, pokemon3, pokemon4] = pokemonList
        pokemon0.data = res0
        pokemon1.data = res1
        pokemon2.data = res2
        pokemon3.data = res3
        pokemon4.data = res4
      })
      .catch((e) => console.log(e))
    setPokemons(pokemonList)
  }
  useEffect(() => {
    getPokemonList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    pokemons,
  }
}
