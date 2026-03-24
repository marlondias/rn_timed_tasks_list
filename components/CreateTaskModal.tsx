import { CustomModal } from '@/components/ui/CustomModal'
import { TaskTimerPicker } from '@/components/ui/TaskTimerPicker'
import { TaskTitleInput } from '@/components/ui/TaskTitleInput'
import { TimerDuration } from '@/types/TimerDuration'
import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

type Props = {
	isVisible: boolean
	setIsVisible: (newState: boolean) => void
	onConfirmCreation: (title: string, duration: TimerDuration) => void
}

export function CreateTaskModal({ isVisible, setIsVisible, onConfirmCreation }: Props) {
	const [title, setTitle] = useState<string>('')
	const [duration, setDuration] = useState<TimerDuration>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	})
	const isValidForCreation: boolean = useMemo(
		() => !!title.trim() && duration.hours + duration.minutes + duration.seconds > 0,
		[title, duration]
	)

	useEffect(() => {
		if (isVisible) return
		setTitle('')
		setDuration({ hours: 0, minutes: 0, seconds: 0 })
	}, [isVisible])

	return (
		<CustomModal
			isVisible={isVisible}
			setIsVisible={setIsVisible}
			title="Create a task"
			buttons={[
				{
					title: 'Cancel',
					color: '#b84f4f',
					onPress: () => setIsVisible(false),
				},
				{
					title: 'Create',
					color: '#47ad46',
					onPress: () => {
						if (!isValidForCreation) return
						onConfirmCreation(title.trim(), duration)
						setIsVisible(false)
					},
				},
			]}
		>
			<View>
				<TaskTitleInput initialTitle={title} onChange={setTitle} />
				<TaskTimerPicker initialDuration={duration} onChange={setDuration} />
			</View>
		</CustomModal>
	)
}
