export type TimerDuration = {
	hours: number
	minutes: number
	seconds: number
}

export function getZeroDuration(): TimerDuration {
	return {
		hours: 0,
		minutes: 0,
		seconds: 0,
	}
}
