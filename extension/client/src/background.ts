chrome.action.onClicked.addListener(() => {
	chrome.tabs.create({
		url: chrome.runtime.getURL("./client/dist/dashboard.html"),
	})
})
