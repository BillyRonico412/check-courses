import { Adder } from "../components/Adder"
import { Items } from "../components/Items"

export const List = () => {
	return (
		<div className="flex flex-col gap-y-8 w-full h-full">
			<div className="flex-grow overflow-y-auto flex flex-col gap-y-4">
				<div>
					<div className="flex items-center gap-x-4">
						<p className="text-sm">Checked</p>
						<hr className="flex-grow" />
					</div>
					<Items type="check" />
				</div>
				<div>
					<div className="flex items-center gap-x-4">
						<p className="text-sm">Unchecked</p>
						<hr className="flex-grow" />
					</div>
					<Items type="uncheck" />
				</div>
			</div>
			<div className="flex flex-col gap-y-4">
				<Adder />
			</div>
		</div>
	)
}
