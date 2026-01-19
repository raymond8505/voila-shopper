import { LoaderButton, LoaderButtonProps } from "./LoaderButton"
import { fn } from "storybook/test"
import ShoppingCartOutlined from "@ant-design/icons/ShoppingCartOutlined"
export default {
	component: LoaderButton,
	title: "Client/common/LoaderButton",
	args: {
		onClick: fn() as LoaderButtonProps["onClick"],
		label: "Click me",
	} as LoaderButtonProps,
}

export const Default = {}

export const WithIcon = {
	args: {
		icon: <ShoppingCartOutlined />,
	} as LoaderButtonProps,
}

export const Loading = {
	args: {
		loading: true,
		loadingLabel: "Loading",
	} as LoaderButtonProps,
}
