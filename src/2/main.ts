function isSunday (date: Date) {
	return date.getDay() === 0;
}

function isOvernight (date: Date) {
	return date.getHours() >= 22 || date.getHours() <= 6;
}

function isValidDistance (distance: number) {
	return distance != null && distance != undefined && typeof distance === "number" && distance > 0;
}

function isValidDate (date: Date) {
	return date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date";
}

const SUNDAY_OVERNIGHT_FARE = 5;
const OVERNIGHT_FARE = 3.9;
const SUNDAY_FARE = 2.9;
const NORMAL_FARE = 2.1;
const MIN_FARE = 10;

export function calculateRide (segments: any[]) {
	let fare = 0;
	for (const segment of segments) {
		if (!isValidDistance(segment.distance)) throw new Error("Invalid distance");
		if (!isValidDate(segment.date)) throw new Error("Invalid date");
		if (isOvernight(segment.date) && isSunday(segment.date)) {
			fare += segment.distance * SUNDAY_OVERNIGHT_FARE;
		}
		if (isOvernight(segment.date) && !isSunday(segment.date)) {
			fare += segment.distance * OVERNIGHT_FARE;
		}
		if (!isOvernight(segment.date) && isSunday(segment.date)) {
			fare += segment.distance * SUNDAY_FARE;
		}
		if (!isOvernight(segment.date) && !isSunday(segment.date)) {
			fare += segment.distance * NORMAL_FARE;
		}
	}
	return (fare < MIN_FARE) ? MIN_FARE : fare;
}