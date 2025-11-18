/**
 * Because the app lives in the special extension sandbox, we need to pass
 * window.__INITIAL_STATE__ in from a script in the actual window's context
 */
;(function () {
	try {
		const initialState = window.__INITIAL_STATE__
		if (initialState) {
			window.postMessage(
				{
					type: "VOILA_INITIAL_STATE_FROM_PAGE",
					payload: initialState,
				},
				window.location.origin
			)
		}
	} catch (e) {
		console.error(
			"Error accessing __INITIAL_STATE__ from page (injected script):",
			e
		)
	}
})()
