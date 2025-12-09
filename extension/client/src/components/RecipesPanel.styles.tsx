import styled from "@emotion/styled"
import { LoaderButton } from "./common/LoaderButton"

export const Wrapper = styled.div`
	gap: 8px;
	height: 100%;

	> div {
		overflow: auto;
		padding: 8px;
		height: 100%;
	}
`
export const GetRecipesButton = styled(LoaderButton)`
	margin: 8px 0;
`
export const RecipeResultsWrapper = styled.div`
	display: flex;
	gap: 8px;
	flex-wrap: no-wrap;
`
export const RecipeResultsList = styled.ul`
	font-weight: bold;

	li {
		padding: 8px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}
`
