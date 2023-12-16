import { LuCheckCheck, LuList } from "react-icons/lu"
import { useLocation } from "wouter"

export const Nav = () => {
	const [, setLocation] = useLocation()
	return (
		<nav className="flex gap-x-4 rounded">
			<button
				type="button"
				className="flex justify-center items-center flex-grow py-2 bg-gray-100 rounded shadow"
				onClick={() => setLocation("/list")}
			>
				<LuList />
			</button>
			<button
				type="button"
				className="flex justify-center items-center flex-grow py-2 bg-gray-100 rounded shadow"
				onClick={() => setLocation("/checker")}
			>
				<LuCheckCheck />
			</button>
		</nav>
	)
}
