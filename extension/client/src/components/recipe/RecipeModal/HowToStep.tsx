import { css } from "@emotion/react"
import { Recipe } from "../../../types/recipe/index"
export function HowToStep({ step }: { step: Recipe.HowToStep }) {
	return (
		<li
			css={css`
				list-style-type: decimal;
			`}
		>
			{step.text}
		</li>
	)
}
