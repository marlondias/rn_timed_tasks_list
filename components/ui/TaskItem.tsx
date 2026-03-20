import { Task } from '@/types/Task'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { OptionsButton } from './OptionsButton'
import { PlayPauseButton } from './PlayPauseButton'
import { ProgressBar } from './ProgressBar'

type Props = {
	task: Task

	onPaused?: () => boolean
	onResumed?: () => boolean
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

export function TaskItem({ task, ...props }: Props) {
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
					<PlayPauseButton
						initialIsPlaying={task.isRunning}
						onPause={() => console.log(`PAUSED task ID=${task.id}`)}
						onResume={() => console.log(`RESUMED task ID=${task.id}`)}
					/>
					<OptionsButton
						onPress={() => console.log(`OPTIONS button pressed for task ID=${task.id}`)}
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
		flexGrow: 1,
		backgroundColor: 'red',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	controlsWrapper: {
		backgroundColor: 'green',
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
