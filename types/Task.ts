import { TimerDuration } from '@/types/TimerDuration'

export type Task = {
	id: number
	title: string
	duration: TimerDuration
	remainingTimeInSeconds: number
	isRunning: boolean
	createdAt: Date
	completedAt?: Date
}

export type TaskModifiableProps = {
	title?: string
	duration?: TimerDuration
	remainingTimeInSeconds?: number
	isRunning?: boolean
}
