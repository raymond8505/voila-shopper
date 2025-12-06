import { css } from "@emotion/react"
import { Modal } from "antd"
import { useMemo, useRef } from "react"
import { useStore } from "../store"
import { concatenationToArray } from "../helpers"

export function RecipeModal() {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const {
		currentModalRecipe: recipe,
		recipeModalOpen,
		setRecipeModalOpen,
	} = useStore()

	const ingredientParts = useMemo(
		() =>
			recipe?.RecipeIngredientParts
				? concatenationToArray(recipe.RecipeIngredientParts)
				: undefined,
		[recipe?.RecipeIngredientParts]
	)

	const ingredientQuantities = useMemo(
		() =>
			recipe?.RecipeIngredientQuantities
				? concatenationToArray(recipe.RecipeIngredientQuantities)
				: undefined,
		[recipe?.RecipeIngredientQuantities]
	)
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
				title={recipe?.Name}
				footer={null}
			>
				<div>
					<strong>Ingredients</strong>
				</div>
				{ingredientParts ? (
					<ul>
						{ingredientParts.map((ingredient, i) => (
							<li key={i}>{ingredient}</li>
						))}
					</ul>
				) : null}
			</Modal>
		</div>
	)
}
