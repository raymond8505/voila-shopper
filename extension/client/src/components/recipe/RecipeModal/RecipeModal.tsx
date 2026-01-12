import { Alert, Descriptions, Modal } from "antd"

import { useStore } from "@store/client"
import { useMemo, useRef } from "react"
import { decodeHtmlEntities, trimUnit } from "../../../helpers"
import { ModalBody, Wrapper } from "./RecipeModal.styles"
import { Duration } from "@src/components/common/Duration/Duration"
import { DescriptionsItemType } from "antd/es/descriptions"
import { isHowToSection } from "@src/types/helpers"
import { HowToSection } from "./HowToSection"
import { HowToStep } from "./HowToStep"

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
		currentModalRecipe: recipeMeta,
		recipeModalOpen,
		setRecipeModalOpen,
	} = useStore()

	const recipe = useMemo(() => {
		console.log(recipeMeta)
		return recipeMeta?.schema
	}, [recipeMeta])

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
					{recipeMeta?.source ? (
						<>
							<span>Source: </span>
							<a href={recipeMeta?.url} target="_blank">
								{recipeMeta?.source}
							</a>
						</>
					) : null}
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
										children: recipe?.recipeYield,
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
						{recipe?.recipeInstructions ? (
							<ol>
								{recipe.recipeInstructions.map(
									(stepOrSection, i) =>
										isHowToSection(stepOrSection) ? (
											<HowToSection
												key={i}
												section={stepOrSection}
											/>
										) : (
											<HowToStep key={i} step={stepOrSection} />
										)
								)}
							</ol>
						) : (
							<p>
								<Alert
									type="warning"
									description="no instructions found"
								></Alert>
							</p>
						)}
					</section>

					<section>
						<strong>Nutrition</strong>
						<Descriptions
							column={4}
							items={[
								{
									key: "calories",
									label: "Cals",
									value: recipe?.nutrition?.calories,
									children: recipe?.nutrition?.calories
										? `${trimUnit(
												recipe?.nutrition?.calories
										  )}kcal`
										: "unknown",
								},
								{
									key: "carbs",
									label: "Carbs",
									value: recipe?.nutrition?.carbohydrateContent,
									children: `${
										trimUnit(
											recipe?.nutrition?.carbohydrateContent
										) ?? "unknown"
									}g`,
								},
								{
									key: "fat",
									label: "Fat",
									value: recipe?.nutrition?.fatContent,
									children: `${
										trimUnit(recipe?.nutrition?.fatContent) ??
										"unknown"
									}g`,
								},
								{
									key: "protein",
									label: "Protein",
									value: recipe?.nutrition?.proteinContent,
									children: `${
										trimUnit(
											recipe?.nutrition?.proteinContent
										) ?? "unknown"
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
