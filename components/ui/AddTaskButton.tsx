import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'

type Props = {
	onPress: () => void
}

export function AddTaskButton({ onPress }: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={{ ...styles.button, backgroundColor: isDarkMode ? 'black' : 'white' }}
			onPress={onPress}
		>
			<MaterialCommunityIcons
				name="plus"
				size={42}
				color={isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)'}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 70,
		display: 'flex',
		flexGrow: 0,
		justifyContent: 'center',
		alignItems: 'center',
		aspectRatio: 1,
		borderRadius: '50%',
		elevation: 10,
		backgroundColor: 'white',
	},
})
