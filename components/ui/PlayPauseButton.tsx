import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { TouchableOpacity, useColorScheme, View } from 'react-native'

type Props = {
	initialIsPlaying?: boolean
	onPause?: () => void
	onPlay?: () => void
}

export function PlayPauseButton({ initialIsPlaying, onPause, onPlay }: Props) {
	const [isPlaying, setIsPlaying] = useState(initialIsPlaying ?? false)
	const colorScheme = useColorScheme()
	const isDarkMode = colorScheme === 'dark'

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={() =>
				setIsPlaying((prev) => {
					if (!prev && onPlay) {
						onPlay()
					}
					if (prev && onPause) {
						onPause()
					}
					return !prev
				})
			}
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
