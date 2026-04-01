import { OptionsMenu } from '@/components/ui/OptionsMenu'
import { PlayPauseRestartButton } from '@/components/ui/PlayPauseRestartButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useSecondsTicker } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { useTaskNotification } from '@/contexts/TaskNotification/TaskNotificationContext'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
import { convertDurationToSeconds } from '@/utils/TimeUtils'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { TaskItemInfo } from './ui/TaskItemInfo'

type Props = {
	task: Task
	onPressEdit: (taskId: number) => void
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
				<TaskItemInfo
					title={task.title}
					duration={task.duration}
					remainingTimeInSeconds={visualRemainingTimeInSeconds}
				/>
				<View style={styles.controlsWrapper}>
					<PlayPauseRestartButton
						isCompleted={isCompleted}
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
						onPressRestart={() => {
							setVisualRemainingTimeInSeconds(convertDurationToSeconds(task.duration))
							taskStorageService.modify(task.id, {
								isRunning: false,
								remainingTimeInSeconds: convertDurationToSeconds(task.duration),
							})
						}}
					/>

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
	controlsWrapper: {
		flexShrink: 0,
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 15,
	},
})
