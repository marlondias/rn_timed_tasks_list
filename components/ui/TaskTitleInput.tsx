import { useState } from 'react'
import { StyleSheet, TextInput, useColorScheme } from 'react-native'

type Props = {
	initialTitle?: string
	onChange: (title: string) => void
}

const MAX_TITLE_LENGTH = 50

export function TaskTitleInput({ initialTitle, onChange }: Props) {
	const [title, setTitle] = useState<string>(
		initialTitle?.slice(0, MAX_TITLE_LENGTH) ?? ''
	)
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<TextInput
			placeholder="type in the task's title"
			maxLength={MAX_TITLE_LENGTH}
			value={title}
			onChangeText={(text) => {
				setTitle(text)
				onChange(text)
			}}
			placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0,0,0,0.45)'}
			style={{
				...styles.input,
				...(isDarkMode ? styles.inputColorsDarkMode : styles.inputColorsLightMode),
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
	},
	inputColorsLightMode: {
		borderColor: 'rgba(0,0,0,0.3)',
		color: 'black',
	},
	inputColorsDarkMode: {
		borderColor: 'rgba(255, 255, 255, 0.22)',
		color: 'white',
	},
})
