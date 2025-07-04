import { jwt } from "./auth";

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
