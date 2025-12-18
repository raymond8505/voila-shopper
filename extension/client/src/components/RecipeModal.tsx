import { Descriptions, Modal } from "antd"

import { useStore } from "../store"
import { useRef } from "react"
import { decodeHtmlEntities } from "../helpers"
import { ModalBody, Wrapper } from "./RecipeModal.styles"

export function RecipeModal() {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const {
		currentModalRecipe: recipe,
		recipeModalOpen,
		setRecipeModalOpen,
	} = useStore()

	return (
		<Wrapper ref={wrapperRef}>
			<Modal
				open={recipeModalOpen}
				getContainer={() => wrapperRef.current ?? document.body}
				onCancel={() => setRecipeModalOpen(false)}
				title={decodeHtmlEntities(recipe?.name ?? "")}
				footer={null}
			>
				<ModalBody>
					<section>
						<Descriptions
							items={[
								{
									key: "prep-time",
									label: "Prep Time",
									children: recipe?.prepTime ?? "unknown",
								},
								{
									key: "cook-time",
									label: "Cook Time",
									children: recipe?.cookTime ?? "unknown",
								},
								{
									key: "servings",
									label: "Servings",
									children: recipe?.recipeYield ?? "unknown",
								},
							]}
						/>
					</section>
					<section>
						<strong>Ingredients</strong>

						{recipe?.recipeIngredient ? (
							<ul>
								{recipe?.recipeIngredient.map(
									(ingredient, i) => (
										<li key={i}>
											{decodeHtmlEntities(ingredient)}
										</li>
									)
								)}
							</ul>
						) : null}
					</section>

					<section>
						<strong>Instructions</strong>
						{recipe?.recipeIngredient ? (
							<ol>
								{recipe?.recipeInstructions.map(
									(instruction, i) => (
										<li key={i}>
											{decodeHtmlEntities(instruction.text)}
										</li>
									)
								)}
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
									children: `${
										recipe?.nutrition.calories ?? "unknown"
									}`,
								},
								{
									key: "carbs",
									label: "Carbs",
									children: `${
										recipe?.nutrition.carbohydrateContent ??
										"unknown"
									}g`,
								},
								{
									key: "fat",
									label: "Fat",
									children: `${
										recipe?.nutrition.fatContent ?? "unknown"
									}g`,
								},
								{
									key: "protein",
									label: "Protein",
									children: `${
										recipe?.nutrition.proteinContent ?? "unknown"
									}g`,
								},
							]}
						/>
					</section>
				</ModalBody>
			</Modal>
		</Wrapper>
	)
}
