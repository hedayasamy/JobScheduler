// import {
//     PriorityQueue,
//     ICompare,
//   } from "@datastructures-js/priority-queue";
// import { ICronJob } from "./ICronJob";
// import { IJob } from "./IJob";
// import { Job } from "./Job";
// const testMode: boolean = process.env.NODE_ENV === "test"
// import { Worker } from "worker_threads"
// import cluster from 'node:cluster';

// // wrap the creating worker thread into Promise
// // for convenience;
// // "workerData" will be accessible in worker-file via "worker_threads" package
// // it can be any type
// // @ts-ignore
// function runService(workerData: any) {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker('./src/models/worker', { workerData });
//     worker.on('message', resolve);
//     worker.on('error', reject);
//     worker.on('exit', (code) => {
//       if (code !== 0)
//         reject(new Error(`Worker stopped with exit code ${code}`));
//     })
//   })
// }
// // import { fork } from 'child_process';
  
// const compareScheduledTime: ICompare<IJob> = (a: IJob, b: IJob) => {
//     if (a.expectedRunDate > b.expectedRunDate) {
//       return 1;
//     }
//     return -1;
//   };

// export class CronJob2 implements ICronJob {
//     scheduledTasks : PriorityQueue<IJob>
//     threads: number;
//     identifiers: Set<string>
//     _thread: number|undefined = undefined;

//     constructor (threads = 2) {
//         this.scheduledTasks = new PriorityQueue<IJob>(compareScheduledTime);
//         this.threads = threads
//         this.identifiers = new Set();
//     }

//     _sleep(ms: number) {
//         return new Promise((resolve) => setTimeout(resolve, ms));
//     }

//     _shouldRun () {
//         if (testMode) {
//             return (this._thread === undefined || this._thread < 1)
//         }

//         return true;
//     }
    
//     async run () {
//         while(this._shouldRun()) {
//             this._thread = 1;
//             const currentJobs: Array<IJob> = []
//             while (true && (this._thread === undefined || this._thread <= this.threads) && !this.scheduledTasks.isEmpty()) {
//                 let currentJob = this.scheduledTasks.front();
//                 if (currentJob.expectedRunDate > new Date()) {
//                     break;
//                 }
//                 currentJob = this.scheduledTasks.dequeue();
//                 this._thread++;
//                 currentJobs.push(currentJob)
//                 const newJob = new Job(currentJob.expectedInterval, currentJob.schedulingFrequency, currentJob.task, currentJob.identifier);
//                 this.scheduledTasks.push(newJob);
//                 if (testMode) {
//                     console.info('currently running in test mode')
//                     break;
//                 }
//             }
//             if (currentJobs.length) {
//                 if (cluster.isPrimary) {
//                     for (let i = 0; i < 6; i++) {
//                         cluster.fork();
//                     }
//                 } else {
//                     var startTime = performance.now()
//                     await Promise.all([
//                         currentJobs[0].task(),
//                         currentJobs[1].task()
//                     ]);
//                     // currentJobs[0].task();
//                     // currentJobs[1].task();
//                     var endTime = performance.now()
//                     console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
//                     await this._sleep(1000)
//                     break;
//                     /*
//                     await Promise.all(currentJobs.map(currentJob => {
//                         let start = Date.now();
//                         console.log(`Executing Job: ${currentJob.identifier}`);
//                         return currentJob.task()
//                         .then(value => ( { value, t: Date.now() - start} ))
//                         .then((time) => {
//                             console.log(`Expected Run Time for job ${currentJob.identifier} : ${currentJob.expectedInterval}`);
//                             console.log(`Actual Run Time for job ${currentJob.identifier} : ${time.t}s`);
//                         });
//                     })).then(process.exit(0)) */
//                 }
                
//                 /*
//                 var startTime = performance.now()
//                 // console.log('hellllllllo')
//                 await Promise.all([
//                     currentJobs[0].task(), 
//                     currentJobs[1].task()
//                 ]);
//                 var endTime = performance.now()
//                 console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
//                 // await this._sleep(100000000); */
//             } else {
//                 await this._sleep(100);
//             }
//         }
//     }

//     addNewJob (job: IJob) {
//         if (this.identifiers.has(job.identifier)) {
//             throw new Error('A Job with the same identifier has been previously added. Please select aother value for the identifier.');
//         }
//         this.identifiers.add(job.identifier);
//         this.scheduledTasks.enqueue(job);
//         console.info(`Job ${job.identifier} has been scheduled succesfully`)
//     }
// }
