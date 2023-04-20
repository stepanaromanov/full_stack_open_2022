import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = useCallback(async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
    }, [baseUrl])

    const create = async (newObject) => {
        const response = await axios.post(baseUrl, newObject)
        setResources([response.data, ...resources])
    }
    
    useEffect(() => {
        getAll()
    }, [getAll])
    
    return [resources, {getAll, create}]
  }
  