import { OptionsMenu } from '@/components/ui/OptionsMenu'
import { PlayPauseButton } from '@/components/ui/PlayPauseButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RestartButton } from '@/components/ui/RestartButton'
import { useSecondsTicker } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { Task } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'
import React, { useEffect, useState } from 'react'
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

const getDurationAsSeconds = (duration: TimerDuration): number => {
	return (
		duration.hours * HOUR_IN_SECONDS +
		duration.minutes * MINUTE_IN_SECONDS +
		duration.seconds
	)
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
	const { currentTick } = useSecondsTicker()
	const [visualRemainingTimeInSeconds, setVisualRemainingTimeInSeconds] =
		useState<number>(task.remainingTimeInSeconds)

	useEffect(() => {
		if (!task.isRunning || visualRemainingTimeInSeconds < 1) return
		console.log('use fx decrement')
		setVisualRemainingTimeInSeconds((prev) => prev - 1)
	}, [currentTick])

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.infoWrapper}>
					<Text style={styles.titleText}>{task.title}</Text>
					<Text style={styles.subText}>
						Duration: {getEstimatedTimeTextFromDuration(task.duration)}
					</Text>
					<Text style={styles.subText}>
						Remaining: {getEstimatedTimeText(task.remainingTimeInSeconds)}
					</Text>
				</View>
				<View style={styles.controlsWrapper}>
					{task.completedAt ? (
						<RestartButton onPress={() => onPressRestart(task.id)} />
					) : (
						<PlayPauseButton
							isPlaying={task.isRunning}
							onPressPlay={() => onPressPlay(task.id)}
							onPressPause={() => onPressPause(task.id)}
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
				currentValue={visualRemainingTimeInSeconds}
				totalValue={getDurationAsSeconds(task.duration)}
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
