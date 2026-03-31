import { InputLimits } from '@/constants/InputLimits'
import { useTheme } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, TextInput, useColorScheme } from 'react-native'

type Props = {
	initialTitle?: string
	onChange: (title: string) => void
}

export function TaskTitleInput({ initialTitle, onChange }: Props) {
	const isDarkMode = useColorScheme() === 'dark'
	const { colors } = useTheme()
	const [title, setTitle] = useState<string>(
		initialTitle?.slice(0, InputLimits.TaskTitleMaxLength) ?? ''
	)

	return (
		<TextInput
			placeholder="type in the task's title"
			maxLength={InputLimits.TaskTitleMaxLength}
			value={title}
			onChangeText={(text) => {
				setTitle(text)
				onChange(text)
			}}
			placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0,0,0,0.35)'}
			style={{
				...styles.input,
				color: colors.text,
				borderColor: colors.border,
			}}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		fontSize: 18,
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 12,
		paddingHorizontal: 10,
		marginHorizontal: 1,
	},
})
