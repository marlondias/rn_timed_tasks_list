import { createContext, useContext } from 'react'

type I18NTextKeys = 'WELCOME'

type I18NContextType = {
	supportedLanguages: Set<string>
	getCurrentLanguage: () => string
}

const I18NContext = createContext<I18NContextType | null>(null)

const useI18N = () => {
	const context = useContext(I18NContext)

	if (!context) throw new Error('"useI18N" must be used within its context provider.')

	return context
}

export { I18NContext, useI18N }
