import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core"
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { itemsCheckedAtom, itemsNotCheckedAtom } from "../main"
import { Item } from "./Item"

interface ListProps {
	type: "check" | "uncheck"
}

export const Items = (props: ListProps) => {
	const [itemsChecked, setItemsChecked] = useAtom(itemsCheckedAtom)
	const [itemsNotChecked, setItemsNotChecked] = useAtom(itemsNotCheckedAtom)
	const items = useMemo(() => {
		switch (props.type) {
			case "check":
				return itemsChecked
			case "uncheck":
				return itemsNotChecked
		}
	}, [props.type, itemsChecked, itemsNotChecked])

	const setItems = useMemo(() => {
		switch (props.type) {
			case "check":
				return setItemsChecked
			case "uncheck":
				return setItemsNotChecked
		}
	}, [props.type, setItemsChecked, setItemsNotChecked])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	const onDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event
			if (!over || active.id === over.id) {
				return
			}
			setItems((prev) => {
				const oldIndex = prev.findIndex((item) => item.id === active.id)
				const newIndex = prev.findIndex((item) => item.id === over.id)
				if (oldIndex === -1 || newIndex === -1) {
					return prev
				}
				const newItems = arrayMove(prev, oldIndex, newIndex)
				return newItems
			})
		},
		[setItems],
	)

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map((item, index) => (
					<Item key={item.id} index={index} item={item} type={props.type} />
				))}
			</SortableContext>
		</DndContext>
	)
}
