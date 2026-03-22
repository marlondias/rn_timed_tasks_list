import { TaskList } from '@/components/TaskList'
import { Task } from '@/types/Task'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

function getRandomTimeInSeconds(): number {
	const min = 30
	const max = 2 * 60 * 60
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const mockTasks: Task[] = Array.from({ length: 20 }).map((value, index) => {
	const completionTime = getRandomTimeInSeconds()
	const remainingTime = Math.random() * completionTime
	return {
		id: 100 + index,
		title: `Mock task #${index + 1}`,
		createdAt: new Date(),
		timeForCompletionInSeconds: completionTime,
		remainingTimeInSeconds: remainingTime,
		isRunning: false,
	}
})

export default function Index() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.safeContainer}>
				<TaskList tasks={mockTasks} />
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: '#C6E916',
	},
})
