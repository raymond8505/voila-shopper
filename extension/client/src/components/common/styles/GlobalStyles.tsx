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

        strong,
        legend
        {
          font-weight: bold;
        }

        fieldset
        {
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding-bottom: 8px;
          margin-bottom: 16px;
        }
    `}
		/>
	)
}
