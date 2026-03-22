import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

type Props = {
	onPress?: () => void
}

export function OptionsButton({ onPress }: Props) {
	const colorScheme = useColorScheme()
	const isDarkMode = colorScheme === 'dark'

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<View
				style={{
					backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.5)',
					paddingLeft: 10,
					paddingRight: 6,
					paddingVertical: 8,
					borderRadius: '50%',
					borderTopRightRadius: 5,
					borderBottomRightRadius: 5,
					mixBlendMode: 'overlay',
				}}
			>
				<MaterialCommunityIcons
					name="dots-vertical"
					size={24}
					color={isDarkMode ? 'white' : 'black'}
				/>
			</View>
		</TouchableOpacity>
	)
}
