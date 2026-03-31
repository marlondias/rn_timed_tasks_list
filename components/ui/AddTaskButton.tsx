import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
	onPress: () => void
}

export function AddTaskButton({ onPress }: Props) {
	const { colors } = useTheme()

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={{ ...styles.button, backgroundColor: colors.card }}
			onPress={onPress}
		>
			<MaterialCommunityIcons name="plus" size={42} color={colors.text} />
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
		elevation: 6,
	},
})
