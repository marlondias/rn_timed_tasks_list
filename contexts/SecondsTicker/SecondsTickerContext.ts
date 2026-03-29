import { createContext, useContext } from 'react'

type SecondsTickerContextType = {
	currentTick: number
}

const SecondsTickerContext = createContext<SecondsTickerContextType | null>(null)

const useSecondsTicker = () => {
	const context = useContext(SecondsTickerContext)

	if (!context)
		throw new Error('"useSecondsTicker" must be used within its context provider.')

	return context
}

export { SecondsTickerContext, useSecondsTicker }
