import { useSecondsTicker } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { useTaskNotification } from '@/contexts/TaskNotification/TaskNotificationContext'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
import { getRemainingTimeInSeconds } from '@/utils/TaskRuntimeUtils'
import { convertDurationToSeconds } from '@/utils/TimeUtils'
import React, { useEffect, useState } from 'react'
import { EditTaskModal } from './EditTaskModal'
import { TaskItemCard } from './ui/TaskItemCard'

type Props = {
	task: Task
}

export function TaskItem({ task }: Props) {
	const { taskStorageService } = useTaskStorage()
	const { currentTick } = useSecondsTicker()
	const { scheduleAlarmNotification, cancelAlarmNotification } = useTaskNotification()
	const [isEditModalVisible, setIsEditModalVisible] = useState(false)
	const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(Number.NaN)

	useEffect(() => {
		setIsEditModalVisible(false)
		setRemainingTimeInSeconds(getRemainingTimeInSeconds(task))
	}, [task])

	useEffect(() => {
		if (!task.isRunning) return

		setRemainingTimeInSeconds((prev): number => {
			const next = getRemainingTimeInSeconds(task)
			if (next <= 0) {
				taskStorageService.modify(task.id, { isRunning: false })
			}
			return next
		})
	}, [taskStorageService, task, currentTick])

	return (
		<>
			<TaskItemCard
				title={task.title}
				duration={task.duration}
				remainingTimeInSeconds={remainingTimeInSeconds}
				isRunning={task.isRunning}
				isCompleted={!task.isRunning && remainingTimeInSeconds === 0}
				onPressPlay={() => {
					taskStorageService.modify(task.id, { isRunning: true }).then(() => {
						scheduleAlarmNotification(task.id)
					})
				}}
				onPressPause={() => {
					taskStorageService.modify(task.id, { isRunning: false }).then(() => {
						cancelAlarmNotification(task.id)
					})
				}}
				onPressRestart={() => {
					taskStorageService.modify(task.id, {
						duration: task.duration,
						isRunning: false,
					})
				}}
				onPressEdit={() => setIsEditModalVisible(true)}
				onPressDuplicate={() => taskStorageService.duplicate(task.id)}
				onPressRemove={() => taskStorageService.remove(task.id)}
			/>

			{!task.isRunning && (
				<EditTaskModal
					isVisible={isEditModalVisible}
					setIsVisible={setIsEditModalVisible}
					initialTitle={task.title}
					initialDuration={task.duration}
					onConfirmEditing={(title, duration) => {
						const isChangingDuration = task.duration !== duration
						if (isChangingDuration) {
							setRemainingTimeInSeconds(convertDurationToSeconds(duration))
						}

						taskStorageService.modify(task.id, {
							title,
							duration: isChangingDuration ? duration : undefined,
							isRunning: false,
						})
					}}
				/>
			)}
		</>
	)
}
