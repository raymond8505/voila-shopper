import { css } from "@emotion/react"
import type { Recipe } from "../../../types/recipe/index"
import { HowToStep } from "./HowToStep"
/**
 * Represents a section of recipe instructions
 */
export function HowToSection({
	section,
}: {
	section: Recipe.HowToSection
}) {
	return (
		<li
			css={css`
				list-style-type: disc;
			`}
		>
			{section.name ? <strong>{section.name}</strong> : null}

			<ul>
				{section.itemListElement?.length
					? section.itemListElement.map((item, i) => (
							<HowToStep
								step={item}
								key={`${section.name}-${i}`}
							/>
					  ))
					: null}
			</ul>
		</li>
	)
}
