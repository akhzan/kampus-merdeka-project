import { useContext, useState } from 'react'
import { PokemonContext } from '../../hooks/useAppWithContext'
import { List, Modal, Skeleton } from 'antd'
import TypeLabel from '../label'
// import PokemonCard from '../card'

const PokemonList = () => {
  const { pokemons } = useContext(PokemonContext)
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(false)
  const getDetail = async (item) => {
    setLoading(true)
    setModal({})
    const data = await fetch(item.url)
      .then((res) => res.json())
      .then((res) => res)
      .catch(() => {})
    const newItem = { ...item, data }
    setModal(newItem)
    setLoading(false)
  }
  const { data, name } = modal || {}
  const { id, sprites, types } = data || {}
  return (
    <div className='mt-4 grid grid-cols-4 gap-4'>
      <List
        bordered
        dataSource={pokemons}
        renderItem={(item) => (
          <List.Item className='cursor-pointer' onClick={() => getDetail(item)}>
            {item.name}
          </List.Item>
        )}
      />
      <Modal title={modal?.name} visible={!!modal} onCancel={() => setModal(null)} footer={null}>
        {loading ? (
          <Skeleton active />
        ) : (
          <div className='text-center'>
            <div className='flex justify-center'>
              <img className='h-28 w-auto' src={sprites?.front_default} alt='' />
            </div>
            <p className='text-gray-400 text-sm'>#00{id}</p>
            <p className='my-3'>{name}</p>
            <div className='flex justify-center items-center'>
              {(types || []).map((type, i) => (
                <TypeLabel key={i} name={type.type.name} />
              ))}
            </div>
          </div>
        )}
      </Modal>
      {/* {pokemons.map((pokemon) => {
        const { data, name } = pokemon
        const { id, sprites, types } = data
        return <PokemonCard key={id} imgSrc={sprites.front_default} id={id} name={name} types={types} />
      })} */}
    </div>
  )
}

export default PokemonList
