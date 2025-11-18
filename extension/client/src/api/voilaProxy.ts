import http from "http"
import { Readable } from "stream"
import url from "url"

const options = {}

// Use HTTP for proxying (since target may be HTTP or HTTPS)
const server = http.createServer(options, async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	res.setHeader(
		"Access-Control-Allow-Headers",
		"*"
		//"Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token, client-route-id"
	)

	res.setHeader("Access-Control-Max-Age", "86400")

	const parsedUrl = url.parse(req.url || "", true)
	const targetUrl = parsedUrl.query.url as string

	console.log("Proxying request to:", targetUrl)

	let requestBody: BodyInit | undefined = undefined

	const methodsWithBody = ["POST", "PUT", "PATCH", "DELETE"]

	if (
		methodsWithBody.includes(req.method || "") &&
		(req.headers["content-length"] !== "0" || req.headers["transfer-encoding"])
	) {
		requestBody = Readable.toWeb(req) as BodyInit
	}

	const targetFetch = await fetch(targetUrl, {
		method: req.method || "GET",
		headers: req.headers as HeadersInit,
		body: requestBody,
		// @ts-ignore - 'duplex' is a custom Node.js fetch option not in standard lib.dom.d.ts
		duplex: "half",
	})

	console.log(targetFetch)

	res.end(await targetFetch.text())
})

server.listen(8080, () => {
	console.log("Voila proxy server is running on https://localhost:8080")
})
