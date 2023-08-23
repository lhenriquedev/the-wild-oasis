import { Select } from './Select'
import { useSearchParams } from 'react-router-dom'

export function SortyBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get('sortBy') || ''

  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select
      type="white"
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  )
}
