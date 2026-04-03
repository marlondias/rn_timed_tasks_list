import { TaskNotificationContext } from '@/contexts/TaskNotification/TaskNotificationContext'
import { useTaskStorage } from '@/contexts/TaskStorage/TaskStorageContext'
import { getRemainingTimeInSeconds } from '@/utils/TaskRuntimeUtils'
import {
	AndroidImportance,
	cancelScheduledNotificationAsync,
	getPermissionsAsync,
	NotificationRequestInput,
	PermissionStatus,
	requestPermissionsAsync,
	SchedulableTriggerInputTypes,
	scheduleNotificationAsync,
	setNotificationChannelAsync,
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
	const { taskStorageService } = useTaskStorage()

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

	const getIdentifierFromTask = (taskId: number): string => {
		return `task_alarm_${taskId}`
	}

	const getRequestFromTask = (taskId: number): NotificationRequestInput => {
		const task = taskStorageService.get(taskId)

		return {
			identifier: getIdentifierFromTask(task.id),
			content: {
				title: 'Task Alarm',
				body: `Your task "${task.title}" is done!`,
				interruptionLevel: 'timeSensitive',
			},
			trigger: {
				type: SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: getRemainingTimeInSeconds(task),
				channelId: 'alarms',
			},
		}
	}

	useEffect(() => {
		requestPermissions()

		setNotificationChannelAsync('alarms', {
			name: 'Task Alarms',
			importance: AndroidImportance.HIGH,
			sound: 'alarm.wav',
		})
	}, [])

	return (
		<TaskNotificationContext.Provider
			value={{
				sendImmediateNotification: (content) =>
					sendNotification({ content, trigger: null }),

				scheduleAlarmNotification: (taskId) =>
					sendNotification(getRequestFromTask(taskId)),

				cancelAlarmNotification: (taskId) =>
					cancelScheduledNotificationAsync(getIdentifierFromTask(taskId)),
			}}
		>
			{children}
		</TaskNotificationContext.Provider>
	)
}
