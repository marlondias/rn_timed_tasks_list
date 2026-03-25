import { TaskStorageProvider } from '@/contexts/TaskStorage/TaskStorageProvider'
import { Stack } from 'expo-router'

export default function RootLayout() {
	return (
		<TaskStorageProvider>
			<Stack />
		</TaskStorageProvider>
	)
}
