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

        /* SCROLLBAR STYLES */
        
        /* For Firefox */
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;

        /* For Chrome, Edge, Safari */
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
    `}
		/>
	)
}
