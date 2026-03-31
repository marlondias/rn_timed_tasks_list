import { useTheme } from '@react-navigation/native'
import { PropsWithChildren } from 'react'
import {
	Button,
	ButtonProps,
	Modal,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
	const { colors } = useTheme()

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
		>
			<SafeAreaView edges={['bottom']} style={styles.safeContainer}>
				<View
					style={{
						...styles.backdrop,
						...(isDarkMode ? styles.backdropDarkMode : styles.backdropLightMode),
					}}
				>
					<View
						style={{
							...styles.modal,
							backgroundColor: colors.background,
							borderColor: colors.border,
						}}
					>
						<View style={styles.innerContainer}>
							{title && (
								<View style={styles.titleContainer}>
									<Text
										style={{
											...styles.titleText,
											color: colors.text,
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
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
	},
	backdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backdropLightMode: {
		backgroundColor: 'rgba(0,0,0,0.25)',
	},
	backdropDarkMode: {
		backgroundColor: 'rgba(255,255,255,0.25)',
	},
	modal: {
		width: '80%',
		borderRadius: 20,
		padding: 10,
		borderWidth: 1,
		elevation: 6,
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
