## How to use

```javascript
const cronJob = new CronJob();
 const task1 = () :Promise<string> =>  {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('task1');
    }, 0);
  });
}

const task2 = () :Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('task2');
    }, 0);
  });
}

const task3 =  () :Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('task3');
    }, 0);
  });
}

const task4 =  () :Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('task4');
    }, 0);
  });
}

 const job1 = new Job("500s", "1d", task1, "1234");
 const job2 = new Job("1m", "1m", task2, "1235");
 const job3 = new Job("3m", "1h", task3, "1236");
 cronJob.addNewJob(job1);
 cronJob.addNewJob(job2);
 cronJob.addNewJob(job3);
 (async () => {
  await cronJob.run();
 })()
 const job4 = new Job("5s", "200s", task3, "1237");
 cronJob.addNewJob(job4);

```

## To instantiate a new CronJob

```javascript

const cronJob = new CronJob();

```

## Job
A new Job takes 
- ExpectedRunTimeInterval: (the time the task should take to run eg: 100s)
- schedulingFrequency: (the frequency for which the job should should run eg: 1h)
- task: an asynchronous function that will be executed
- uniqueIdentifier: A unique job identifier

```javascript

const job = new Job("10s", "100s", (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('promise4');
    }, 0);
  });
}, "1234"); 

```


## Brief description of the solution
- This is just an implementation of CronJob as a priority queue 
  where the user can add jobs with 

## Reasoning behind your technical decisions.
- language (typescript) : i am most familiar with it
- priority queue : just to keep track of the order of each task

## Example snippets from a run:
<img width="1680" alt="Screen Shot 2022-12-12 at 23 30 36" src="https://user-images.githubusercontent.com/11944690/207158763-9da462af-8f36-43fd-84f4-b2ffbeecd7fe.png">


## Future Enhancements
- Find a better way to keep track of identifiers to track duplicates, as this could run of memory if number of jobs is huge.
- Maybe do a true parallelism by using something like worker threads in javascript instead of asynchronous calls (expecially if we are running one intensive task and two tasks that are really fast this would block the cron job to run any other tasks till the intensive job finishes)
- Use a better logger library
- Add more validation on user input (for example make sure expectedInterval is in the right format)
- Add more test cases
