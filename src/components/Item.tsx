import { useSetAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { LuX } from "react-icons/lu"
import { ItemInterface, itemsCheckedAtom, itemsNotCheckedAtom } from "../main"

interface ItemProps {
	item: ItemInterface
	type: "check" | "uncheck"
	index: number
}

const Item = (props: ItemProps) => {
	const setItemsChecked = useSetAtom(itemsCheckedAtom)
	const setItemsNotChecked = useSetAtom(itemsNotCheckedAtom)
	const setItems = useMemo(() => {
		switch (props.type) {
			case "check":
				return setItemsChecked
			case "uncheck":
				return setItemsNotChecked
		}
	}, [props.type, setItemsChecked, setItemsNotChecked])
	const deleteItem = useCallback(() => {
		setItems((prev) => {
			const newItems = [...prev]
			newItems.splice(props.index, 1)
			return newItems
		})
	}, [props.index, setItems])
	const changeChecked = useCallback(() => {
		switch (props.type) {
			case "check":
				setItemsNotChecked((prev) => [...prev, props.item])
				deleteItem()
				break
			case "uncheck":
				setItemsChecked((prev) => [...prev, props.item])
				deleteItem()
				break
		}
	}, [props.item, props.type, setItemsChecked, setItemsNotChecked, deleteItem])

	return (
		<div
			className={`flex gap-x-2 items-center ${
				props.type === "uncheck" && "line-through"
			}`}
		>
			<label className="flex gap-x-2 flex-grow">
				<input
					type="checkbox"
					checked={props.type === "check"}
					onChange={changeChecked}
				/>
				<div className="flex-grow">{props.item.name}</div>
			</label>
			<button
				type="button"
				className="text-red-600 px-4 py-2 rounded text-xl"
				onClick={deleteItem}
			>
				<LuX />
			</button>
		</div>
	)
}

export default Item
