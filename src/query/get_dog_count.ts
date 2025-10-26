import { supabase } from "./index.ts"

export default async function getDogCount(): Promise<number> {
	const { count, error } = await supabase
		.from("dog_history")
		.select("image_url", { count: "exact", head: true })
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return 0
	}
	return count ?? 0
}
