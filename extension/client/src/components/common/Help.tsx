import { Tooltip } from "antd"
import { forwardRef } from "react"
import { UnstyledButton } from "./elements.styles"
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined"
import { TooltipRef } from "antd/es/tooltip"

export type HelpProps = {
	text: string
}
export const Help = forwardRef<TooltipRef, HelpProps>(
	(props: HelpProps, ref) => {
		return (
			<Tooltip
				title={props.text}
				getPopupContainer={(e) => e}
				trigger={["hover", "focus"]}
				ref={ref}
			>
				<UnstyledButton>
					<QuestionCircleOutlined />
				</UnstyledButton>
			</Tooltip>
		)
	}
)
