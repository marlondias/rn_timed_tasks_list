import { NotificationContentInput } from 'expo-notifications'
import { createContext, useContext } from 'react'

type TaskNotificationContextType = {
	sendImmediateNotification: (content: NotificationContentInput) => Promise<void>
	scheduleAlarmNotification: (taskId: number) => Promise<void>
	cancelAlarmNotification: (taskId: number) => Promise<void>
}

const TaskNotificationContext = createContext<TaskNotificationContextType | null>(null)

const useTaskNotification = () => {
	const context = useContext(TaskNotificationContext)

	if (!context)
		throw new Error('"useTaskNotification" must be used within its context provider.')

	return context
}

export { TaskNotificationContext, useTaskNotification }
