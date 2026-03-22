import { Task } from '@/types/Task'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OptionsMenu } from './OptionsMenu'
import { PlayPauseButton } from './PlayPauseButton'
import { ProgressBar } from './ProgressBar'
import { RestartButton } from './RestartButton'

type Props = {
	task: Task
	onPressPlay: (taskId: number) => void
	onPressPause: (taskId: number) => void
	onPressRestart: (taskId: number) => void
	onPressEdit: (taskId: number) => void
	onPressDuplicate: (taskId: number) => void
	onPressRemove: (taskId: number) => void
}

const getEstimatedTimeText = (timeInSeconds: number): string => {
	const MINUTE_IN_SECONDS = 60
	const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS

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
						Estimated time: {getEstimatedTimeText(task.timeForCompletionInSeconds)}
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
						onPressEdit={() => onPressEdit(task.id)}
						onPressDuplicate={() => onPressDuplicate(task.id)}
						onPressRemove={() => onPressRemove(task.id)}
					/>
				</View>
			</View>
			<ProgressBar
				currentPercentage={
					(task.remainingTimeInSeconds / task.timeForCompletionInSeconds) * 100
				}
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
