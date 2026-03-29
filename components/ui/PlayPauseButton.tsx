import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

type Props = {
	isPlaying: boolean
	onPressPlay?: () => void
	onPressPause?: () => void
}

export function PlayPauseButton({ isPlaying, onPressPlay, onPressPause }: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={() => {
				if (isPlaying && onPressPause) {
					onPressPause()
					return
				}

				if (!isPlaying && onPressPlay) {
					onPressPlay()
					return
				}
			}}
		>
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
					name={isPlaying ? 'pause' : 'play'}
					size={24}
					color={isDarkMode ? 'white' : 'black'}
				/>
			</View>
		</TouchableOpacity>
	)
}
