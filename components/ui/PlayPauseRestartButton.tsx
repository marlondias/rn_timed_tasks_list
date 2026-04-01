import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

type Props = {
	isCompleted: boolean
	isPlaying: boolean
	onPressPlay?: () => void
	onPressPause?: () => void
	onPressRestart?: () => void
}

export function PlayPauseRestartButton({
	isCompleted,
	isPlaying,
	onPressPlay,
	onPressPause,
	onPressRestart,
}: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={() => {
				if (isCompleted) {
					if (onPressRestart) {
						onPressRestart()
					}
					return
				}

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
					name={isCompleted ? 'restart' : isPlaying ? 'pause' : 'play'}
					size={24}
					color={isDarkMode ? 'white' : 'black'}
				/>
			</View>
		</TouchableOpacity>
	)
}
