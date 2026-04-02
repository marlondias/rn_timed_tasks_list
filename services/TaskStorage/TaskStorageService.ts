import { Task, TaskModifiableProps } from '@/types/Task'
import { TimerDuration } from '@/types/TimerDuration'
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

	public async modify(taskId: number, changes: TaskModifiableProps): Promise<void> {
		const oldTask = this.get(taskId)

		const durationChanged = changes.duration && changes.duration !== oldTask.duration
		const isRunningChanged =
			changes.isRunning !== undefined && changes.isRunning !== oldTask.isRunning

		if (durationChanged) {
			changes.isRunning = false
			await this.database.deleteTaskRuntimeStates(oldTask.id)
		} else if (isRunningChanged) {
			this.database.insertTaskRuntimeState(taskId, {
				change: changes.isRunning ? 'resumed' : 'paused',
				happenedAt: new Date(),
			})
		}

		await this.database.updateTask(oldTask.id, changes)

		await this.triggerMutation()
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
		return {
			id: Number.NaN,
			createdAt: new Date(),
			title,
			duration,
			isRunning: false,
			runtimeStates: [],
		}
	}
}

export { TaskStorageService }
