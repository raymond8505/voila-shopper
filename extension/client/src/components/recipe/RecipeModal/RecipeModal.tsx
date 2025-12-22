import { Descriptions, Modal } from "antd"

import { useStore } from "../../../store"
import { useRef } from "react"
import { decodeHtmlEntities } from "../../../helpers"
import { ModalBody, Wrapper } from "./RecipeModal.styles"
import { Duration } from "../../common/Duration"
import { DescriptionsItemType } from "antd/es/descriptions"

/**
 * A modal to display a recipe
 * - uses Ant Modal
 * - Singleton pattern- lives in App, controlled through store functions
 * 	@see src\App.tsx
 *  @see src\store\index.ts
 */
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
							items={
								[
									{
										key: "prep-time",
										label: "Prep Time",
										value: recipe?.prepTime,
										children: (
											<Duration duration={recipe?.prepTime} />
										),
									},
									{
										key: "cook-time",
										label: "Cook Time",
										value: recipe?.cookTime,
										children: (
											<Duration duration={recipe?.cookTime} />
										),
									},
									{
										key: "total-time",
										label: "Total Time",
										value: recipe?.totalTime,
										children: (
											<Duration duration={recipe?.totalTime} />
										),
									},
									{
										key: "servings",
										label: "Servings",
										value: recipe?.recipeYield,
									},
								].filter(
									(i) => i.value !== undefined
								) as unknown as DescriptionsItemType[]
							}
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
									value: recipe?.nutrition.calories,
									children:
										recipe?.nutrition.calories ?? "unknown",
								},
								{
									key: "carbs",
									label: "Carbs",
									value: recipe?.nutrition.carbohydrateContent,
									children: `${
										recipe?.nutrition.carbohydrateContent ??
										"unknown"
									}g`,
								},
								{
									key: "fat",
									label: "Fat",
									value: recipe?.nutrition.fatContent,
									children: `${
										recipe?.nutrition.fatContent ?? "unknown"
									}g`,
								},
								{
									key: "protein",
									label: "Protein",
									value: recipe?.nutrition.proteinContent,
									children: `${
										recipe?.nutrition.proteinContent ?? "unknown"
									}g`,
								},
							].filter((i) => i.value !== undefined)}
						/>
					</section>
				</ModalBody>
			</Modal>
		</Wrapper>
	)
}
