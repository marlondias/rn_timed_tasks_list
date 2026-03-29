import { TimerDuration } from '@/types/TimerDuration'

const MINUTE_IN_SECONDS = 60
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS

export function convertDurationToSeconds(duration: TimerDuration): number {
	return (
		duration.hours * HOUR_IN_SECONDS +
		duration.minutes * MINUTE_IN_SECONDS +
		duration.seconds
	)
}

export function convertSecondsToDuration(timeInSeconds: number): TimerDuration {
	if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
		return { hours: 0, minutes: 0, seconds: 0 }
	}

	const hours = Math.floor(timeInSeconds / HOUR_IN_SECONDS)
	const minutes = Math.floor((timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS)
	const seconds = timeInSeconds % MINUTE_IN_SECONDS

	return { hours, minutes, seconds }
}
