import { useSecondsTicker } from '@/contexts/SecondsTicker/SecondsTickerContext'
import { useTaskNotification } from '@/contexts/TaskNotification/TaskNotificationContext'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
import { convertDurationToSeconds } from '@/utils/TimeUtils'
import React, { useEffect, useState } from 'react'
import { EditTaskModal } from './EditTaskModal'
import { TaskItemCard } from './ui/TaskItemCard'

type Props = {
	task: Task
}

export function TaskItem({ task }: Props) {
	const { currentTick } = useSecondsTicker()
	const { taskStorageService } = useTaskStorage()
	const { scheduleTaskAlarmNotification, cancelTaskAlarmNotification } =
		useTaskNotification()

	const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState<number>(Number.NaN)
	const [isEditModalVisible, setIsEditModalVisible] = useState(false)

	useEffect(() => {
		if (!task.isRunning) return

		setRemainingTimeInSeconds((prev) => {
			const next = prev - 1
			if (next < 1) {
				taskStorageService.modify(task.id, { isRunning: false })
				return prev
			}
			return next
		})
	}, [currentTick])

	return (
		<>
			<TaskItemCard
				title={task.title}
				duration={task.duration}
				remainingTimeInSeconds={remainingTimeInSeconds}
				isRunning={task.isRunning}
				isCompleted={!task.isRunning && remainingTimeInSeconds < 1}
				onPressPlay={() => {
					return Promise.all([
						// scheduleTaskAlarmNotification(task),
						taskStorageService.modify(task.id, { isRunning: true }),
					])
				}}
				onPressPause={() => {
					return Promise.all([
						// cancelTaskAlarmNotification(task),
						taskStorageService.modify(task.id, { isRunning: false }),
					])
				}}
				onPressRestart={() => {
					setRemainingTimeInSeconds(convertDurationToSeconds(task.duration))
					taskStorageService.modify(task.id, {
						duration: task.duration,
						isRunning: false,
					})
				}}
				onPressEdit={() => {
					setIsEditModalVisible(true)
				}}
				onPressDuplicate={() => {
					taskStorageService.duplicate(task.id)
				}}
				onPressRemove={() => {
					taskStorageService.remove(task.id)
				}}
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
						})
					}}
				/>
			)}
		</>
	)
}
