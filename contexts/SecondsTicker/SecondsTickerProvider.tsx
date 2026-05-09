import { SecondsTickerContext } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export function SecondsTickerProvider({ children }: PropsWithChildren) {
	// currentTick is epoch seconds (Math.floor(Date.now() / 1000))
	// It reflects the actual time, so consumers get a reliable source of truth for remaining time calculations
	const [currentTick, setCurrentTick] = useState<number>(() =>
		Math.floor(Date.now() / 1000)
	)
	const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState)
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	// Listen to app state changes (background/foreground transitions)
	useEffect(() => {
		const subscription = AppState.addEventListener('change', setAppState)
		return () => subscription.remove()
	}, [])

	// Schedule ticker updates aligned to second boundaries when app is active
	useEffect(() => {
		// Clear any existing timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}

		// Only schedule if app is in foreground
		if (appState !== 'active') return

		// Function to schedule the next tick with alignment to the next second boundary
		const scheduleNextTick = () => {
			const now = Date.now()
			const delayToNextSecond = 1000 - (now % 1000)

			timeoutRef.current = setTimeout(() => {
				// Update to current epoch seconds
				setCurrentTick(Math.floor(Date.now() / 1000))
				// Schedule next tick recursively
				scheduleNextTick()
			}, delayToNextSecond)
		}

		// Immediately sync to current time when app comes to foreground
		setCurrentTick(Math.floor(Date.now() / 1000))
		// Schedule the next tick
		scheduleNextTick()

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		}
	}, [appState])

	return (
		<SecondsTickerContext.Provider value={{ currentTick }}>
			{children}
		</SecondsTickerContext.Provider>
	)
}
