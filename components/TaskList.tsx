import { EditTaskModal } from '@/components/EditTaskModal'
import { TaskItem } from '@/components/TaskItem'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task, TaskModifiableProps } from '@/types/Task'
import { convertDurationToSeconds } from '@/utils/TimeUtils'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

export function TaskList() {
	const { tasks, taskStorageService } = useTaskStorage()
	const [isEditModalVisible, setIsEditModalVisible] = useState(false)
	const [taskBeingEdited, setTaskBeingEdited] = useState<Task>()

	return (
		<View style={styles.container}>
			{taskBeingEdited && (
				<EditTaskModal
					isVisible={isEditModalVisible}
					setIsVisible={setIsEditModalVisible}
					initialTitle={taskBeingEdited.title}
					initialDuration={taskBeingEdited.duration}
					onConfirmEditing={(title, duration) => {
						const newTaskProps: TaskModifiableProps = { title }

						if (taskBeingEdited.duration !== duration) {
							newTaskProps.duration = duration
							newTaskProps.remainingTimeInSeconds = convertDurationToSeconds(duration)
						}

						taskStorageService.modify(taskBeingEdited.id, newTaskProps)
						setTaskBeingEdited(undefined)
					}}
				/>
			)}

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						onPressEdit={(taskId) => {
							const task = taskStorageService.get(taskId)
							setTaskBeingEdited(task)
							setIsEditModalVisible(true)
						}}
						onPressDuplicate={(taskId) => {
							taskStorageService.duplicate(taskId)
						}}
						onPressRemove={(taskId) => {
							taskStorageService.remove(taskId)
						}}
					/>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 16,
	},
})
