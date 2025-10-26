import { supabase } from "./index.ts"

export default async function getTotalVoteCount(): Promise<number> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("voteSum:vote_count.sum()")

	if (error) {
		// deno-lint-ignore no-console
		console.error("error fetching vote count:", error)
		return 0
	}

	console.debug({ data })

	return 0
	// return data.voteSum
}
