import { css } from "@emotion/react"
import { Descriptions, Modal } from "antd"

import { useStore } from "../store"
import { useRef } from "react"
import { decodeHtmlEntities } from "../helpers"

export function RecipeModal() {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const {
		currentModalRecipe: recipe,
		recipeModalOpen,
		setRecipeModalOpen,
	} = useStore()

	return (
		<div
			ref={wrapperRef}
			css={css`
				position: fixed;
				z-index: 9999999999;
			`}
		>
			<Modal
				open={recipeModalOpen}
				getContainer={() => wrapperRef.current ?? document.body}
				onCancel={() => setRecipeModalOpen(false)}
				title={decodeHtmlEntities(recipe?.name as string)}
				footer={null}
			>
				<article
					css={css`
						li {
							margin-left: 1.5em;
						}

						ol {
							list-style: decimal;
						}

						ul {
							list-style: disc;
						}

						section {
							margin-bottom: 1em;
						}
					`}
				>
					<section>
						<Descriptions
							items={[
								{
									key: "prep-time",
									label: "Prep Time",
									children: (recipe?.prepTime as string) ?? "unknown",
								},
								{
									key: "cook-time",
									label: "Cook Time",
									children: (recipe?.cookTime as string) ?? "unknown",
								},
								{
									key: "servings",
									label: "Servings",
									children: (recipe?.recipeYield as string) ?? "unknown",
								},
							]}
						/>
					</section>
					<section>
						<strong>Ingredients</strong>

						{recipe?.recipeIngredient ? (
							<ul>
								{recipe?.recipeIngredient.map((ingredient, i) => (
									<li key={i}>{decodeHtmlEntities(ingredient)}</li>
								))}
							</ul>
						) : null}
					</section>

					<section>
						<strong>Instructions</strong>
						{recipe?.recipeIngredient ? (
							<ol>
								{recipe?.recipeInstructions.map((instruction, i) => (
									<li key={i}>{decodeHtmlEntities(instruction.text)}</li>
								))}
							</ol>
						) : null}
					</section>

					<section>
						<strong>Nutrition</strong>
						<Descriptions
							column={4}
							items={[
								{
									key: "calories",
									label: "Cals",
									children: `${recipe?.nutrition.calories ?? "unknown"}`,
								},
								{
									key: "carbs",
									label: "Carbs",
									children: `${
										recipe?.nutrition.carbohydrateContent ?? "unknown"
									}g`,
								},
								{
									key: "fat",
									label: "Fat",
									children: `${recipe?.nutrition.fatContent ?? "unknown"}g`,
								},
								{
									key: "protein",
									label: "Protein",
									children: `${recipe?.nutrition.proteinContent ?? "unknown"}g`,
								},
							]}
						/>
					</section>
				</article>
			</Modal>
		</div>
	)
}
