const TypeLabel = ({ name }) => {
  const types = {
    grass: 'bg-green-800',
    poison: 'bg-purple-800',
    fire: 'bg-red-600',
    rock: 'bg-gray-800',
  }
  const color = types['grass'] || 'bg-gray-800'
  return <p className={`px-2 py-0.5 text-sm rounded text-white mx-1 ${color}`}>{name}</p>
}

export default TypeLabel
