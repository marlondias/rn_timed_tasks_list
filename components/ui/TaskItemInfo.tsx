import { TimerDuration } from '@/types/TimerDuration'
import { convertSecondsToDuration } from '@/utils/TimeUtils'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'

type Props = {
	title: string
	duration: TimerDuration
	remainingTimeInSeconds: number
}

const getEstimatedTimeText = (timeInSeconds: number): string => {
	const { hours, minutes, seconds } = convertSecondsToDuration(timeInSeconds)

	return [
		hours > 0 ? `${hours}h` : '',
		minutes > 0 ? `${minutes}m` : '',
		seconds > 0 ? `${seconds}s` : '0s',
	].join(' ')
}

const getEstimatedTimeTextFromDuration = (duration: TimerDuration): string => {
	return [
		duration.hours > 0 ? `${duration.hours}h` : '',
		duration.minutes > 0 ? `${duration.minutes}m` : '',
		duration.seconds > 0 ? `${duration.seconds}s` : '0s',
	].join(' ')
}

export function TaskItemInfo({ title, duration, remainingTimeInSeconds }: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<View style={styles.infoWrapper}>
			<Text
				style={{
					...styles.titleText,
					...(isDarkMode ? styles.textColorDarkMode : styles.textColorLightMode),
				}}
			>
				{title}
			</Text>
			<Text
				style={{
					...styles.subText,
					...(isDarkMode ? styles.textColorDarkMode : styles.textColorLightMode),
				}}
			>
				Duration: {getEstimatedTimeTextFromDuration(duration)}
			</Text>
			<Text
				style={{
					...styles.subText,
					...(isDarkMode ? styles.textColorDarkMode : styles.textColorLightMode),
				}}
			>
				Remaining: {getEstimatedTimeText(remainingTimeInSeconds)}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	infoWrapper: {
		flex: 1,
		flexShrink: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	titleText: {
		fontSize: 16,
		fontWeight: '600',
	},
	subText: {
		fontSize: 12,
		marginTop: 2,
	},
	textColorLightMode: {
		mixBlendMode: 'multiply',
		color: 'rgba(0, 0, 0, 0.65)',
	},
	textColorDarkMode: {
		mixBlendMode: 'overlay',
		color: 'rgba(255, 255, 255, 0.9)',
	},
})
