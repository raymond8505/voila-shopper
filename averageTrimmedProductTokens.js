import { readFileSync } from 'fs'

const json = JSON.parse(readFileSync("extension/client/public/fixtures/trimmedProductStrings.json", "utf-8"))
const totalItemLength = json.reduce((acc, cur) => acc + cur.length, 0)

const avgProductChars = Math.round(totalItemLength / json.length)
const avgProductTokens = Math.round(avgProductChars / 4)

console.log({
    avgProductChars,
    avgProductTokens
})


