import { Duration } from "./Duration"

export default {
	title: "common/Duration",
	component: Duration,
}

export const Default = {
	args: {
		duration: "PT15M",
	},
}

export const AnHourOrMore = {
	args: {
		duration: "PT1H2M",
	},
}

export const LessThanOneMinute = {
	args: {
		duration: "PT0M10S",
	},
}

export const NullishDuration = {
	args: {
		duration: undefined,
	},
}

export const MalformedDuration = {
	args: {
		duration: "I dunno, about ten mins maybe?",
	},
}
