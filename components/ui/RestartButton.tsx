import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

type Props = {
	onPress?: () => void
}

export function RestartButton({ onPress }: Props) {
	const colorScheme = useColorScheme()
	const isDarkMode = colorScheme === 'dark'

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<View
				style={{
					backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.5)',
					paddingHorizontal: 8,
					paddingVertical: 8,
					borderRadius: '50%',
					mixBlendMode: 'overlay',
				}}
			>
				<MaterialCommunityIcons
					name="restart"
					size={24}
					color={isDarkMode ? 'white' : 'black'}
				/>
			</View>
		</TouchableOpacity>
	)
}
