import { Voila } from "../types"
import { ErrorType } from "./types"

export class CustomError<DetailsType = unknown> extends Error {
	details?: DetailsType

	constructor(
		name: string,
		message: string,
		details?: DetailsType
	) {
		super(message)
		this.name = name
		this.details = details

		// Maintains proper stack trace for where our error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError)
		}
	}
}

export class VoilaProductError extends CustomError {
	constructor(
		name: ErrorType | string,
		message: string,
		details?: Partial<Voila.Product> | Partial<Voila.Product>[]
	) {
		super(name, message, details)
	}
}
