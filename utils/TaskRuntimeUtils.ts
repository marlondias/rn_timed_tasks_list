import { Task } from '@/types/Task'
import { TaskRuntimeState } from '@/types/TaskRuntimeState'
import { convertDurationToSeconds } from './TimeUtils'

const SECOND_IN_MILLIS = 1000

function getConsolidatedElapsedTimeInMillis(
	sortedRuntimeStates: TaskRuntimeState[]
): number {
	// "Consolidated" means the result is based only on the runtimeStates array, ignoring current time.

	if (sortedRuntimeStates.length < 2) {
		return 0
	}

	let elapsedTimeInMilliseconds = 0

	for (let i = 0; i < sortedRuntimeStates.length - 1; i++) {
		const firstState = sortedRuntimeStates[i]
		if (firstState.change !== 'resumed') continue

		const secondState = sortedRuntimeStates[i + 1]
		if (secondState.change !== 'paused') continue

		elapsedTimeInMilliseconds +=
			secondState.happenedAt.getTime() - firstState.happenedAt.getTime()
	}

	return elapsedTimeInMilliseconds
}

function getCurrentElapsedTimeInMillis(
	sortedRuntimeStates: TaskRuntimeState[],
	currentDate: Date
): number {
	const lastState = sortedRuntimeStates.at(-1)
	if (!lastState || lastState.change === 'paused') return 0

	return currentDate.getTime() - lastState.happenedAt.getTime()
}

export function getElapsedTimeInSeconds(task: Task): number {
	const sortedRuntimeStates = [...task.runtimeStates].sort(
		(a, b) => a.happenedAt.getTime() - b.happenedAt.getTime()
	)

	let elapsedTimeInMilliseconds =
		getConsolidatedElapsedTimeInMillis(sortedRuntimeStates) +
		getCurrentElapsedTimeInMillis(sortedRuntimeStates, new Date())

	return Math.floor(elapsedTimeInMilliseconds / SECOND_IN_MILLIS)
}

export function getRemainingTimeInSeconds(task: Task): number {
	const totalSeconds = Math.max(0, convertDurationToSeconds(task.duration))
	const elapsedSeconds = Math.max(0, getElapsedTimeInSeconds(task))

	if (elapsedSeconds < 1) {
		return totalSeconds
	}

	return elapsedSeconds < totalSeconds ? totalSeconds - elapsedSeconds : 0
}
