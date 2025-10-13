const DEFAULT_DOG_BREED = "unknown"

export default function getBreedFromImageUrl(imageUrl: string): string {
	const match = imageUrl.match(/breeds\/([a-zA-Z-]+)\//)
	return match ? match[1] : DEFAULT_DOG_BREED
}
