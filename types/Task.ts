export type Task = {
	id: number
	title: string
	timeForCompletionInSeconds: number
	remainingTimeInSeconds: number
	isRunning: boolean
	createdAt: Date
	completedAt?: Date
}
