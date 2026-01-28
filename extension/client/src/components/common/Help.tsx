import { Tooltip } from "antd"
import { forwardRef } from "react"
import { UnstyledButtonElement } from "./UnstyledButton"
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined"
import { TooltipProps, TooltipRef } from "antd/es/tooltip"

export type HelpProps = {
	text: string
	tooltipProps?: TooltipProps
	buttonProps?: React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
}
export const Help = forwardRef<TooltipRef, HelpProps>(
	(props: HelpProps, ref) => {
		return (
			<Tooltip
				title={props.text}
				getPopupContainer={(e) => e}
				trigger={["hover", "focus"]}
				{...props.tooltipProps}
				ref={ref}
			>
				<UnstyledButtonElement
					type="button"
					aria-label={props.text}
					{...props.buttonProps}
				>
					<QuestionCircleOutlined />
				</UnstyledButtonElement>
			</Tooltip>
		)
	},
)
