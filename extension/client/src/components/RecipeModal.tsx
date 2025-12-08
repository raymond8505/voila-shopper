import { css } from "@emotion/react"
import { Modal } from "antd"

import { useStore } from "../store"
import { useRef } from "react"

export function RecipeModal() {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const {
		currentModalRecipe: recipe,
		recipeModalOpen,
		setRecipeModalOpen,
	} = useStore()

	// const ingredientQuantities = useMemo(
	// 	() =>
	// 		recipe?.RecipeIngredientQuantities
	// 			? concatenationToArray(recipe.RecipeIngredientQuantities)
	// 			: undefined,
	// 	[recipe?.RecipeIngredientQuantities]
	// )
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
				title={recipe?.name as string}
				footer={null}
			>
				<div>
					<strong>Ingredients</strong>
				</div>
				{recipe?.recipeIngredient ? (
					<ul>
						{recipe?.recipeIngredient.map((ingredient, i) => (
							<li key={i}>{ingredient}</li>
						))}
					</ul>
				) : null}
			</Modal>
		</div>
	)
}
