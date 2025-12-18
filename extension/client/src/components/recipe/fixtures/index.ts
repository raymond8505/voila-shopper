import { Recipe } from "../../../types"

export const recipe: Recipe.Recipe = {
	"@type": "Recipe",
	name: "Gurkensalat",
	author: { "@type": "Person", name: "raymond" },
	description:
		"Gurkensalat: authentic German creamy cucumber salad",
	datePublished: "2023-09-07T02:17:44+00:00",
	recipeYield: "3",
	prepTime: "PT15M",
	recipeIngredient: [
		"600-700 g cucumber (I used field cucumbers, peeled, sliced very thin)",
		"salt",
		"3 tbsp vinegar (white)",
		"1 tbsp water",
		"1 tsp dijon mustard",
		"1 tsp sugar",
		"pepper (small pinch)",
		"1/2 cup sour cream",
		"25-30 g dill (fresh, chopped 1/4&quot;)",
	],
	recipeInstructions: [
		{
			text: "Layer the bottom of a flat bottom sieve or message rack with cucumbers, sprinkle lightly with salt, add a layer and repeat.",
		},
		{
			text: "Optionally add weight on top a large pan, chef presses, etc",
		},
		{
			text: "Allow cucumber to sit for 10 minutes. The salt will draw out some water so make sure there&#39;s something to catch that underneath",
		},
		{
			text: "Squeeze the cucumbers up in a cheese cloth or clean kitchen towel, draining them of most of their juices. You want them to keep some juices though, they&#39;ll thin the dressing some and infuse it with more cucumber-y goodness",
		},
		{
			text: "While the cucumbers are draining whisk together all the dressing ingredients",
		},
		{
			text: "Add the drained cucumbers to a container, add the dressing and toss vigorously to combine.",
		},
		{
			text: "Refrigerate at least 30-60mins, but ideally over night.",
		},
		{
			text: "Serve garnished with a radish rose if you&#39;re a fancy boy",
		},
	],
	recipeCategory: ["Salad"],
	recipeCuisine: ["german"],
	nutrition: {
		"@type": "NutritionInformation",
		calories: "113 kcal",
		carbohydrateContent: "8 g",
		proteinContent: "2 g",
		fatContent: "8 g",
		saturatedFatContent: "4 g",
		cholesterolContent: "23 mg",
		sodiumContent: "40 mg",
		fiberContent: "2 g",
		sugarContent: "5 g",
		unsaturatedFatContent: "2.3 g",
		servingSize: "1 serving",
	},
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "4.5",
		ratingCount: "120",
	},
	image:
		"https://raymonds.recipes/wp-content/uploads/2023/09/Img0546.jpg",
	keywords:
		"Gurkensalat:,authentic,German,creamy,cucumber,salad",
}
