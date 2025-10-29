import { supabase } from "./index.ts"

export default async function getTotalVoteCount(): Promise<number> {
	const { data, error } = await supabase
		.from("total_vote_count")
		.select("totalVoteCount:total_vote_count")
		.single()

	if (error) {
		// deno-lint-ignore no-console
		console.error("error getting total vote count:", error)
		return 0
	}

	return data.totalVoteCount ?? 0
}
