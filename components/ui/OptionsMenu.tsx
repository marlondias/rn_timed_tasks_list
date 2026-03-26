import { OptionsButton } from '@/components/ui/OptionsButton'
import { MenuAction, MenuView } from '@react-native-menu/menu'
import { useCallback } from 'react'
import { useColorScheme } from 'react-native'

type Props = {
	onMenuOpen?: () => void
	onMenuClose?: () => void
	onPressEdit?: () => void
	onPressDuplicate?: () => void
	onPressRemove?: () => void
}

const MENU_ID_FOR_EDIT = 'edit'
const MENU_ID_FOR_DUPLICATE = 'duplicate'
const MENU_ID_FOR_REMOVE = 'remove'

const menuActions: MenuAction[] = [
	{
		id: MENU_ID_FOR_EDIT,
		title: 'Edit',
	},
	{
		id: MENU_ID_FOR_DUPLICATE,
		title: 'Duplicate',
	},
	{
		id: MENU_ID_FOR_REMOVE,
		title: 'Remove',
		attributes: {
			destructive: true,
		},
	},
]

export function OptionsMenu({
	onMenuOpen,
	onMenuClose,
	onPressEdit,
	onPressDuplicate,
	onPressRemove,
}: Props) {
	const isDarkMode = useColorScheme() === 'dark'

	const onAction = useCallback(
		(actionId: string): void => {
			if (actionId === MENU_ID_FOR_EDIT && onPressEdit) {
				onPressEdit()
			}

			if (actionId === MENU_ID_FOR_DUPLICATE && onPressDuplicate) {
				onPressDuplicate()
			}

			if (actionId === MENU_ID_FOR_REMOVE && onPressRemove) {
				onPressRemove()
			}
		},
		[onPressEdit, onPressDuplicate, onPressRemove]
	)

	return (
		<MenuView
			title="Task options"
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
