import { TimerDuration } from '@/types/TimerDuration'
import { LinearGradient } from 'expo-linear-gradient'
import { useColorScheme } from 'react-native'
import { TimerPicker } from 'react-native-timer-picker'

type Props = {
	initialDuration?: TimerDuration
	onChange: (duration: TimerDuration) => void
}

export function TaskTimerPicker({ initialDuration, onChange }: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<TimerPicker
			initialValue={{ ...initialDuration }}
			hideDays
			maximumDays={0}
			maximumHours={12}
			padMinutesWithZero
			padSecondsWithZero
			hourLabel="h"
			minuteLabel="m"
			secondLabel="s"
			LinearGradient={LinearGradient}
			styles={{
				theme: isDarkMode ? 'dark' : 'light',
				pickerItem: {
					fontSize: 28,
				},
				pickerLabel: {
					fontSize: 18,
					fontWeight: 'bold',
				},
				pickerContainer: {
					// backgroundColor: 'transparent',
				},
			}}
			onDurationChange={(value) => {
				onChange({
					hours: value.hours,
					minutes: value.minutes,
					seconds: value.seconds,
				})
			}}
		/>
	)
}
