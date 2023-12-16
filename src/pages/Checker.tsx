import { useAtom } from "jotai"
import { useMemo, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { itemsCheckedAtom, itemsNotCheckedAtom } from "../main"

export const Checker = () => {
	const [itemsChecked, setItemsChecked] = useAtom(itemsCheckedAtom)
	const [, setItemsNotChecked] = useAtom(itemsNotCheckedAtom)
	const [index, setIndex] = useState(0)
	const currentItem = useMemo(
		() => structuredClone(itemsChecked[index]),
		[itemsChecked, index],
	)
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			setItemsNotChecked((prev) => [...prev, currentItem])
			setItemsChecked((prev) => {
				const newItems = structuredClone(prev)
				newItems.splice(index, 1)
				return newItems
			})
		},
		onSwipedRight: () => {
			setIndex((prev) => prev + 1)
		},
	})
	if (itemsChecked.length === 0) {
		return (
			<div>
				<p>Nothing to check!</p>
			</div>
		)
	}

	if (index >= itemsChecked.length) {
		return (
			<div>
				<p>Nothing to check!</p>
			</div>
		)
	}

	return (
		<div
			{...handlers}
			className="w-full h-full flex justify-center items-center text-lg"
		>
			<p>{itemsChecked[index].name}</p>
		</div>
	)
}
