import { CustomModal } from '@/components/ui/CustomModal'
import { TaskTimerPicker } from '@/components/ui/TaskTimerPicker'
import { TaskTitleInput } from '@/components/ui/TaskTitleInput'
import { TimerDuration } from '@/types/TimerDuration'
import { isDurationZero } from '@/utils/TimeUtils'
import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

type Props = {
	initialTitle: string
	initialDuration: TimerDuration
	isVisible: boolean
	setIsVisible: (newState: boolean) => void
	onConfirmEditing: (title: string, duration: TimerDuration) => void
}

export function EditTaskModal({
	initialTitle,
	initialDuration,
	isVisible,
	setIsVisible,
	onConfirmEditing,
}: Props) {
	const [title, setTitle] = useState<string>(initialTitle)
	const [duration, setDuration] = useState<TimerDuration>(initialDuration)
	const isValidForEditing: boolean = useMemo(
		() => !!title.trim() && !isDurationZero(duration),
		[title, duration]
	)

	useEffect(() => {
		if (isVisible) {
			setTitle(initialTitle)
			setDuration(initialDuration)
		}
	}, [isVisible])

	return (
		<CustomModal
			isVisible={isVisible}
			setIsVisible={setIsVisible}
			title="Edit a task"
			buttons={[
				{
					title: 'Cancel',
					color: '#b84f4f',
					onPress: () => setIsVisible(false),
				},
				{
					title: 'Edit',
					color: '#47ad46',
					onPress: () => {
						if (!isValidForEditing) return
						onConfirmEditing(title.trim(), duration)
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
