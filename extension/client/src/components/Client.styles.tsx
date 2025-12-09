import styled from "@emotion/styled"

export const Wrapper = styled.div<{ drawerOpen: boolean }>`
	width: 25vw;
	height: 100vh;
	min-width: 360px;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #f9f3eb;
	box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
	padding: 8px;
	z-index: 999999999;
	transition: transform 200ms ease-out;

	> div,
	.ant-tabs-tabpane,
	.ant-tabs-content-holder,
	.ant-tabs,
	.ant-tabs-content {
		height: 100%;
	}

	${({ drawerOpen }) =>
		drawerOpen
			? ""
			: `
					transform: translateX(-100%);	
				`}
`
