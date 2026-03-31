import { OptionsMenu } from '@/components/ui/OptionsMenu'
import { PlayPauseButton } from '@/components/ui/PlayPauseButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RestartButton } from '@/components/ui/RestartButton'
import { useSecondsTicker } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { useTaskNotification } from '@/contexts/TaskNotification/TaskNotificationContext'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'
import { convertDurationToSeconds, convertSecondsToDuration } from '@/utils/TimeUtils'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'

type Props = {
	task: Task
	onPressEdit: (taskId: number) => void
}

const getEstimatedTimeText = (timeInSeconds: number): string => {
	const { hours, minutes, seconds } = convertSecondsToDuration(timeInSeconds)

	return [
		hours > 0 ? `${hours}h` : '',
		minutes > 0 ? `${minutes}m` : '',
		seconds > 0 ? `${seconds}s` : '0s',
	].join(' ')
}

const getEstimatedTimeTextFromDuration = (duration: TimerDuration): string => {
	return [
		duration.hours > 0 ? `${duration.hours}h` : '',
		duration.minutes > 0 ? `${duration.minutes}m` : '',
		duration.seconds > 0 ? `${duration.seconds}s` : '0s',
	].join(' ')
}

export function TaskItem({ task, onPressEdit }: Props) {
	const isDarkMode = useColorScheme() === 'dark'
	const { currentTick } = useSecondsTicker()
	const { taskStorageService } = useTaskStorage()
	const { scheduleTaskAlarmNotification, cancelTaskAlarmNotification } =
		useTaskNotification()
	const [visualRemainingTimeInSeconds, setVisualRemainingTimeInSeconds] =
		useState<number>(task.remainingTimeInSeconds)

	const isCompleted = useMemo(
		(): boolean => !task.isRunning && task.remainingTimeInSeconds === 0,
		[task]
	)

	useEffect(() => {
		if (!task.isRunning) return

		if (visualRemainingTimeInSeconds < 1) {
			taskStorageService.modify(task.id, { isRunning: false, remainingTimeInSeconds: 0 })
			return
		}

		setVisualRemainingTimeInSeconds((prev) => prev - 1)
	}, [currentTick])

	useEffect(() => {
		setVisualRemainingTimeInSeconds(task.remainingTimeInSeconds)
	}, [task])

	return (
		<View
			style={{
				...styles.container,
				...(isDarkMode ? styles.containerDarkMode : styles.containerLightMode),
			}}
		>
			<View style={styles.content}>
				<View style={styles.infoWrapper}>
					<Text
						style={{
							...styles.titleText,
							...(isDarkMode ? styles.textColorDarkMode : styles.textColorLightMode),
						}}
					>
						{task.title}
					</Text>
					<Text
						style={{
							...styles.subText,
							...(isDarkMode ? styles.textColorDarkMode : styles.textColorLightMode),
						}}
					>
						Duration: {getEstimatedTimeTextFromDuration(task.duration)}
					</Text>
					<Text
						style={{
							...styles.subText,
							...(isDarkMode ? styles.textColorDarkMode : styles.textColorLightMode),
						}}
					>
						Remaining: {getEstimatedTimeText(visualRemainingTimeInSeconds)}
					</Text>
				</View>
				<View style={styles.controlsWrapper}>
					{isCompleted ? (
						<RestartButton
							onPress={() => {
								setVisualRemainingTimeInSeconds(convertDurationToSeconds(task.duration))
								taskStorageService.modify(task.id, {
									isRunning: false,
									remainingTimeInSeconds: convertDurationToSeconds(task.duration),
								})
							}}
						/>
					) : (
						<PlayPauseButton
							isPlaying={task.isRunning}
							onPressPlay={() => {
								return Promise.all([
									scheduleTaskAlarmNotification(task),
									taskStorageService.modify(task.id, { isRunning: true }),
								])
							}}
							onPressPause={() => {
								return Promise.all([
									cancelTaskAlarmNotification(task),
									taskStorageService.modify(task.id, {
										isRunning: false,
										remainingTimeInSeconds: visualRemainingTimeInSeconds,
									}),
								])
							}}
						/>
					)}

					<OptionsMenu
						allowEdit={!task.isRunning}
						onPressEdit={() => onPressEdit(task.id)}
						onPressDuplicate={async () => await taskStorageService.duplicate(task.id)}
						onPressRemove={async () => await taskStorageService.remove(task.id)}
					/>
				</View>
			</View>
			<ProgressBar
				currentValue={visualRemainingTimeInSeconds}
				totalValue={convertDurationToSeconds(task.duration)}
				height={5}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 4,
		borderRadius: 10,
		overflow: 'hidden',
	},
	containerLightMode: {
		backgroundColor: 'rgb(199, 174, 62)',
		elevation: 2,
	},
	containerDarkMode: {
		backgroundColor: 'rgb(167, 145, 49)',
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
		fontSize: 16,
		fontWeight: '600',
	},
	subText: {
		fontSize: 12,
		marginTop: 2,
	},
	textColorLightMode: {
		mixBlendMode: 'multiply',
		color: 'rgba(0, 0, 0, 0.65)',
	},
	textColorDarkMode: {
		mixBlendMode: 'overlay',
		color: 'rgba(255, 255, 255, 0.9)',
	},
})
