import { CustomModal } from '@/components/ui/CustomModal'
import { TaskTimerPicker } from '@/components/ui/TaskTimerPicker'
import { TaskTitleInput } from '@/components/ui/TaskTitleInput'
import { getZeroDuration, TimerDuration } from '@/types/TimerDuration'
import { isDurationZero } from '@/utils/TimeUtils'
import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

type Props = {
	isVisible: boolean
	setIsVisible: (newState: boolean) => void
	onConfirmCreation: (title: string, duration: TimerDuration) => void
}

export function CreateTaskModal({ isVisible, setIsVisible, onConfirmCreation }: Props) {
	const [title, setTitle] = useState<string>('')
	const [duration, setDuration] = useState<TimerDuration>(getZeroDuration())
	const isValidForCreation: boolean = useMemo(
		() => !!title.trim() && !isDurationZero(duration),
		[title, duration]
	)

	useEffect(() => {
		if (isVisible) return
		setTitle('')
		setDuration(getZeroDuration())
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
