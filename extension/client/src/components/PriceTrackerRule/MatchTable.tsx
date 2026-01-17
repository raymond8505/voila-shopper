import LinkOutlined from "@ant-design/icons/LinkOutlined"
import { formatCurrency } from "@src/helpers"
import { PriceTracker } from "@src/types/product/price-tracker"
import Table from "antd/es/table"

export function MatchTable({
	matches,
}: {
	matches: PriceTracker.PriceRuleMatch[] | undefined
}) {
	return (
		<Table
			dataSource={
				matches?.map((match, j) => ({
					price: `${formatCurrency(match.product_view.best_current_price.price)}`,
					name: match.product_view.product.raw_name,
					match,
					key: match.product_view.product.id + "-" + j,
				})) ?? []
			}
			pagination={{
				pageSize: 5,
			}}
			columns={[
				{
					title: "Price",
					dataIndex: "price",
					render: (_: any, record: any) => {
						return <strong>{record.price}</strong>
					},
				},
				{
					title: "Product Name",
					dataIndex: "name",
				},
				{
					title: "Visit",
					dataIndex: "visit",
					render: (_: any, record: any) => {
						return record.match.product_view.best_current_price
							.source_product_url ? (
							<a
								href={
									new URL(
										record.match.product_view.best_current_price
											.source_product_url,
									).pathname
								}
							>
								<LinkOutlined />
							</a>
						) : null
					},
				},
			]}
		/>
	)
}
