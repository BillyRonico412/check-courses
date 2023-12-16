import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import "./index.css"
import { atomWithStorage } from "jotai/utils"

export interface ItemInterface {
	id: string
	name: string
}

export const itemsCheckedAtom = atomWithStorage<ItemInterface[]>(
	"items-checked",
	[],
)
export const itemsNotCheckedAtom = atomWithStorage<ItemInterface[]>(
	"items-not-checked",
	[],
)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
