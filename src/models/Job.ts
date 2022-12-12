import { IJob } from "./IJob";

export class Job extends IJob<string> {
    constructor (expectedInterval: string, schedulingFrequency: string, task: () => Promise<string>, identifier: string) {
        super(expectedInterval, schedulingFrequency, task, identifier);
    }

    public execute = () : Promise<string> => {
        return this.task();
    }
}