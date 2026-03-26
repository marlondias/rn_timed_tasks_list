import { TaskItem } from '@/components/ui/TaskItem'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { ScrollView, StyleSheet, View } from 'react-native'

export function TaskList() {
	const { tasks, taskStorageService } = useTaskStorage()

	return (
		<View style={styles.container}>
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
							console.log(`Abrir modal de edição. Task ID=${taskId}`)
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
