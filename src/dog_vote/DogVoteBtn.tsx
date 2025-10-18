import "./DogVoteBtn.css"

interface DogVoteBtnProps {
	dogUrl: string
	onClick: () => void
	isVoted: boolean | null
}

const DogVoteBtn: React.FC<DogVoteBtnProps> = ({
	dogUrl,
	onClick,
	isVoted,
}) => {
	return (
		<button
			type="button"
			className="dog-button"
			onClick={onClick}
		>
			<img
				src={dogUrl}
				alt={dogUrl}
				className={`dog-image` +
					(isVoted === null
						? ""
						: (isVoted === true
							? " dog-image-up-vote"
							: " dog-image-down-vote"))}
			/>
		</button>
	)
}

export default DogVoteBtn
