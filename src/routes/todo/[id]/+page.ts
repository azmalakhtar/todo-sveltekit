import { getById } from "$lib/api";
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {
	const id = Number(params.id);
	const todo = await getById(id)
	return {
		todo
	}
}
