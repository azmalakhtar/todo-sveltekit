<script lang="ts">
	import { login } from "$lib/api";
	import { jwt } from "$lib/auth";
	import { get } from "svelte/store";

	let email = "";
	let password = "";

	let token = "";
	let error = "";

	async function doLogin() {
		login(email, password)
			.then(() => {
				alert("logged in");
				token = get(jwt) ?? "";
				error = "";
			})
			.catch((e: Error) => (error = e.message));
	}
</script>

<input type="email" placeholder="Email" bind:value={email} />
<input type="password" placeholder="Password" bind:value={password} />

<button on:click={doLogin}>Login</button>
<a href="/">Home</a>

{#if token}
	<p style="color: green;">{token}</p>
{/if}
{#if error}
	<p style="color: red;">{error}</p>
{/if}
