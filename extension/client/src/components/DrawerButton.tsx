import DoubleLeftOutlined from "@ant-design/icons/DoubleLeftOutlined"
import DoubleRightOutlined from "@ant-design/icons/DoubleRightOutlined"
import { useStore } from "@store/client"
import { Button } from "./DrawerButton.styles"

/**
 * Controls the open / close state of the client drawer
 */
export function DrawerButton() {
	const { drawerOpen, setDrawerOpen } = useStore()
	return (
		<Button
			type="button"
			onClick={() => {
				setDrawerOpen(!drawerOpen)
			}}
			drawerOpen={drawerOpen}
			aria-label={
				drawerOpen ? "Close Voila Shopper" : "Open Voila Shopper"
			}
		>
			{drawerOpen ? (
				<DoubleLeftOutlined aria-hidden />
			) : (
				<>
					<span>Open Voila Shopper</span>
					<DoubleRightOutlined aria-hidden />
				</>
			)}
		</Button>
	)
}
