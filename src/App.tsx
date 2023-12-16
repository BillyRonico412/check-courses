import { Redirect, Route, Switch } from "wouter"
import { List } from "./pages/List"
import { Checker } from "./pages/Checker"
import { Nav } from "./components/Nav"

export const App = () => {
	return (
		<div className="p-4 flex flex-col gap-y-4 w-screen h-screen">
			<p className="text-xl font-bold text-center">Courses</p>
			<div className="flex-grow">
				<Switch>
					<Route path="/list">
						<List />
					</Route>
					<Route path="/checker">
						<Checker />
					</Route>
					<Redirect to="/list" />
				</Switch>
			</div>
			<Nav />
		</div>
	)
}
