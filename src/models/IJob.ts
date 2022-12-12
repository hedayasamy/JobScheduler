import { convertToSeconds } from "../helpers/helpers";

export abstract class IJob <T> {
    expectedInterval: string;
    schedulingFrequency: string;
    private _schedulingFrequencyInSeconds: number;
    task: () => Promise<T>;
    identifier: string;
    expectedRunDate: Date;


    constructor (expectedInterval: string, schedulingFrequency: string, task: () => Promise<T>, identifier: string) {
        this.expectedInterval = expectedInterval;
        this.schedulingFrequency = schedulingFrequency;
        this._schedulingFrequencyInSeconds = convertToSeconds(schedulingFrequency);
        this.task = task;
        this.identifier = identifier;
        this.expectedRunDate = new Date(new Date().getTime() + this._schedulingFrequencyInSeconds * 10)
    }


    abstract execute: () => Promise<T>;
}