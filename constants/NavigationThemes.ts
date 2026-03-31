import {
	DarkTheme as NativeDarkTheme,
	DefaultTheme as NativeDefaultTheme,
	Theme,
} from '@react-navigation/native'

export const LightTheme: Theme = {
	...NativeDefaultTheme,
	colors: {
		background: '#c4ebed',
		border: '#74b2b6',
		card: '#87cbcd',
		text: '#0a3931',
		primary: '#7EDAB9',
		notification: '#edcf3c',
	},
}

export const DarkTheme: Theme = {
	...NativeDarkTheme,
	colors: {
		background: '#063339',
		border: '#19363a',
		card: '#174B4F',
		text: '#e1fffc',
		primary: LightTheme.colors.primary,
		notification: LightTheme.colors.notification,
	},
}
