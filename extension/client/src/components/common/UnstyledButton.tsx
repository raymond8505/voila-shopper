import styled from "@emotion/styled"
import Popconfirm from "antd/es/popconfirm"
import { useRef } from "react"

export const UnstyledButtonElement = styled.button`
	all: unset;
	cursor: pointer;

	&:focus-visible {
		outline: revert;
	}
`
export type UnstyledButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	confirmProps?: React.ComponentProps<typeof Popconfirm>
}
export function UnstyledButton(props: UnstyledButtonProps) {
	const baseButtonProps: Omit<
		UnstyledButtonProps,
		"confirmProps"
	> = { ...props }

	if (baseButtonProps.type === undefined) {
		baseButtonProps.type = "button"
	}

	const popupContainerRef = useRef<HTMLDivElement>(null)

	if (props.confirmProps) {
		return (
			<div
				style={{ display: "inline-block" }}
				ref={popupContainerRef}
			>
				<Popconfirm
					{...props.confirmProps}
					getPopupContainer={() =>
						popupContainerRef.current ?? document.body
					}
				>
					<UnstyledButtonElement
						{...baseButtonProps}
						onClick={
							props.onClick
								? props.onClick
								: (e) => {
										e.preventDefault()
										e.stopPropagation()
									}
						}
					/>
				</Popconfirm>
			</div>
		)
	}
	return <UnstyledButtonElement {...baseButtonProps} />
}
