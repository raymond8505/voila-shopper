import { supabaseRequest } from "@src/api/supabase"
import { UnstyledButtonElement } from "@src/components/common/UnstyledButton"
import { useQuery } from "@tanstack/react-query"
import Table, { TablePaginationConfig } from "antd/es/table"
import { useState } from "react"
import BarChartOutlined from "@ant-design/icons/BarChartOutlined"
import { useNavigate } from "react-router-dom"

export function ProductList() {
	const [tableParams, setTableParams] =
		useState<TablePaginationConfig>({
			pageSize: 10,
			current: 1,
			total: 1,
		})
	const { data, isLoading, isPending } = useQuery({
		queryFn: async () => {
			const dbResp = await supabaseRequest({
				table: "rpc/get_products_paginated",
				tableParams: {
					p_sort_column: "name",
					p_sort_order: "ASC",
					p_page: Number(tableParams.current),
					p_results_per_page: Number(tableParams.pageSize),
				},
			})

			const json = await dbResp.json()

			setTableParams((prev) => {
				return {
					...prev,
					total: json.pagination.total_pages,
				}
			})
			return json
		},
		queryKey: [tableParams.current, tableParams.pageSize],
	})

	const navigate = useNavigate()
	return (
		<Table
			loading={isLoading || isPending}
			columns={[
				{
					dataIndex: "id",
					title: "ID",
					render: (val) =>
						`...${val.split("-").pop().slice(-5)}`,
				},
				{
					dataIndex: "name",
					title: "Name",
				},
				{
					dataIndex: "product_type",
					title: "Type",
				},
				{
					dataIndex: "updated_at",
					title: "Updated At",
				},
				{
					title: "",
					render: (row) => {
						console.log(row)
						return (
							<UnstyledButtonElement>
								<BarChartOutlined
									onClick={() => navigate(`/product/${row.id}`)}
								/>
							</UnstyledButtonElement>
						)
					},
				},
			]}
			dataSource={data?.data ?? []}
			onChange={setTableParams}
			pagination={{
				pageSize: tableParams.pageSize,
				current: tableParams.current,
				total: tableParams.total,
			}}
			rowKey={"id"}
		></Table>
	)
}
