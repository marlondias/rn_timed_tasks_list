import { Task, TaskModifiableProps } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'
import { convertDurationToSeconds } from '@/utils/TimeUtils'
import { TaskStorageDatabase } from './TaskStorageDatabase'

class TaskStorageService {
	private readonly database = new TaskStorageDatabase()
	private tasks: Task[] = []
	public onDataMutation?: () => void

	public async add(title: string, duration: TimerDuration): Promise<void> {
		const newTask = this.getNewTask(title, duration)
		await this.database.insertTask(newTask).then(() => this.triggerMutation())
	}

	public async duplicate(taskId: number): Promise<void> {
		const existingTask = this.get(taskId)
		const newTask = this.getNewTask(existingTask.title, existingTask.duration)
		await this.database.insertTask(newTask).then(() => this.triggerMutation())
	}

	public async modify(taskId: number, modifiedTask: TaskModifiableProps): Promise<void> {
		const oldTask = this.get(taskId)
		const newTask: Task = { ...oldTask }

		if (modifiedTask.title !== undefined) {
			newTask.title = modifiedTask.title
		}
		if (modifiedTask.duration !== undefined) {
			newTask.duration = modifiedTask.duration
		}
		if (modifiedTask.isRunning !== undefined) {
			newTask.isRunning = modifiedTask.isRunning
		}
		if (modifiedTask.remainingTimeInSeconds !== undefined) {
			newTask.remainingTimeInSeconds = modifiedTask.remainingTimeInSeconds
		}

		await this.database.updateTask(newTask).then(() => this.triggerMutation())
	}

	public async remove(taskId: number): Promise<void> {
		await this.database.deleteTask(taskId).then(() => this.triggerMutation())
	}

	public get(taskId: number): Task {
		const filteredTasks = this.tasks.filter((task) => task.id === taskId)
		if (filteredTasks.length < 1) {
			throw new Error(`No task found with ID ${taskId}`)
		}
		return filteredTasks[0]
	}

	public getAll(): Task[] {
		return [...this.tasks]
	}

	public async triggerMutation(): Promise<void> {
		this.tasks = await this.database.getTasks()

		if (this.onDataMutation) {
			this.onDataMutation()
		}
	}

	private getNewTask(title: string, duration: TimerDuration): Task {
		const durationInSeconds = convertDurationToSeconds(duration)

		return {
			id: Number.NaN,
			title,
			duration,
			createdAt: new Date(),
			isRunning: false,
			remainingTimeInSeconds: durationInSeconds,
		}
	}
}

export { TaskStorageService }
