import styled from "@emotion/styled"
import { LoaderButton } from "./common/LoaderButton"

export const Wrapper = styled.div`
	display: grid;
	gap: 8px;
	height: 100%;
	grid-template-rows: auto auto 1fr;
`
export const OldTripsWrapper = styled.div`
	display: flex;
	gap: 8px;
	width: 100%;
	height: 32px;
	align-items: stretch;
`
export const GetPreviousTripButton = styled(LoaderButton)`
	flex-shrink: 0;
`
