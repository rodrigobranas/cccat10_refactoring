import FareCalculatorHandler from "./FareCalculatorHandler";
import Segment from "./Segment";

export default class PeakTimeFareCalculatorHandler implements FareCalculatorHandler {
	FARE = 6;

	constructor (readonly next?: FareCalculatorHandler) {
	}

	calculate(segment: Segment): number {
		if (segment.isPeakTime()) {
			return segment.distance * this.FARE;
		}
		if (!this.next) throw new Error();
		return this.next.calculate(segment);
	}

}