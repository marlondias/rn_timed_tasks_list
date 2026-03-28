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
} from 'expo-notifications'
import { PropsWithChildren, useState } from 'react'
import { Alert } from 'react-native'

export function TaskNotificationProvider({ children }: PropsWithChildren) {
	const [hasNotificationsPermission, setHasNotificationsPermission] = useState(false)

	const requestPermissions = async () => {
		if (hasNotificationsPermission) return

		const permissionStatus = await getPermissionsAsync()
		if (permissionStatus.granted) {
			setHasNotificationsPermission(true)
			return
		}

		if (
			permissionStatus.status === PermissionStatus.DENIED &&
			!permissionStatus.canAskAgain
		) {
			Alert.alert(
				'Notification permission is required',
				'The permission for this app to send notifications was DENIED at some point before. Please, go to your settings and ALLOW notification for this app.'
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

	const sendNotification = async (request: NotificationRequestInput) => {
		await requestPermissions()

		if (!hasNotificationsPermission) {
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
				color: 'ff3333',
				interruptionLevel: 'timeSensitive',
			},
			trigger: {
				type: SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: task.remainingTimeInSeconds,
			},
		}
	}

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
