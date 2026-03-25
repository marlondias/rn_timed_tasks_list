import { TaskStorageService } from '@/services/TaskStorage/TaskStorageService'
import { createContext, useContext } from 'react'

type TaskStorageContextType = {
	taskStorageService: TaskStorageService
}

const TaskStorageContext = createContext<TaskStorageContextType | null>(null)

const useTaskStorage = () => {
	const context = useContext(TaskStorageContext)

	if (!context)
		throw new Error('"useTaskStorage" must be used within its context provider.')

	return context
}

export { TaskStorageContext, useTaskStorage }
