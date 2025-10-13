import { randomBetween } from "@std/random"
import getBreedFromImageUrl from "./get_breed.ts"
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
		const fetchNew = !lastDog || topDogVoteCount === null ||
			(topDogVoteCount > 0
				? (lastDog.voteCount / topDogVoteCount) < randomBetween(0, 1)
				: false)

		if (!fetchNew) {
			const randomDogImageUrl = await getRandomDogImageUrlFromDb(
				res.map((d) => d.imageUrl),
			)
			if (randomDogImageUrl) {
				res.push({ imageUrl: randomDogImageUrl, voteCount: 0 })
				continue
			}
		}

		const newDogImageUrl = await getNewDogFromApi()
		if (
			!newDogImageUrl ||
			res.some((d) => d.imageUrl === newDogImageUrl)
		) {
			continue
		}

		const breed = getBreedFromImageUrl(newDogImageUrl)
		await supabase.from("dog_history").upsert({
			breed,
			image_url: newDogImageUrl,
		})

		res.push({ imageUrl: newDogImageUrl, voteCount: 0 })
	}

	return res.length === 2 ? res.map((d) => d.imageUrl) : []
}

async function getLastTwoDog() {
	const { data: dogData, error } = await supabase
		.from("dog_history")
		.select("voteCount:vote_count, imageUrl:image_url")
		.order("vote_count", { ascending: true })
		.order("updated_at", { ascending: true })
		.limit(2)
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return []
	}
	return dogData ?? []
}

async function getTopDogVoteCount(): Promise<number | null> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("voteCount:vote_count")
		.order("vote_count", { ascending: false })
		.limit(1)
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return null
	}
	return data?.[0]?.voteCount ?? null
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

async function getRandomDogImageUrlFromDb(
	excludeUrls: string[],
): Promise<string | null> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("imageUrl:image_url")
		.not(
			"image_url",
			"in",
			`(${excludeUrls.map((u) => `'${u}'`).join(",")})`,
		)
		.order("RANDOM()")
		.limit(1)
		.single()
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return null
	}
	return data?.imageUrl ?? null
}
