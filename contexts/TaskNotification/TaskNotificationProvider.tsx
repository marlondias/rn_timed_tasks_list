import { TaskNotificationContext } from '@/contexts/TaskNotification/TaskNotificationContext'
import * as Notifications from 'expo-notifications'
import { PropsWithChildren, useCallback, useState } from 'react'
import { Alert } from 'react-native'

export function TaskNotificationProvider({ children }: PropsWithChildren) {
	const [hasNotificationsPermission, setHasNotificationsPermission] = useState(false)

	const requestPermissions = useCallback(async () => {
		if (hasNotificationsPermission) return

		const permissionStatus = await Notifications.getPermissionsAsync()
		if (permissionStatus.granted) {
			setHasNotificationsPermission(true)
			return
		}

		if (
			permissionStatus.status === Notifications.PermissionStatus.DENIED &&
			!permissionStatus.canAskAgain
		) {
			Alert.alert(
				'Notification permission is required',
				'The permission for this app to send notifications was DENIED at some point before. Please, go to your settings and ALLOW notification for this app.'
			)
			return
		}

		const permissionResponse = await Notifications.requestPermissionsAsync()
		if (!permissionResponse.granted) {
			Alert.alert(
				'Notification permission is required',
				'For alarms to work, please ALLOW this app to send notifications.'
			)
		}
	}, [hasNotificationsPermission, setHasNotificationsPermission])

	const sendNotification = async (request: Notifications.NotificationRequestInput) => {
		await requestPermissions()

		if (!hasNotificationsPermission) {
			Alert.alert('Permission denied', 'Cannot send notification without permission.')
			return
		}

		await Notifications.scheduleNotificationAsync({ ...request })
	}

	return (
		<TaskNotificationContext.Provider
			value={{
				sendNotificationNow: (content) => sendNotification({ content, trigger: null }),
			}}
		>
			{children}
		</TaskNotificationContext.Provider>
	)
}
