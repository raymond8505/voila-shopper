import { Global } from "@emotion/react"
import { CSS_RESET } from "./reset"

/**
 * Styles to apply across the whole app
 */
export const GlobalStyles = () => {
	return (
		<Global
			styles={`
        ${CSS_RESET}

        dl
        {
          display: grid;
          grid-template-columns: max-content auto;
          gap: 0 8px;
        }

        strong
        {
          font-weight: bold;
        }
    `}
		/>
	)
}
