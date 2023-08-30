import { createContext, useContext, useEffect } from 'react'

import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((isDark) => !isDark)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

const useDarkMode = () => {
  const context = useContext(DarkModeContext)

  if (context === undefined)
    throw new Error('useDarkMode must be used within a DarkModeProvider')

  return context
}

export { DarkModeProvider, useDarkMode }
