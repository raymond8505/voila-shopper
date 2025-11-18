import fs from "fs"
import path from "path"
import readline from "readline"

// --- Configuration ---
// !!! IMPORTANT: CHANGE THIS TO YOUR INPUT CSV FILE PATH !!!
const INPUT_FILE = "./recipes.csv"
// !!! e.g., const INPUT_FILE = 'C:\\Users\\crazy\\Documents\\data\\recipes.csv'; !!!

const OUTPUT_PREFIX = "recipes.chunk."
const CHUNK_SIZE_MB = 99 // Target size of each chunk file in Megabytes
// -------------------

const CHUNK_SIZE_BYTES = CHUNK_SIZE_MB * 1024 * 1024 // Convert MB to bytes

async function splitCsvByLineAndSize() {
	const inputFilePath = path.resolve(INPUT_FILE)

	if (!fs.existsSync(inputFilePath)) {
		console.error(`Error: Input file not found at ${inputFilePath}`)
		process.exit(1)
	}

	const fileStream = fs.createReadStream(inputFilePath)
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity, // Detects both LF and CRLF line endings
	})

	let currentWriter: fs.WriteStream | null = null
	let currentChunkBytes = 0
	let fileIndex = 0
	let headerLine: string | null = null // To store the header line

	function getNextOutputFilePath(index: number): string {
		// Generates names like recipe_chunk_001.csv, recipe_chunk_002.csv, etc.
		return path.join(
			process.cwd(),
			`${OUTPUT_PREFIX}${index.toString().padStart(3, "0")}.csv`
		)
	}

	function createNewChunkFile() {
		if (currentWriter) {
			currentWriter.end() // End the previous writer
		}
		fileIndex++
		const outputFilePath = getNextOutputFilePath(fileIndex)
		console.log(`Creating new chunk file: ${outputFilePath}`)
		currentWriter = fs.createWriteStream(outputFilePath)
		currentChunkBytes = 0

		// Write the header line to the new file if it exists
		if (headerLine !== null) {
			const headerBuffer = Buffer.from(headerLine + "\n", "utf8") // Include newline
			currentWriter.write(headerBuffer)
			currentChunkBytes += headerBuffer.byteLength
		}
	}

	// Read the input file line by line
	let isFirstLineOfInput = true
	try {
		for await (const line of rl) {
			if (isFirstLineOfInput) {
				headerLine = line // Capture the first line as header
				isFirstLineOfInput = false
				// Create the first chunk file, which will also write the header
				createNewChunkFile()
				continue // Move to the next line of actual data
			}

			// Convert line to buffer to get actual byte length (important for multi-byte characters)
			const lineBuffer = Buffer.from(line + "\n", "utf8") // Include newline when calculating size
			const lineLength = lineBuffer.byteLength

			// Check if adding this line would exceed the chunk size
			// The condition `currentChunkBytes > 0` ensures that at least one data line (after header)
			// is always written to a new chunk, even if that line alone exceeds the CHUNK_SIZE_BYTES.
			if (
				currentWriter &&
				currentChunkBytes > 0 &&
				currentChunkBytes + lineLength > CHUNK_SIZE_BYTES
			) {
				// Current chunk is full enough, time to start a new chunk file
				createNewChunkFile()
			} else if (!currentWriter) {
				// Fallback: if somehow currentWriter is null (e.g., initial creation failed)
				console.warn(
					"Writer not initialized, creating a new one as a fallback."
				)
				createNewChunkFile()
			}

			if (currentWriter) {
				currentWriter.write(lineBuffer)
				currentChunkBytes += lineLength
			} else {
				console.error(
					"Critical Error: No writer available after attempting to create one. Exiting."
				)
				process.exit(1)
			}
		}
	} catch (error) {
		console.error(
			`Error during file processing: ${
				error instanceof Error ? error.message : String(error)
			}`
		)
	} finally {
		// Ensure the last writer is closed, if it was opened
		if (currentWriter) {
			currentWriter.end()
		}
		// Ensure the input file stream is closed
		fileStream.close()
		console.log(
			`\nFinished splitting '${INPUT_FILE}' into ${fileIndex} chunks.`
		)
	}
}

// Execute the function
splitCsvByLineAndSize()
