export type StateChange = 'paused' | 'resumed'

export type TaskRuntimeState = {
	change: StateChange
	happenedAt: Date
}
