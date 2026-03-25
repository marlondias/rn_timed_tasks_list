import { TaskStorageService } from '@/services/TaskStorage/TaskStorageService'
import { PropsWithChildren, useRef } from 'react'
import { TaskStorageContext } from './TaskStorageContext'

export function TaskStorageProvider({ children }: PropsWithChildren) {
	const serviceInstance = useRef(new TaskStorageService())

	return (
		<TaskStorageContext.Provider value={{ taskStorageService: serviceInstance.current }}>
			{children}
		</TaskStorageContext.Provider>
	)
}
