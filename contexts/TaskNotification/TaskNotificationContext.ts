import { NotificationContentInput } from 'expo-notifications'
import { createContext, useContext } from 'react'

type TaskNotificationContextType = {
	sendNotificationNow: (content: NotificationContentInput) => Promise<void>
}

const TaskNotificationContext = createContext<TaskNotificationContextType | null>(null)

const useTaskNotification = () => {
	const context = useContext(TaskNotificationContext)

	if (!context)
		throw new Error('"useTaskNotification" must be used within its context provider.')

	return context
}

export { TaskNotificationContext, useTaskNotification }
