import { TaskItem } from '@/components/TaskItem'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { ScrollView, StyleSheet, View } from 'react-native'

export function TaskList() {
	const { tasks } = useTaskStorage()

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} />
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
