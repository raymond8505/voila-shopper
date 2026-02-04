import { formatCurrency, getPriceDifference } from "@src/helpers"
import { useMemo } from "react"
import MinusOutlined from "@ant-design/icons/MinusOutlined"
import ArrowUpOutlined from "@ant-design/icons/ArrowUpOutlined"
import { UnstyledButton } from "../common/UnstyledButton"

/**
 *
 */
export function PriceDifferenceArrow({
	currentPrice,
	comparePrice,
}: {
	currentPrice: number
	comparePrice: number
}) {
	const productDiff = getPriceDifference(
		currentPrice,
		comparePrice,
	)

	const shouldShowArrow =
		Math.abs(productDiff.percent) >
		import.meta.env.VITE_PRODUCT_PRICE_DIFFERENCE_THRESHOLD

	const Icon = useMemo(() => {
		if (shouldShowArrow) {
			return (
				<ArrowUpOutlined
					style={{
						transform:
							productDiff.percent < 0
								? "rotate(180deg)"
								: undefined,
						color: productDiff.percent < 0 ? "green" : "red",
					}}
				/>
			)
		}

		return <MinusOutlined />
	}, [shouldShowArrow, productDiff.percent])

	return (
		<UnstyledButton
			title={`compared to ${formatCurrency(comparePrice)} avg`}
		>
			{Icon}
		</UnstyledButton>
	)
}
