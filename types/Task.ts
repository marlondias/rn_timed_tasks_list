import { TimerDuration } from './TimerDuration'

export type Task = {
	id: number
	title: string
	duration: TimerDuration
	remainingTimeInSeconds: number
	isRunning: boolean
	createdAt: Date
	completedAt?: Date
}
