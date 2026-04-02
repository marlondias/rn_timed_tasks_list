import { Task, TaskModifiableProps } from '@/types/Task'
import { StateChange, TaskRuntimeState } from '@/types/TaskRuntimeState'
import * as SQLite from 'expo-sqlite'

type TaskRow = {
	id: number
	title: string
	duration_hours: number
	duration_minutes: number
	duration_seconds: number
	created_at: string
}

type TaskRuntimeStateRow = {
	id: number
	task_id: number
	change_type: string
	created_at: string
}

const sqliteFilename = 'tasks.db'

export class TaskStorageDatabase {
	private readonly db: SQLite.SQLiteDatabase

	constructor() {
		this.db = SQLite.openDatabaseSync(sqliteFilename)
		this.createTables()
	}

	public async insertTask(task: Task): Promise<void> {
		await this.db.runAsync(
			`INSERT INTO tasks (
				title,
				duration_hours,
				duration_minutes,
				duration_seconds,
				created_at
			) VALUES (?, ?, ?, ?, ?)`,
			[
				task.title,
				task.duration.hours,
				task.duration.minutes,
				task.duration.seconds,
				task.createdAt.toISOString(),
			]
		)
	}

	public async insertTaskRuntimeState(
		taskId: number,
		runtimeState: TaskRuntimeState
	): Promise<void> {
		await this.db.runAsync(
			`INSERT INTO task_runtime_states (
				task_id,
				change_type,
				created_at
			) VALUES (?, ?, ?)`,
			[taskId, runtimeState.change, runtimeState.happenedAt.toISOString()]
		)
	}

	public async updateTask(taskId: number, changes: TaskModifiableProps): Promise<void> {
		await this.db.runAsync(
			`
				UPDATE tasks
				SET
					title = COALESCE(?, title),
					duration_hours = COALESCE(?, duration_hours),
					duration_minutes = COALESCE(?, duration_minutes),
					duration_seconds = COALESCE(?, duration_seconds)
				WHERE id = ?
			`,
			[
				changes.title ?? null,
				changes.duration?.hours ?? null,
				changes.duration?.minutes ?? null,
				changes.duration?.seconds ?? null,
				taskId,
			]
		)
	}

	public async deleteTask(taskId: number): Promise<void> {
		await this.db.runAsync('DELETE FROM tasks WHERE id = ?', [taskId])
	}

	public async deleteTaskRuntimeStates(taskId: number): Promise<void> {
		await this.db.runAsync('DELETE FROM task_runtime_states WHERE task_id = ?', [taskId])
	}

	public async getTasks(): Promise<Task[]> {
		const taskRows = await this.db.getAllAsync<TaskRow>(`
			SELECT *
			FROM tasks
			ORDER BY created_at
		`)

		const runtimeStateRows = await this.db.getAllAsync<TaskRuntimeStateRow>(`
			SELECT *
			FROM task_runtime_states
			ORDER BY created_at
		`)

		return taskRows.map((taskRow): Task => {
			const runtimeStates = runtimeStateRows
				.filter((row) => row.task_id === taskRow.id)
				.map((row): TaskRuntimeState => {
					return {
						change: row.change_type as StateChange,
						happenedAt: new Date(row.created_at),
					}
				})

			const lastStateChange = runtimeStates.at(-1)
			const isRunning = lastStateChange?.change === 'resumed'

			return {
				id: taskRow.id,
				createdAt: new Date(taskRow.created_at),
				title: taskRow.title,
				duration: {
					hours: taskRow.duration_hours,
					minutes: taskRow.duration_minutes,
					seconds: taskRow.duration_seconds,
				},
				isRunning,
				runtimeStates,
			}
		})
	}

	private async createTables() {
		await this.db.execAsync(`
			PRAGMA foreign_keys = ON;

			CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        duration_hours INTEGER NOT NULL,
        duration_minutes INTEGER NOT NULL,
        duration_seconds INTEGER NOT NULL,
        created_at TEXT NOT NULL
      );

			CREATE TABLE IF NOT EXISTS task_runtime_states (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        change_type TEXT NOT NULL,
        created_at TEXT NOT NULL,
				FOREIGN KEY (task_id) REFERENCES tasks(id)
					ON UPDATE CASCADE
					ON DELETE CASCADE
      );
    `)
	}
}
