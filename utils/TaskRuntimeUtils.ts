import { Task } from '@/types/Task'
import { TaskRuntimeState } from '@/types/TaskRuntimeState'
import { convertDurationToSeconds } from './TimeUtils'

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

	return Math.floor(elapsedTimeInMilliseconds / 1000)
}

export function getRemainingTimeInSeconds(task: Task): number {
	return (
		Math.max(convertDurationToSeconds(task.duration)) -
		Math.max(0, getElapsedTimeInSeconds(task))
	)
}
