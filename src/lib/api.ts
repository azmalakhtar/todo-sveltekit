import { get } from "svelte/store";
import { jwt } from "./auth";
import type { Todo, TodoRequest } from "./todo";

const BASE_URL = "https://todo-spring-boot-l5r0.onrender.com"

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

export async function register(email: string, password: string) {
	const res = await fetch(`${BASE_URL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})

	if (res.status !== 201) throw new Error("User already exists. Go to login page");
	const message = await res.text();
	return message;
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
	let url = (date === null || date === "") ? `${BASE_URL}/todos/unscheduled` :
		`${BASE_URL}/todos/date/${date}`;
	const res = await fetch(url, {
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

export async function deleteById(id: number) {
	const res = await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${get(jwt)} `,
		},
	});

	if (res.status != 204) throw new Error("Error getting todo.");
}
