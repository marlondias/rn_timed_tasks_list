import { OptionsMenu } from '@/components/ui/OptionsMenu'
import { PlayPauseButton } from '@/components/ui/PlayPauseButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RestartButton } from '@/components/ui/RestartButton'
import { Task } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
	task: Task
	onPressPlay: (taskId: number) => void
	onPressPause: (taskId: number) => void
	onPressRestart: (taskId: number) => void
	onPressEdit: (taskId: number) => void
	onPressDuplicate: (taskId: number) => void
	onPressRemove: (taskId: number) => void
}

const MINUTE_IN_SECONDS = 60
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS

const getEstimatedTimeText = (timeInSeconds: number): string => {
	if (!Number.isFinite(timeInSeconds) || timeInSeconds <= 0) {
		return '0s'
	}

	const hoursOnly = Math.floor(timeInSeconds / HOUR_IN_SECONDS)
	const minutesOnly = Math.floor((timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS)
	const secondsOnly = timeInSeconds % MINUTE_IN_SECONDS

	return [
		hoursOnly > 0 ? `${hoursOnly}h` : '',
		minutesOnly > 0 ? `${minutesOnly}m` : '',
		secondsOnly > 0 ? `${secondsOnly}s` : '0s',
	].join(' ')
}

const getEstimatedTimeTextFromDuration = (duration: TimerDuration): string => {
	return [
		duration.hours > 0 ? `${duration.hours}h` : '',
		duration.minutes > 0 ? `${duration.minutes}m` : '',
		duration.seconds > 0 ? `${duration.seconds}s` : '0s',
	].join(' ')
}

const getElapsedTimePercentage = (
	duration: TimerDuration,
	remainingTimeInSeconds: number
): number => {
	const timeForCompletionInSeconds =
		duration.hours * HOUR_IN_SECONDS +
		duration.minutes * MINUTE_IN_SECONDS +
		duration.seconds
	return (remainingTimeInSeconds / timeForCompletionInSeconds) * 100
}

export function TaskItem({
	task,
	onPressPlay,
	onPressPause,
	onPressRestart,
	onPressEdit,
	onPressDuplicate,
	onPressRemove,
}: Props) {
	const isCompleted = !!task.completedAt

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.infoWrapper}>
					<Text style={styles.titleText}>{task.title}</Text>
					<Text style={styles.subText}>
						Estimated time: {getEstimatedTimeTextFromDuration(task.duration)}
					</Text>
					<Text style={styles.subText}>
						Remaining time: {getEstimatedTimeText(task.remainingTimeInSeconds)}
					</Text>
				</View>
				<View style={styles.controlsWrapper}>
					{isCompleted ? (
						<RestartButton onPress={() => onPressRestart(task.id)} />
					) : (
						<PlayPauseButton
							initialIsPlaying={task.isRunning}
							onPlay={() => onPressPlay(task.id)}
							onPause={() => onPressPause(task.id)}
						/>
					)}

					<OptionsMenu
						allowEdit={!task.isRunning}
						onPressEdit={() => onPressEdit(task.id)}
						onPressDuplicate={() => onPressDuplicate(task.id)}
						onPressRemove={() => onPressRemove(task.id)}
					/>
				</View>
			</View>
			<ProgressBar
				currentPercentage={getElapsedTimePercentage(
					task.duration,
					task.remainingTimeInSeconds
				)}
				height={5}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#8dc8bd',
		marginVertical: 4,
		borderRadius: 10,
		overflow: 'hidden',
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	infoWrapper: {
		flex: 1,
		flexShrink: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	controlsWrapper: {
		flexShrink: 0,
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 15,
	},
	titleText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	subText: {
		color: 'rgba(255,255,255,0.8)',
		fontSize: 12,
		marginTop: 2,
	},
})
