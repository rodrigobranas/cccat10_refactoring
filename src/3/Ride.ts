import Segment from "./Segment";

export default class Ride {
	SUNDAY_OVERNIGHT_FARE = 5;
	OVERNIGHT_FARE = 3.9;
	SUNDAY_FARE = 2.9;
	NORMAL_FARE = 2.1;
	MIN_FARE = 10;

	segments: Segment[];

	constructor () {
		this.segments = [];
	}

	addSegment (distance: number, date: Date) {
		this.segments.push(new Segment(distance, date));
	}

	calculateFare () {
		let fare = 0;
		for (const segment of this.segments) {
			if (segment.isOvernight() && segment.isSunday()) {
				fare += segment.distance * this.SUNDAY_OVERNIGHT_FARE;
			}
			if (segment.isOvernight() && !segment.isSunday()) {
				fare += segment.distance * this.OVERNIGHT_FARE;
			}
			if (!segment.isOvernight() && segment.isSunday()) {
				fare += segment.distance * this.SUNDAY_FARE;
			}
			if (!segment.isOvernight() && !segment.isSunday()) {
				fare += segment.distance * this.NORMAL_FARE;
			}
		}
		return (fare < this.MIN_FARE) ? this.MIN_FARE : fare;
	}
}