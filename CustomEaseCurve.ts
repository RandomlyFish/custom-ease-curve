export namespace ICustomEaseCurve {
    export interface Timestamp {
        time : number,
        value : number,
        velocity : number
    }
}

export default class CustomEaseCurve {

    private _timestamps : ICustomEaseCurve.Timestamp[];

    constructor(timestamps : ICustomEaseCurve.Timestamp[]) {
        this._timestamps = timestamps;

        if (this._timestamps.length < 2) {
            throw "Unable to create custom ease curve, there needs to be at least 2 timestamps";
        }

        if (this._timestamps[0].time < 0) {
            throw "Unable to create custom ease curve, one of the provided timestamps has a time value which is less than 0";
        }

        let latestTimestampTime : number = this._timestamps[0].time;
        for (let i = 1; i < this._timestamps.length; i++) {
            if (this._timestamps[i].time < latestTimestampTime) {
                throw "Unable to create custom ease curve, one of the timestamps has a lower time value than the previous one";
            }
            latestTimestampTime = this._timestamps[i].time;
        }
    }

    getValueAtTime(time : number) : number {
        let fromTimestamp : ICustomEaseCurve.Timestamp = this._timestamps[0];
        let toTimestamp : ICustomEaseCurve.Timestamp = this._timestamps[1];

        for (let i = 1; i < this._timestamps.length; i++) {
            if (time < this._timestamps[i].time || i === this._timestamps.length - 1) {
                fromTimestamp = this._timestamps[i - 1];
                toTimestamp = this._timestamps[i];
                break;
            }
        }

        const durationBetweenTimestamps : number = toTimestamp.time - fromTimestamp.time;

        if (durationBetweenTimestamps === 0) {
            return toTimestamp.value;
        }

        const progressBetweenTimestamps : number = (time - fromTimestamp.time) / durationBetweenTimestamps;
        const valueIncrease : number = toTimestamp.value - fromTimestamp.value;

        let valueFromStart : number = fromTimestamp.value;
        valueFromStart += valueIncrease * fromTimestamp.velocity * progressBetweenTimestamps;
        
        let valueFromEnd : number = toTimestamp.value;
        valueFromEnd -= valueIncrease * toTimestamp.velocity * (1 - progressBetweenTimestamps);

        return this._lerp(valueFromStart, valueFromEnd, progressBetweenTimestamps);
    }

    private _lerp(from : number, to : number, amount : number) : number {
        return from * (1 - amount) + to * amount;
    }
}