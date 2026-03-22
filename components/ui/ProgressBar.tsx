import { DimensionValue, Text, useColorScheme, View } from 'react-native'

type Props = {
	currentPercentage: number
	height?: DimensionValue
}

function getProgressWidth(percentage: number): DimensionValue {
	if (!Number.isFinite(percentage) || percentage < 0) {
		return '0%'
	}
	if (percentage > 100) {
		return '100%'
	}
	return `${percentage}%`
}

export function ProgressBar({ ...props }: Props) {
	const colorScheme = useColorScheme()
	const isDarkMode = colorScheme === 'dark'

	return (
		<View
			style={{
				width: '100%',
				height: props.height ?? 8,
				overflow: 'hidden',
				backgroundColor: isDarkMode ? 'rgba(1,1,1,0.2)' : 'rgba(255,255,255,0.3)',
				mixBlendMode: isDarkMode ? 'overlay' : 'normal',
			}}
		>
			<View
				style={{
					width: getProgressWidth(props.currentPercentage),
					backgroundColor: isDarkMode ? 'rgba(1,1,1,0.5)' : 'rgba(255,255,255,0.6)',
				}}
			>
				<Text></Text>
			</View>
		</View>
	)
}
