import { jwt } from "$lib/auth";
import { get } from "svelte/store";
import type { LayoutLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = ({ url }) => {
	const token = get(jwt);
	const publicRoutes = ['/login'];

	if (!token && !publicRoutes.includes(url.pathname)) {
		throw redirect(302, '/login');
	}
}
