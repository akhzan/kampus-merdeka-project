import { Card } from 'antd'
import TypeLabel from '../label'

const PokemonCard = ({ imgSrc, id, name, types = [] }) => {
  return (
    <Card className='flex justify-center text-center'>
      <div className='flex justify-center'>
        <img className='h-28 w-auto' src={imgSrc} alt='' />
      </div>
      <p className='text-gray-400 text-sm'>#00{id}</p>
      <p className='my-3'>{name}</p>
      <div className='flex justify-center items-center'>
        {types.map((type, i) => (
          <TypeLabel key={i} name={type} />
        ))}
      </div>
    </Card>
  )
}

export default PokemonCard
