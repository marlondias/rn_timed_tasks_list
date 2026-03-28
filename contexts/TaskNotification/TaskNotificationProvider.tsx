import { TaskNotificationContext } from '@/contexts/TaskNotification/TaskNotificationContext'
import { Task } from '@/types/Task'
import {
	cancelScheduledNotificationAsync,
	getPermissionsAsync,
	NotificationRequestInput,
	PermissionStatus,
	requestPermissionsAsync,
	SchedulableTriggerInputTypes,
	scheduleNotificationAsync,
	setNotificationHandler,
} from 'expo-notifications'
import { PropsWithChildren, useEffect } from 'react'
import { Alert } from 'react-native'

setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: true,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
})

export function TaskNotificationProvider({ children }: PropsWithChildren) {
	const requestPermissions = async (): Promise<void> => {
		const permissionStatus = await getPermissionsAsync()
		if (permissionStatus.granted) return

		if (
			permissionStatus.status === PermissionStatus.DENIED &&
			!permissionStatus.canAskAgain
		) {
			Alert.alert(
				'Notification permission is required',
				'Please check your settings and ALLOW this app to send notifications.'
			)
			return
		}

		const permissionResponse = await requestPermissionsAsync()
		if (!permissionResponse.granted) {
			Alert.alert(
				'Notification permission is required',
				'For alarms to work, please ALLOW this app to send notifications.'
			)
		}
	}

	const sendNotification = async (request: NotificationRequestInput): Promise<void> => {
		const permissionStatus = await getPermissionsAsync()
		if (!permissionStatus.granted) {
			Alert.alert('Permission denied', 'Cannot send notification without permission.')
			return
		}

		await scheduleNotificationAsync({ ...request })
	}

	const getIdentifierFromTask = (task: Task): string => {
		return `task_${task.id}_alarm`
	}

	const getRequestFromTask = (task: Task): NotificationRequestInput => {
		return {
			identifier: getIdentifierFromTask(task),
			content: {
				title: 'Task Alarm',
				body: `Your task "${task.title}" is done!`,
				interruptionLevel: 'timeSensitive',
			},
			trigger: {
				type: SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: task.remainingTimeInSeconds,
			},
		}
	}

	useEffect(() => {
		requestPermissions()
	}, [])

	return (
		<TaskNotificationContext.Provider
			value={{
				sendImmediateNotification: (content) =>
					sendNotification({ content, trigger: null }),
				scheduleTaskAlarmNotification: (task) =>
					sendNotification(getRequestFromTask(task)),
				cancelTaskAlarmNotification: (task) =>
					cancelScheduledNotificationAsync(getIdentifierFromTask(task)),
			}}
		>
			{children}
		</TaskNotificationContext.Provider>
	)
}
