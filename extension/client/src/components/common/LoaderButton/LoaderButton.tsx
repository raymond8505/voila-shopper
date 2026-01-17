import Button from "antd/es/button"
import type { ButtonProps } from "antd/es/button"

import { forwardRef, ReactNode } from "react"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"
import { UnstyledButton } from "../UnstyledButton"

export interface LoaderButtonProps extends Omit<
	ButtonProps,
	"onClick" | "icon" | "loading" | "children" | "type"
> {
	onClick: React.MouseEventHandler<HTMLElement> | undefined
	icon?: ReactNode
	loading?: boolean
	label: string
	loadingLabel?: string
	type: ButtonProps["type"] | "unstyled"
}

/**
 * Standard button that can be toggled into a Loading state
 */
export const LoaderButton = forwardRef<
	HTMLButtonElement,
	LoaderButtonProps
>(
	(
		{
			onClick,
			icon,
			loading,
			label,
			loadingLabel,
			type = "default",
			...rest
		},
		ref,
	) => {
		const sharedProps = {
			onClick,
			disabled: loading,
			ref: ref as any,
			style: {
				display: "flex",
				gap: "4px",
			},
			...rest,
		}

		const content = (
			<>
				{loading ? <LoadingOutlined /> : icon}
				<span>
					{loading
						? loadingLabel
							? loadingLabel
							: label
						: label}
				</span>
			</>
		)

		return type === "unstyled" ? (
			<UnstyledButton {...sharedProps}>{content}</UnstyledButton>
		) : (
			<Button
				type={type as ButtonProps["type"]}
				{...sharedProps}
			>
				{content}
			</Button>
		)
	},
)
