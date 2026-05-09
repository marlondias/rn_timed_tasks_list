import { I18NContext } from '@/contexts/I18N/I18NContext'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import pt from '@/locales/pt.json'
import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { PropsWithChildren, useEffect, useState } from 'react'
import { initReactI18next, useTranslation } from 'react-i18next'

const translationResources = {
	en: { translation: en },
	es: { translation: es },
	pt: { translation: pt },
	fr: { translation: fr },
}

const supportedLanguages = new Set(Object.keys(translationResources))
const defaultLanguage = 'es'

i18n.use(initReactI18next).init({
	resources: translationResources,
	lng: defaultLanguage,
	fallbackLng: defaultLanguage,
	interpolation: {
		escapeValue: false,
	},
})

export function I18NProvider({ children }: PropsWithChildren) {
	const { i18n } = useTranslation()
	const [currentLanguage, setCurrentLanguage] = useState<string>('en')

	useEffect(() => {
		const deviceLanguages = getLocales()
			.map((locale) => locale.languageCode || '')
			.filter((language) => supportedLanguages.has(language))

		i18n.changeLanguage(deviceLanguages[0])

		setCurrentLanguage(deviceLanguages.length > 0 ? deviceLanguages[0] : 'en')
	}, [])

	return (
		<I18NContext.Provider
			value={{ supportedLanguages, getCurrentLanguage: () => i18n.language }}
		>
			{children}
		</I18NContext.Provider>
	)
}
