<script lang="ts">
	import { goto } from "$app/navigation";
	import { login } from "$lib/api";

	let email = $state("");
	let password = $state("");

	let error = $state("");
	let loggedIn = $state(false);

	async function doLogin() {
		if (email == "" || password == "") {
			error = "Enter both email and password.";
			return;
		}
		login(email, password)
			.then(() => {
				loggedIn = true;
				error = "";
				setTimeout(() => {
					goto("/", { replaceState: true });
				}, 2000);
			})
			.catch((e: Error) => (error = e.message));
	}
</script>

<div class="m-5 border border-success">
	<p class="h3 bg-success text-bg-success p-2">Login</p>
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
		{#if loggedIn}
			<div class="alert alert-success">
				<p>Logged In. Redirecting to home page.</p>
			</div>
		{/if}

		<button
			class="btn btn-success w-100"
			style="max-width: 700px;"
			onclick={doLogin}>Sign Up</button
		>
	</div>
</div>
