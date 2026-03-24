import { PropsWithChildren } from 'react'
import {
	Button,
	ButtonProps,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native'

type Props = {
	isVisible: boolean
	setIsVisible: (newState: boolean) => void
	title?: string
	buttons?: ButtonProps[]
}

export function CustomModal({
	children,
	isVisible,
	setIsVisible,
	title,
	buttons,
}: Props & PropsWithChildren) {
	const isDarkMode = useColorScheme() === 'dark'

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
		>
			<Pressable
				style={{
					...styles.backdrop,
					...(isDarkMode ? styles.backdropDarkMode : styles.backdropLightMode),
				}}
				onPress={() => setIsVisible(false)}
			>
				<Pressable
					style={{
						...styles.modal,
						...(isDarkMode ? styles.modalDarkMode : styles.modalLightMode),
					}}
				>
					<View style={styles.innerContainer}>
						{title && (
							<View style={styles.titleContainer}>
								<Text
									style={{
										...styles.titleText,
										...(isDarkMode
											? styles.titleTextDarkMode
											: styles.titleTextLightMode),
									}}
								>
									{title}
								</Text>
							</View>
						)}
						{children}
						{buttons && (
							<View style={styles.buttonsContainer}>
								{buttons.map((button, index) => {
									return (
										<View key={index} style={styles.button}>
											<Button {...button} />
										</View>
									)
								})}
							</View>
						)}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backdropLightMode: {
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	backdropDarkMode: {
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	modal: {
		borderRadius: 20,
		padding: 10,
	},
	modalLightMode: {
		backgroundColor: 'white',
	},
	modalDarkMode: {
		backgroundColor: 'black',
	},
	innerContainer: {
		borderRadius: 10,
		overflow: 'hidden',
	},
	titleContainer: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	titleText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
	titleTextLightMode: {
		color: 'rgba(0,0,0,0.55)',
	},
	titleTextDarkMode: {
		color: 'rgba(255,255,255,0.5)',
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		gap: 5,
		marginTop: 10,
	},
	button: {
		flexGrow: 1,
	},
})
