import { CreateTaskModal } from '@/components/CreateTaskModal'
import { TaskList } from '@/components/TaskList'
import { AddTaskButton } from '@/components/ui/AddTaskButton'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { Task } from '@/types/Task'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
	const { taskStorageService } = useTaskStorage()
	const [tasks, setTasks] = useState<Task[]>([])
	const [isCreationModalVisible, setIsCreationModalVisible] = useState(false)
	const updateTasks = useCallback(() => {
		const storedTasks = taskStorageService.getAll()
		setTasks(storedTasks)
	}, [taskStorageService])

	useEffect(() => {
		updateTasks()
	}, [updateTasks])

	return (
		<SafeAreaView edges={['bottom']} style={styles.safeContainer}>
			<View style={styles.screenContainer}>
				<TaskList tasks={tasks} />

				<CreateTaskModal
					isVisible={isCreationModalVisible}
					setIsVisible={setIsCreationModalVisible}
					onConfirmCreation={(title, duration) => {
						taskStorageService.add(title, duration)
						updateTasks()
					}}
				/>

				<View style={styles.buttonOverlay}>
					<AddTaskButton onPress={() => setIsCreationModalVisible(true)} />
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
	},
	screenContainer: {
		flex: 1,
	},
	buttonOverlay: {
		position: 'absolute',
		right: 30,
		bottom: 30,
	},
})
