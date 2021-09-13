import { Button, Card, Modal, notification, Space, Form, Input, Upload } from 'antd'
import { useEffect, useState } from 'react'
import PokemonCard from '../card'
import TypeLabel from '../label'

const PokemonList = () => {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [pokemonSelected, setPokemonSelected] = useState(null)
  const [modalCreate, setModalCreate] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const fetchPokemons = async () => {
    setLoading(true)
    const pokemonsFromApi = await fetch('http://localhost:8080')
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
      })
    setPokemons(pokemonsFromApi)
    setLoading(false)
  }
  const deletePokemon = async (id) => {
    const isSuccess = await fetch(`http://localhost:8080/${id}`, { method: 'DELETE' })
      .then(() => true)
      .catch(() => false)
    if (isSuccess) {
      closeModal()
      fetchPokemons()
    } else {
      notification.error({ message: 'Delete failed. Please try again' })
    }
  }
  const createPokemon = async (values) => {
    const isSuccess = await fetch('http://localhost:8080', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => true)
      .catch(() => false)
    if (isSuccess) {
      setModalCreate(false)
      fetchPokemons()
    } else {
      notification.error({ message: 'Create pokemon failed. Please try again' })
    }
  }
  const editPokemon = async (values) => {
    const newPokemon = {
      ...pokemonSelected,
      ...values,
    }
    const isSuccess = await fetch(`http://localhost:8080/${pokemonSelected.id}`, {
      method: 'PUT',
      body: JSON.stringify(newPokemon),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => true)
      .catch((e) => {
        console.log(e)
        return false
      })
    if (isSuccess) {
      setPokemonSelected(null)
      setIsEdit(false)
      fetchPokemons()
    } else {
      notification.error({ message: 'Edit pokemon failed. Please try again' })
    }
  }
  const openModal = (pokemon) => {
    setPokemonSelected(pokemon)
  }
  const closeModal = () => {
    setPokemonSelected(null)
  }
  useEffect(() => {
    fetchPokemons()
  }, [])
  return (
    <div>
      <Button onClick={() => setModalCreate(true)}>Create Pokemon</Button>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6'>
        {loading && [1, 2, 3, 4].map((key) => <Card key={key} loading={loading} />)}
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className='cursor-pointer' onClick={() => openModal(pokemon)}>
            <PokemonCard
              key={pokemon.id}
              imgSrc={pokemon.ThumbnailImage}
              name={pokemon.name}
              types={pokemon.type}
              id={pokemon.id}
            />
          </div>
        ))}
      </div>
      <Modal visible={pokemonSelected?.id} footer={null} onCancel={closeModal}>
        <h4 className='font-bold text-lg'>{pokemonSelected?.name}</h4>
        <img className='w-16 h-auto' src={pokemonSelected?.ThumbnailImage} alt='' />
        <div className='flex mt-4'>
          {pokemonSelected?.type?.map((type) => (
            <TypeLabel key={type} name={type} />
          ))}
        </div>
        {isEdit && (
          <Form
            initialValues={pokemonSelected}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name='pokemon-form-edit'
            onFinish={(values) => editPokemon(values)}
            onFinishFailed={() => {}}
          >
            <Form.Item label='ID' name='id' rules={[{ required: true, message: 'Please input your ID!' }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label='Image'
              name='ThumbnailImage'
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
        <Space>
          <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
          <Button onClick={() => deletePokemon(pokemonSelected?.id)}>Delete</Button>
        </Space>
      </Modal>
      <Modal title='Create Pokemon' visible={modalCreate} footer={null} onCancel={() => setModalCreate(false)}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name='pokemon-form'
          onFinish={(values) => createPokemon(values)}
          onFinishFailed={() => {}}
        >
          <Form.Item label='ID' name='id' rules={[{ required: true, message: 'Please input your ID!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Image'
            name='ThumbnailImage'
            rules={[{ required: true, message: 'Please input your image!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PokemonList
