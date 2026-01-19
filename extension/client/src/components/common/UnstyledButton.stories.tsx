import { UnstyledButton, UnstyledButtonProps } from "./UnstyledButton"
import { fn } from "storybook/test"

export default {
	component: UnstyledButton,
	title: "Client/common/UnstyledButton",
	args: {
		onClick: fn() as UnstyledButtonProps["onClick"],
		children: "Click me",
	} as UnstyledButtonProps,
}

export const Default = {}

export const WithConfirm = {
	args: {
		children: "Delete",
		confirmProps: {
			title: "Are you sure?",
			description: "This action cannot be undone.",
			onConfirm: fn(),
		},
	} as UnstyledButtonProps,
}

export const Disabled = {
	args: {
		disabled: true,
		children: "Disabled Button",
	} as UnstyledButtonProps,
}
