import { DateTime } from "luxon"
import { supabase } from "../index.ts"
import type { Table } from "../type/table.ts"

const DOG_QUERY_TIME_THRESHOLD_MINUTES = 10

type MinimalDog = Pick<Table["dog_history"]["Row"], "imageUrl" | "voteCount">

export default async function getLastDog(): Promise<MinimalDog | null> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("voteCount:vote_count, imageUrl:image_url")
		.or(`updated_at.lt.${
			DateTime.utc().minus({ minutes: DOG_QUERY_TIME_THRESHOLD_MINUTES })
				.toISO()
		},vote_count.eq.0`)
		.order("vote_count", { ascending: true })
		.order("updated_at", { ascending: true })
		.limit(1)
		.single()
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return null
	}
	return data
}
