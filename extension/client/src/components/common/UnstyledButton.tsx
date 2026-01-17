import styled from "@emotion/styled"
import Popconfirm from "antd/es/popconfirm"

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

	if (props.confirmProps) {
		return (
			<Popconfirm
				{...props.confirmProps}
				getPopupContainer={(e) => e}
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
		)
	}
	return <UnstyledButtonElement {...baseButtonProps} />
}
