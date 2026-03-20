import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

type Props = {
	initialIsPlaying?: boolean
	onPause?: () => void
	onResume?: () => void
}

export function PlayPauseButton({ initialIsPlaying, onPause, onResume }: Props) {
	const [isPlaying, setIsPlaying] = useState(initialIsPlaying ?? false)

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() =>
				setIsPlaying((prev) => {
					if (!prev && onResume) {
						onResume()
					}
					if (prev && onPause) {
						onPause()
					}
					return !prev
				})
			}
		>
			<MaterialCommunityIcons
				name={isPlaying ? 'pause' : 'play'}
				size={24}
				color="black"
			/>
		</TouchableOpacity>
	)
}
