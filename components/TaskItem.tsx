import { OptionsMenu } from '@/components/ui/OptionsMenu'
import { PlayPauseRestartButton } from '@/components/ui/PlayPauseRestartButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useSecondsTicker } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { useTaskNotification } from '@/contexts/TaskNotification/TaskNotificationContext'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
import { getRemainingTimeInSeconds } from '@/utils/TaskRuntimeUtils'
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

	const durationInSeconds = useMemo(
		(): number => convertDurationToSeconds(task.duration),
		[task]
	)
	const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState<number>(Number.NaN)
	const isCompleted = useMemo(
		(): boolean => !task.isRunning && remainingTimeInSeconds === 0,
		[remainingTimeInSeconds, task]
	)

	useEffect(() => {
		if (!task.isRunning) return

		setRemainingTimeInSeconds((prev): number => {
			const next = getRemainingTimeInSeconds(task)
			if (next < 1) {
				taskStorageService.modify(task.id, { isRunning: false })
			}
			return next
		})
	}, [currentTick, task])

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
					remainingTimeInSeconds={remainingTimeInSeconds}
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
								taskStorageService.modify(task.id, { isRunning: false }),
							])
						}}
						onPressRestart={() => {
							setRemainingTimeInSeconds(getRemainingTimeInSeconds(task))
							taskStorageService.modify(task.id, { duration: task.duration })
						}}
					/>

					<OptionsMenu
						allowEdit={!task.isRunning}
						onPressEdit={() => onPressEdit(task.id)}
						onPressDuplicate={() => taskStorageService.duplicate(task.id)}
						onPressRemove={() => taskStorageService.remove(task.id)}
					/>
				</View>
			</View>
			<ProgressBar
				currentValue={remainingTimeInSeconds}
				totalValue={durationInSeconds}
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
