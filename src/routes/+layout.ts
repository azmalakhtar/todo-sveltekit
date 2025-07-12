import { jwt } from "$lib/auth";
import { get } from "svelte/store";
import type { LayoutLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = ({ url }) => {
	const token = get(jwt);
	const publicRoutes = ['/login', '/register'];

	if (!token && !publicRoutes.includes(url.pathname)) {
		throw redirect(302, '/login');
	}
}

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = false;
