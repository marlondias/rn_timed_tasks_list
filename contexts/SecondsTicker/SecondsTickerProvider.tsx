import { SecondsTickerContext } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { PropsWithChildren, useEffect, useState } from 'react'

export function SecondsTickerProvider({ children }: PropsWithChildren) {
	const [currentTick, setCurrentTick] = useState<number>(0) // It will only be incremented. The value itself is not relevant. It only server to trigger state change after every tick (seconds).

	const updateTick = () => {
		setCurrentTick((prev) => (prev < Number.MAX_SAFE_INTEGER ? prev + 1 : 0))
	}

	useEffect(() => {
		const interval = setInterval(() => {
			updateTick()
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<SecondsTickerContext.Provider value={{ currentTick }}>
			{children}
		</SecondsTickerContext.Provider>
	)
}
