import { OptionsMenu } from '@/components/ui/OptionsMenu'
import { PlayPauseRestartButton } from '@/components/ui/PlayPauseRestartButton'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { TimerDuration } from '@/types/TimerDuration'
import { convertDurationToSeconds } from '@/utils/TimeUtils'
import React from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { TaskItemInfo } from './TaskItemInfo'

type Props = {
	title: string
	duration: TimerDuration
	remainingTimeInSeconds: number
	isRunning: boolean
	isCompleted: boolean
	onPressPlay: () => void
	onPressPause: () => void
	onPressRestart: () => void
	onPressEdit: () => void
	onPressDuplicate: () => void
	onPressRemove: () => void
}

export function TaskItemCard({
	onPressPlay,
	onPressPause,
	onPressRestart,
	onPressEdit,
	onPressDuplicate,
	onPressRemove,
	...props
}: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<View
			style={{
				...styles.container,
				...(isDarkMode ? styles.containerDarkMode : styles.containerLightMode),
			}}
		>
			<View style={styles.content}>
				<TaskItemInfo
					title={props.title}
					duration={props.duration}
					remainingTimeInSeconds={props.remainingTimeInSeconds}
				/>
				<View style={styles.controlsWrapper}>
					<PlayPauseRestartButton
						isCompleted={props.isCompleted}
						isPlaying={props.isRunning}
						onPressPlay={onPressPlay}
						onPressPause={onPressPause}
						onPressRestart={onPressRestart}
					/>

					<OptionsMenu
						allowEdit={!props.isRunning}
						onPressEdit={onPressEdit}
						onPressDuplicate={onPressDuplicate}
						onPressRemove={onPressRemove}
					/>
				</View>
			</View>
			<ProgressBar
				currentValue={props.remainingTimeInSeconds}
				totalValue={convertDurationToSeconds(props.duration)}
				height={5}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 10,
		overflow: 'hidden',
		marginVertical: 8,
	},
	containerLightMode: {
		backgroundColor: 'rgb(199, 174, 62)',
		elevation: 2,
	},
	containerDarkMode: {
		backgroundColor: 'rgb(167, 145, 49)',
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		gap: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	controlsWrapper: {
		flexShrink: 0,
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 15,
	},
})
