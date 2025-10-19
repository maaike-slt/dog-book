import type React from "react"
import "./Loader.css"

const Loader: React.FC = () => {
	return (
		<img
			src="/dog-book/dog_loader.png"
			alt="loading..."
			className="loader"
		/>
	)
}

export default Loader
