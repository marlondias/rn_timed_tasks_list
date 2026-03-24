import { Task } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'

class TaskStorageService {
	private readonly tasks: Map<number, Task> = new Map()
	private orderedTaskIds: number[] = []
	private nextId: number = 1

	public add(title: string, duration: TimerDuration): void {
		const newTask: Task = {
			title,
			duration,
			id: this.getNextId(),
			createdAt: new Date(),
			isRunning: false,
			remainingTimeInSeconds: 0,
		}

		this.tasks.set(newTask.id, newTask)
		this.orderedTaskIds.push(newTask.id)
	}

	public remove(taskId: number): void {
		this.tasks.delete(taskId)
		this.orderedTaskIds = this.orderedTaskIds.filter((id) => id !== taskId)
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

	private getNextId(): number {
		return this.nextId++
	}
}

export { TaskStorageService }
