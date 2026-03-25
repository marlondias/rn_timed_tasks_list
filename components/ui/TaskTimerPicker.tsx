import { TimerDuration } from '@/types/TimerDuration'
import MaskedView from '@react-native-masked-view/masked-view'
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
			MaskedView={MaskedView}
			styles={{
				theme: isDarkMode ? 'dark' : 'light',
				backgroundColor: 'transparent',
				pickerItem: {
					fontSize: 28,
					opacity: 0.7,
				},
				selectedPickerItem: {
					opacity: 1,
				},
				pickerLabel: {
					fontSize: 20,
					fontWeight: 'bold',
				},
				pickerLabelGap: 6,
				pickerContainer: {
					paddingRight: 18,
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
