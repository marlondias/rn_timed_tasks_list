import { CustomModal } from '@/components/ui/CustomModal'
import { TaskTimerPicker } from '@/components/ui/TaskTimerPicker'
import { TaskTitleInput } from '@/components/ui/TaskTitleInput'
import { TimerDuration } from '@/types/TimerDuration'
import { useState } from 'react'
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

	return (
		<CustomModal
			isVisible={isVisible}
			setIsVisible={setIsVisible}
			title="Create a task"
			buttons={[
				{
					title: 'Create',
					onPress: () => {
						onConfirmCreation(title, duration)
						setIsVisible(false)
					},
				},
			]}
		>
			<View>
				<TaskTitleInput onChange={setTitle} />
				<TaskTimerPicker onChange={setDuration} />
			</View>
		</CustomModal>
	)
}
