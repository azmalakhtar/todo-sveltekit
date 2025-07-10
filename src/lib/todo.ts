export interface TodoRequest {
	title: string,
	description: string,
	dueDate: string,
	isDone: boolean,
	isUrgent: boolean,
	isImportant: boolean
}

export interface Todo extends TodoRequest {
	id: number
}
