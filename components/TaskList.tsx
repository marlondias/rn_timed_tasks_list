import { EditTaskModal } from '@/components/EditTaskModal'
import { TaskItem } from '@/components/ui/TaskItem'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
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
						taskStorageService.modify(taskBeingEdited.id, title, duration)
					}}
				/>
			)}

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{tasks.map((task, index) => (
					<TaskItem
						key={index}
						task={task}
						onPressPlay={(taskId) => {
							console.log(`PLAY task ID=${taskId}`)
						}}
						onPressPause={(taskId) => {
							console.log(`PAUSE task ID=${taskId}`)
						}}
						onPressRestart={(taskId) => {
							console.log(`RESTART task ID=${taskId}`)
						}}
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
