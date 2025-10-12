import { supabase } from "./index.ts"

const dogApiUrl = "https://dog.ceo/api/breeds/image/random"

export default async function getNewVote(): Promise<string[]> {
	const [dogData, topDogVoteCount] = await Promise.all([
		getLastTwoDog(),
		getTopDogVoteCount(),
	])

	const res = dogData.length ? [dogData[0]] : []

	let tries = 0
	while (res.length < 2 && tries < 3) {
		tries++

		const lastDog = dogData.at(0)
		const fetchNew = !lastDog || topDogVoteCount === 0 ||
			(lastDog.voteCount / topDogVoteCount) > 0.5 // FIXME: use random number generator

		if (fetchNew) {
			const newDogImageUrl = await getNewDogFromApi()
			if (!newDogImageUrl) {
				continue
			}
		}
	}

	return res.length === 2 ? res.map((d) => d.imageUrl) : []
}

async function getLastTwoDog() {
	const { data: dogData, error } = await supabase
		.from("dog_history")
		.select("voteCount:vote_count, imageUrl:image_url")
		.order("vote_count", { ascending: true })
		.limit(2)
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return []
	}
	return dogData ?? []
}

async function getTopDogVoteCount(): Promise<number> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("voteCount:vote_count")
		.order("vote_count", { ascending: false })
		.limit(1)
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return 0
	}
	return data?.[0]?.voteCount ?? 0
}

async function getNewDogFromApi(): Promise<string | null> {
	try {
		const response = await fetch(dogApiUrl)
		const data = await response.json() as {
			message: string
			status: string
		}
		if (data.status !== "success") {
			// deno-lint-ignore no-console
			console.error("Failed to fetch new dog image from API", { data })
			return null
		}
		return data.message
	} catch (e) {
		// deno-lint-ignore no-console
		console.error(e)
		return null
	}
}
