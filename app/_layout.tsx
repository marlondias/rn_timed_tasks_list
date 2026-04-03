import { DarkTheme, LightTheme } from '@/constants/NavigationThemes'
import { SecondsTickerProvider } from '@/contexts/SecondsTicker/SecondsTickerProvider'
import { TaskNotificationProvider } from '@/contexts/TaskNotification/TaskNotificationProvider'
import { TaskStorageProvider } from '@/contexts/TaskStorage/TaskStorageProvider'
import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<SecondsTickerProvider>
			<TaskStorageProvider>
				<TaskNotificationProvider>
					<SafeAreaProvider>
						<ThemeProvider value={isDarkMode ? DarkTheme : LightTheme}>
							<StatusBar style="auto" />
							<Stack screenOptions={{ title: 'MultiTasker' }} />
						</ThemeProvider>
					</SafeAreaProvider>
				</TaskNotificationProvider>
			</TaskStorageProvider>
		</SecondsTickerProvider>
	)
}
