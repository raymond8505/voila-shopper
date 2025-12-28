import { css } from "@emotion/react"
import { dataLayerFixture } from "@src/api/voila.fixtures"

export function ClientPlayground() {
	function dataLayerPush() {
		window.dataLayer?.push?.(dataLayerFixture)
	}
	return (
		<div
			css={css`
				padding: 3vmin 3vmin 3vmin calc(28vw + 3vmin);
			`}
		>
			<h1>Client Playground</h1>
			<button
				onClick={() => {
					dataLayerPush()
				}}
			>
				Push Data Layer Event
			</button>
		</div>
	)
}
