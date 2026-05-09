import { I18NContext } from '@/contexts/I18N/I18NContext'
import { getLocales } from 'expo-localization'
import { PropsWithChildren, useEffect, useState } from 'react'

const supportedLanguages = new Set(['en', 'es', 'pt', 'fr'])

export function I18NProvider({ children }: PropsWithChildren) {
	const [currentLanguage, setCurrentLanguage] = useState<string>('en')

	useEffect(() => {
		const deviceLanguages = getLocales()
			.map((locale) => locale.languageCode || '')
			.filter((language) => supportedLanguages.has(language))

		setCurrentLanguage(deviceLanguages.length > 0 ? deviceLanguages[0] : 'en')
	}, [])

	return (
		<I18NContext.Provider value={{ supportedLanguages, currentLanguage }}>
			{children}
		</I18NContext.Provider>
	)
}
