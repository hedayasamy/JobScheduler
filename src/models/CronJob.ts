import {
    PriorityQueue,
    ICompare,
  } from "@datastructures-js/priority-queue";
import { ICronJob } from "./ICronJob";
import { IJob } from "./IJob";
import { Job } from "./Job";
const testMode: boolean = process.env.NODE_ENV === 'test'
  
const compareScheduledTime: ICompare<IJob<string>> = (a: IJob<string>, b: IJob<string>) => {
    if (a.expectedRunDate > b.expectedRunDate) {
      return 1;
    }
    return -1;
  };

export class CronJob implements ICronJob {
    scheduledTasks : PriorityQueue<IJob<string>>
    concurrency: number;
    identifiers: Set<string>
    _concurrencyCount: number|undefined = undefined;

    constructor (threads = 2) {
        this.scheduledTasks = new PriorityQueue<IJob<string>>(compareScheduledTime);
        this.concurrency = threads
        this.identifiers = new Set();
    }

    _sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    _shouldRun () {
        if (testMode) {
            return (this._concurrencyCount === undefined || this._concurrencyCount < 1)
        }

        return true;
    }
    
    async run () {
        while(this._shouldRun()) {
            this._concurrencyCount = 1;
            const currentJobs: Array<IJob<string>> = []
            while (true && (this._concurrencyCount === undefined || this._concurrencyCount <= this.concurrency) && !this.scheduledTasks.isEmpty()) {
                let currentJob = this.scheduledTasks.front();
                if (currentJob.expectedRunDate > new Date()) {
                    break;
                }
                currentJob = this.scheduledTasks.dequeue();
                this._concurrencyCount++;
                currentJobs.push(currentJob)
                const newJob = new Job(currentJob.expectedInterval, currentJob.schedulingFrequency, currentJob.task, currentJob.identifier);
                this.scheduledTasks.push(newJob);
                if (testMode) {
                    console.info('currently running in test mode')
                    break;
                }
            }
            if (currentJobs.length) {
                Promise.all(currentJobs.map(currentJob => {
                    let start = Date.now();
                    console.log(`Executing Job: ${currentJob.identifier}`);
                    return currentJob.task()
                    .then(value => ( { value, t: Date.now() - start} ))
                    .then((time) => {
                        console.info(`Expected Run Time for job ${currentJob.identifier} : ${currentJob.expectedInterval}`);
                        console.info(`Actual Run Time for job ${currentJob.identifier} : ${time.t}s`);
                    });
                }))
            } else {
                await this._sleep(100);
            }
        }
    }

    addNewJob (job: IJob<string>) {
        if (this.identifiers.has(job.identifier)) {
            throw new Error('A Job with the same identifier has been previously added. Please select aother value for the identifier.');
        }
        this.identifiers.add(job.identifier);
        this.scheduledTasks.enqueue(job);
        console.log(`Job: ${job.identifier} was added successfully`);
    }
}
