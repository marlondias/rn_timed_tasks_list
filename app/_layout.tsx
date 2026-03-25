import { TaskStorageProvider } from '@/contexts/TaskStorage/TaskStorageProvider'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
	const colorScheme = useColorScheme()

	return (
		<TaskStorageProvider>
			<SafeAreaProvider>
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<StatusBar style="auto" />
					<Stack />
				</ThemeProvider>
			</SafeAreaProvider>
		</TaskStorageProvider>
	)
}
