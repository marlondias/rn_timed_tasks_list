import { createContext, useContext } from 'react'

/**
 * Provides epoch-second based ticker updates.
 * `currentTick` is the current time in epoch seconds (Math.floor(Date.now() / 1000)).
 * Updates are aligned to second boundaries and paused when the app is backgrounded.
 * When the app returns to foreground, currentTick immediately syncs to the actual current time.
 */
type SecondsTickerContextType = {
	/** Current time in epoch seconds. Updates once per second, synced to second boundary. */
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
