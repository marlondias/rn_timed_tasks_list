import { TaskRuntimeState } from '@/types/TaskRuntimeState'
import { TimerDuration } from '@/types/TimerDuration'

export type Task = {
	id: number
	createdAt: Date
	title: string
	duration: TimerDuration
	isRunning: boolean
	runtimeStates: TaskRuntimeState[]
}

export type TaskModifiableProps = {
	title?: string
	duration?: TimerDuration
	isRunning?: boolean
}
