import { useSetAtom } from "jotai"
import { nanoid } from "nanoid"
import { useCallback, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { itemsCheckedAtom } from "../main"

export const Adder = () => {
	const setItemsChecked = useSetAtom(itemsCheckedAtom)
	const [name, setName] = useState("")
	const addItem = useCallback(() => {
		if (name === "") {
			return
		}
		setItemsChecked((prev) => [
			...prev,
			{
				id: nanoid(),
				name,
				checked: false,
			},
		])
		setName("")
	}, [name, setItemsChecked])
	return (
		<div className="flex gap-x-2">
			<input
				type="text"
				className="border rounded px-4 py-2 flex-grow shadow"
				placeholder="Add a new item..."
				value={name}
				onChange={(e) => setName(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						addItem()
					}
				}}
			/>
			<button
				type="button"
				className="bg-blue-600 text-white px-4 py-2 rounded text-xl"
				onClick={addItem}
			>
				<LuPlus />
			</button>
		</div>
	)
}
