import styled from "@emotion/styled"
import { UnstyledButton } from "./common/elements.styles"

export const Button = styled(UnstyledButton)<{ drawerOpen: boolean }>`
	position: absolute;

	//top-most banner is 3rem height this puts the button between that and the logo so neither is fully obstructed
	top: 1.5rem;
	right: 0;
	transform: translateX(-8px);
	transition: background-color 200ms ease-in-out, transform 100ms ease-in-out,
		color 200ms ease-out;
	background-color: #f9f3eb;
	padding: 8px;

	&:hover,
	&:focus {
		background-color: color-mix(in srgb, #f9f3eb 80%, black);
		color: white;
	}

	> span {
		margin-right: 8px;
	}

	${({ drawerOpen }) =>
		drawerOpen
			? ""
			: `
                        border-top-right-radius: 4px;
				        border-bottom-right-radius: 4px;
				        box-shadow: 3px 0 5px rgba(0, 0, 0, 0.1);
						transform: translateX(32px);
						color: #004740;
						background-color: #00d6ff;

						&:hover,
						&:focus
						{
							color: #004740;
							background-color: #00d6ff;
							transform: translateX(100%);
						}							
					`}
`
