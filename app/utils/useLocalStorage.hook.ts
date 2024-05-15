import { useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch{
      return initialValue
    }
  })

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
    setStoredValue(value)
  }

  return [storedValue, setValue]
}
