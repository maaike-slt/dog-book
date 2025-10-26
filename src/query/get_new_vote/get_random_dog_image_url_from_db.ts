import { supabase } from "../index.ts"

export default async function getRandomDogImageUrlFromDb(
	excludeUrl: string | null,
): Promise<string | null> {
	const { data, error } = await supabase
		.from("random_dog_image_urls")
		.select("imageUrl:image_url")
		.not("image_url", "eq", excludeUrl ?? "")
		.limit(1)
		.single()
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return null
	}
	return data?.imageUrl ?? null
}
