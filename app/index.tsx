import { CreateTaskModal } from '@/components/CreateTaskModal'
import { AddTaskButton } from '@/components/ui/AddTaskButton'
import { Task } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'
import { useState } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

function getRandomDuration(): TimerDuration {
	return {
		hours: Math.floor(Math.random() * 12),
		minutes: Math.floor(Math.random() * 59),
		seconds: Math.floor(Math.random() * 59),
	}
}

function getDurationAsSeconds(duration: TimerDuration): number {
	const MINUTE_IN_SECONDS = 60
	const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS
	return (
		duration.hours * HOUR_IN_SECONDS +
		duration.minutes * MINUTE_IN_SECONDS +
		duration.seconds
	)
}

const mockTasks: Task[] = Array.from({ length: 4 }).map((value, index) => {
	const duration = getRandomDuration()
	const remainingTime = Math.floor(getDurationAsSeconds(duration) * Math.random())
	return {
		id: 100 + index,
		title: `Mock task #${index + 1}`,
		duration,
		createdAt: new Date(),
		remainingTimeInSeconds: remainingTime,
		isRunning: false,
	}
})

export default function Index() {
	const isDarkMode = useColorScheme() === 'dark'
	const [isCreationModalVisible, setIsCreationModalVisible] = useState(false)

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.safeContainer}>
				<View
					style={{
						...styles.screenContainer,
						...(isDarkMode
							? styles.screenContainerDarkMode
							: styles.screenContainerLightMode),
					}}
				>
					{/* <TaskList tasks={mockTasks} /> */}

					<CreateTaskModal
						isVisible={isCreationModalVisible}
						setIsVisible={setIsCreationModalVisible}
						onConfirmCreation={(title, duration) => console.log({ title, duration })}
					/>

					<View style={styles.buttonOverlay}>
						<AddTaskButton onPress={() => setIsCreationModalVisible(true)} />
					</View>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: '#C6E916',
	},
	screenContainer: {
		flex: 1,
	},
	screenContainerLightMode: {
		backgroundColor: '#eeeeee',
	},
	screenContainerDarkMode: {
		backgroundColor: '#1e1e1e',
	},
	buttonOverlay: {
		position: 'absolute',
		right: 30,
		bottom: 30,
	},
})
