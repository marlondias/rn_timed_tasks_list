import { TaskStorageService } from '@/services/TaskStorage/TaskStorageService'
import { Task } from '@/types/Task'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { TaskStorageContext } from './TaskStorageContext'

export function TaskStorageProvider({ children }: PropsWithChildren) {
	const serviceInstance = useRef(new TaskStorageService())
	const [tasks, setTasks] = useState<Task[]>([])

	serviceInstance.current.onDataMutation = () => {
		setTasks(serviceInstance.current.getAll())
	}

	useEffect(() => {
		console.log(
			`TaskStorageProvider: Updated tasks array. IDs=${tasks.map((task) => task.id).join(', ')}`
		)
	}, [tasks])

	return (
		<TaskStorageContext.Provider
			value={{ taskStorageService: serviceInstance.current, tasks }}
		>
			{children}
		</TaskStorageContext.Provider>
	)
}
