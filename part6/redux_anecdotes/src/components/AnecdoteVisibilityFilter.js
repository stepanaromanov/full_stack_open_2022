import { setFilter } from '../reducers/anecdoteFilterReducer'
import { useDispatch } from 'react-redux'


const AnecdoteVisibilityFilter = (props) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
export default AnecdoteVisibilityFilter