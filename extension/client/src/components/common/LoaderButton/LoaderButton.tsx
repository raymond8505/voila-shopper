import Button from "antd/es/button"
import type { ButtonProps } from "antd/es/button"

import { forwardRef, ReactNode } from "react"
import LoadingOutlined from "@ant-design/icons/LoadingOutlined"

export interface LoaderButtonProps
	extends Omit<
		ButtonProps,
		"onClick" | "icon" | "loading" | "children"
	> {
	onClick: React.MouseEventHandler<HTMLElement> | undefined
	icon?: ReactNode
	loading?: boolean
	label: string
	loadingLabel?: string
	type?: ButtonProps["type"]
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
		ref
	) => {
		return (
			<Button
				type={type}
				onClick={onClick}
				disabled={loading}
				ref={ref}
				style={{
					display: "flex",
					gap: "4px",
				}}
				{...rest}
			>
				{loading ? <LoadingOutlined /> : icon}
				<span>
					{loading
						? loadingLabel
							? loadingLabel
							: label
						: label}
				</span>
			</Button>
		)
	}
)
