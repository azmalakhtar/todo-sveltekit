import { get } from "svelte/store";
import { jwt } from "./auth";
import type { Todo, TodoRequest } from "./todo";

const BASE_URL = "http://localhost:8080";

export async function login(email: string, password: string) {
	const res = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})

	if (res.status !== 200) throw new Error("Invalid username or password.");

	const token = await res.text();
	jwt.set(token);
}

export async function create(todo: TodoRequest): Promise<Todo> {
	const res = await fetch(`${BASE_URL}/todos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${get(jwt)}`
		},
		body: JSON.stringify(todo),
	});

	if (res.status != 201) throw new Error("Error creating todo.");

	const createdTodo: Todo = await res.json();
	return createdTodo;
}

export async function getAll(): Promise<Todo[]> {
	const res = await fetch(`${BASE_URL}/todos`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${get(jwt)}`,
		},
	});

	if (res.status != 200) throw new Error("Error Getting Todos.");

	const todos: Todo[] = await res.json();
	return todos;
}

export async function getOfDueDate(date: string): Promise<Todo[]> {
	const res = await fetch(`${BASE_URL}/todos/date/${date}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${get(jwt)}`,
		},
	});

	if (res.status != 200) throw new Error("Error Getting Todos.");

	const todos: Todo[] = await res.json();
	return todos;
}

export async function getById(id: number): Promise<Todo> {
	const res = await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${get(jwt)}`,
		},
	});

	if (res.status != 200) throw new Error("Error getting todo.");

	const todo: Todo = await res.json();
	return todo;
}

export async function update(id: number, todo: TodoRequest): Promise<Todo> {
	const res = await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${get(jwt)} `,
		},
		body: JSON.stringify(todo)
	});

	if (res.status != 200) throw new Error("Error getting todo.");

	const updatedTodo: Todo = await res.json();
	return updatedTodo;

}
