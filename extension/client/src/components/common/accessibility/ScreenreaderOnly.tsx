import { css } from "@emotion/react"
import { ReactNode } from "react"

interface ScreenreaderOnlyProps {
	children: ReactNode
	/**
	 * The HTML element to render.
	 * @default 'div'
	 */
	as?: React.ElementType
}
/**
 * Wraps any content meant explicitly for assistive tech
 */
export function ScreenreaderOnly({
	children,
	as: Component = "div",
}: ScreenreaderOnlyProps) {
	return (
		<Component
			css={css`
				position: absolute;
				// 1px instead of 0 because older browsers might remove
				// 0 dimension elements from the rendering / a11y trees.
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				white-space: nowrap;
				border-width: 0;
			`}
		>
			{children}
		</Component>
	)
}
