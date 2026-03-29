import { TimerDuration } from '@/types/TimerDuration'

export type Task = {
	id: number
	title: string
	duration: TimerDuration
	remainingTimeInSeconds: number
	isRunning: boolean
	createdAt: Date
}

export type TaskModifiableProps = {
	title?: string
	duration?: TimerDuration
	remainingTimeInSeconds?: number
	isRunning?: boolean
}
