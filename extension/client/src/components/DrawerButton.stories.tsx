import { useStore } from "@src/store"
import { DrawerButton } from "./DrawerButton"
import { useEffect } from "react"

export default {
	component: DrawerButton,
	title: "DrawerButton",
	decorators: [
		(Story) => {
			const { drawerOpen } = useStore()

			return (
				<>
					<style type="text/css">{`#storybook-root {
                        position: relative;
                        width: 25vw;
                        background-color: #f9f3eb;

                        ${
													drawerOpen
														? ""
														: `transform: translateX(-100%);`
												}
                `}</style>
					<Story />
				</>
			)
		},
	],
}

export const Closed = {
	decorators: [
		(Story) => {
			const { setDrawerOpen } = useStore()

			useEffect(() => {
				setDrawerOpen(false)
			}, [setDrawerOpen])

			return (
				<>
					<Story />
				</>
			)
		},
	],
}
export const Open = {
	decorators: [
		(Story) => {
			const { setDrawerOpen } = useStore()

			useEffect(() => {
				setDrawerOpen(true)
			}, [setDrawerOpen])

			return (
				<>
					<Story />
				</>
			)
		},
	],
}
