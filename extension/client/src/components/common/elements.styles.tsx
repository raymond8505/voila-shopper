import styled from "@emotion/styled"

export const UnstyledButton = styled.button`
	all: unset;
	cursor: pointer;

	&:focus-visible {
		outline: revert;
	}
`
