import { OptionsButton } from '@/components/ui/OptionsButton'
import { MenuAction, MenuView } from '@react-native-menu/menu'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'react-native'

type Props = {
	allowEdit: boolean
	onMenuOpen?: () => void
	onMenuClose?: () => void
	onPressEdit?: () => void
	onPressDuplicate?: () => void
	onPressRemove?: () => void
}

const MENU_ID_FOR_EDIT = 'edit'
const MENU_ID_FOR_DUPLICATE = 'duplicate'
const MENU_ID_FOR_REMOVE = 'remove'

export function OptionsMenu({
	allowEdit,
	onMenuOpen,
	onMenuClose,
	onPressEdit,
	onPressDuplicate,
	onPressRemove,
}: Props) {
	const { t } = useTranslation()
	const isDarkMode = useColorScheme() === 'dark'

	const menuActions: MenuAction[] = useMemo(() => {
		return [
			{
				id: MENU_ID_FOR_EDIT,
				title: t('TASK_OPTIONS_MENU_EDIT_LABEL'),
				attributes: {
					disabled: !allowEdit,
				},
			},
			{
				id: MENU_ID_FOR_DUPLICATE,
				title: t('TASK_OPTIONS_MENU_DUPLICATE_LABEL'),
			},
			{
				id: MENU_ID_FOR_REMOVE,
				title: t('TASK_OPTIONS_MENU_DELETE_LABEL'),
				attributes: {
					destructive: true,
				},
			},
		]
	}, [allowEdit, t])

	const onAction = useCallback(
		(actionId: string): void => {
			if (actionId === MENU_ID_FOR_EDIT && onPressEdit && allowEdit) {
				onPressEdit()
			}

			if (actionId === MENU_ID_FOR_DUPLICATE && onPressDuplicate) {
				onPressDuplicate()
			}

			if (actionId === MENU_ID_FOR_REMOVE && onPressRemove) {
				onPressRemove()
			}
		},
		[allowEdit, onPressEdit, onPressDuplicate, onPressRemove]
	)

	return (
		<MenuView
			title={t('TASK_OPTIONS_MENU_TITLE')}
			themeVariant={isDarkMode ? 'dark' : 'light'}
			isAnchoredToRight={true}
			actions={menuActions}
			onOpenMenu={onMenuOpen}
			onCloseMenu={onMenuClose}
			onPressAction={({ nativeEvent }) => onAction(nativeEvent.event)}
		>
			<OptionsButton />
		</MenuView>
	)
}
