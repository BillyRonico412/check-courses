import { useSetAtom } from "jotai"
import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react"
import { LuX } from "react-icons/lu"
import { ItemInterface, itemsCheckedAtom, itemsNotCheckedAtom } from "../main"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { MdOutlineDragIndicator } from "react-icons/md"

interface ItemProps {
	item: ItemInterface
	type: "check" | "uncheck"
	index: number
}

export interface ItemRefInterface {
	scrollIntoView: () => void
}

export const Item = forwardRef<ItemRefInterface, ItemProps>((props, ref) => {
	const setItemsChecked = useSetAtom(itemsCheckedAtom)
	const setItemsNotChecked = useSetAtom(itemsNotCheckedAtom)

	const itemRef = useRef<HTMLDivElement | null>(null)

	useImperativeHandle(ref, () => ({
		scrollIntoView() {
			if (itemRef.current === null) {
				return
			}
			itemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			})
		},
	}))

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
			case "check": {
				setItemsNotChecked((prev) => [...prev, props.item])
				deleteItem()
				break
			}
			case "uncheck": {
				setItemsChecked((prev) => [...prev, props.item])
				deleteItem()
				break
			}
		}
	}, [props.item, props.type, setItemsChecked, setItemsNotChecked, deleteItem])

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.item.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			className={`flex gap-x-2 items-center ${
				props.type === "check" && "line-through"
			}`}
			ref={(currentRef) => {
				setNodeRef(currentRef)
				itemRef.current = currentRef
			}}
			style={style}
			{...attributes}
		>
			<MdOutlineDragIndicator {...listeners} />
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
})
