import { Task } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'

class TaskStorageService {
	private readonly tasks: Map<number, Task> = new Map()
	private orderedTaskIds: number[] = []
	private nextId: number = 1
	public onDataMutation?: () => void

	public add(title: string, duration: TimerDuration): void {
		const newTask = this.getNewTask(title, duration)
		this.tasks.set(newTask.id, newTask)
		this.orderedTaskIds.push(newTask.id)
		this.triggerMutation()
	}

	public duplicate(taskId: number): void {
		const existingTask = this.get(taskId)
		const newTask = this.getNewTask(existingTask.title, existingTask.duration)
		this.tasks.set(newTask.id, newTask)
		this.orderedTaskIds.push(newTask.id) //FIXME
		this.triggerMutation()
	}

	public remove(taskId: number): void {
		this.tasks.delete(taskId)
		this.orderedTaskIds = this.orderedTaskIds.filter((id) => id !== taskId)
		this.triggerMutation()
	}

	public get(taskId: number): Task {
		const task = this.tasks.get(taskId)
		if (!task) {
			throw new Error(`No task found with ID ${taskId}`)
		}
		return task
	}

	public getAll(): Task[] {
		return this.orderedTaskIds.map((id) => this.get(id))
	}

	private getNewTask(title: string, duration: TimerDuration): Task {
		return {
			id: this.nextId++,
			title,
			duration,
			createdAt: new Date(),
			isRunning: false,
			remainingTimeInSeconds: 0,
		}
	}

	private triggerMutation(): void {
		if (this.onDataMutation) {
			this.onDataMutation()
		}
	}
}

export { TaskStorageService }
