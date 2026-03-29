import { Task } from '@/types/Task'
import * as SQLite from 'expo-sqlite'

type TaskRow = {
	id: number
	title: string
	duration_hours: number
	duration_minutes: number
	duration_seconds: number
	remaining_time_in_seconds: number
	is_running: number
	created_at: string
}

const sqliteFilename = 'tasks.db'

export class TaskStorageDatabase {
	private readonly db: SQLite.SQLiteDatabase

	constructor() {
		this.db = SQLite.openDatabaseSync(sqliteFilename)
		this.createTable()
	}

	public async insertTask(task: Task): Promise<void> {
		await this.db.runAsync(
			`INSERT INTO tasks (
				title,
				duration_hours,
				duration_minutes,
				duration_seconds,
				remaining_time_in_seconds,
				is_running,
				created_at
			) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				task.title,
				task.duration.hours,
				task.duration.minutes,
				task.duration.seconds,
				task.remainingTimeInSeconds,
				task.isRunning ? 1 : 0,
				task.createdAt.toISOString(),
			]
		)
	}

	public async updateTask(task: Task): Promise<void> {
		await this.db.runAsync(
			`
				UPDATE tasks
				SET
					title = ?,
					duration_hours = ?,
					duration_minutes = ?,
					duration_seconds = ?,
					remaining_time_in_seconds = ?,
					is_running = ?,
					created_at = ?
				WHERE id = ?
			`,
			[
				task.title,
				task.duration.hours,
				task.duration.minutes,
				task.duration.seconds,
				task.remainingTimeInSeconds,
				task.isRunning ? 1 : 0,
				task.createdAt.toISOString(),
				task.id,
			]
		)
	}

	public async deleteTask(taskId: number): Promise<void> {
		await this.db.runAsync('DELETE FROM tasks WHERE id = ?', [taskId])
	}

	public async getTasks(): Promise<Task[]> {
		const rows = await this.db.getAllAsync<TaskRow>('SELECT * FROM tasks ORDER BY id')

		return rows.map((row) => {
			return {
				id: row.id,
				title: row.title,
				duration: {
					hours: row.duration_hours,
					minutes: row.duration_minutes,
					seconds: row.duration_seconds,
				},
				remainingTimeInSeconds: row.remaining_time_in_seconds,
				isRunning: row.is_running !== 0,
				createdAt: new Date(row.created_at),
			}
		})
	}

	private async createTable() {
		await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        duration_hours INTEGER NOT NULL,
        duration_minutes INTEGER NOT NULL,
        duration_seconds INTEGER NOT NULL,
        remaining_time_in_seconds INTEGER NOT NULL DEFAULT 0,
        is_running INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );
    `)
	}
}
