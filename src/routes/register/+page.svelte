<script lang="ts">
	import { goto } from "$app/navigation";
	import { register } from "$lib/api";

	let email = $state("");
	let password = $state("");

	let error = $state("");
	let success = $state("");

	async function registerUser() {
		if (email == "" || password == "") {
			error = "Enter both email and password.";
			return;
		}
		register(email, password)
			.then((msg) => {
				success = msg;
				error = "";
				setTimeout(() => {
					goto("/login", { replaceState: true });
				}, 2000);
			})
			.catch((e: Error) => (error = e.message));
	}
</script>

<div class="m-5 border border-danger">
	<p class="h3 bg-danger text-bg-danger p-2">Register</p>
	<div class="p-5 m-auto" style="max-width: 700px;">
		<input
			class="d-block w-100 mb-2"
			type="email"
			placeholder="Email"
			bind:value={email}
		/>
		<input
			class="d-block w-100 mb-2"
			type="password"
			placeholder="Password"
			bind:value={password}
		/>

		{#if error}
			<div class="alert alert-danger">
				<p>{error}</p>
			</div>
		{/if}
		{#if success}
			<div class="alert alert-success">
				<p>{success}.</p>
				<p>Redirecting you to login page</p>
			</div>
		{/if}

		<button
			class="btn btn-danger w-100"
			style="max-width: 700px;"
			onclick={registerUser}>Sign Up</button
		>
	</div>
</div>
