import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { itemsCheckedAtom, itemsNotCheckedAtom } from "../main"
import Item from "./Item"

interface ListProps {
	type: "check" | "uncheck"
}

export const Items = (props: ListProps) => {
	const itemsChecked = useAtomValue(itemsCheckedAtom)
	const itemsNotChecked = useAtomValue(itemsNotCheckedAtom)
	const items = useMemo(() => {
		switch (props.type) {
			case "check":
				return itemsChecked
			case "uncheck":
				return itemsNotChecked
		}
	}, [props.type, itemsChecked, itemsNotChecked])
	return (
		<>
			{items.map((item, index) => (
				<Item key={item.id} index={index} item={item} type={props.type} />
			))}
		</>
	)
}
