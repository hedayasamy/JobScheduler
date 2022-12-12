import { CronJob } from "./models/CronJob";
import { Job } from "./models/Job";

 const cronJob = new CronJob();
 const promise3 = (): Promise<string> =>  {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('promise3');
    }, 0);
  });
}

const promise2 = (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('promise2');
    }, 0);
  });
}

const promise1 =  (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('promise1');
    }, 0);
  });
}

const promise4 =  (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('promise4');
    }, 0);
  });
}

 const job1 = new Job("10s", "100s", promise1, "1234"); 
 const job2 = new Job("100s", "100s", promise2, "1235");
 const job3 = new Job("100s", "10s", promise3, "1236");
 const job4 = new Job("100s", "200", promise4, "1237");
 cronJob.addNewJob(job1);
 cronJob.addNewJob(job2);
 cronJob.addNewJob(job3);
 (async () => {
  await cronJob.run();
 })()
 cronJob.addNewJob(job4);

export {
  CronJob
};
