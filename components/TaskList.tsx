import { TaskItem } from '@/components/ui/TaskItem'
import { Task } from '@/types/Task'
import { ScrollView, StyleSheet, View } from 'react-native'

type Props = {
	tasks: Task[]
}

export function TaskList({ tasks }: Props) {
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
							console.log(`EDIT task ID=${taskId}`)
						}}
						onPressDuplicate={(taskId) => {
							console.log(`DUPLICATE task ID=${taskId}`)
						}}
						onPressRemove={(taskId) => {
							console.log(`REMOVE task ID=${taskId}`)
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
