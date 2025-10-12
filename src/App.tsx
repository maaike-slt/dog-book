import { JSX } from "react"
import "./App.css"

function App(): JSX.Element
{
	return (
		<div className="main-container">
			<div className="main-title" >
				choose your favorite!
			</div>
			<button type='button' className="dog-image" />
			<button type='button' className="dog-image" />
		</div>
	)
}

export default App
