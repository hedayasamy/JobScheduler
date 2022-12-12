/*import { workerData, parentPort, isMainThread } from'worker_threads'

// const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const min = 2;

const run = (task: any) => {
    var fn = new Function('return ' + task)();
    fn()
}

if(isMainThread) {
    console.log('main thread start...');
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
        console.log(`Worker: ${msg}`);
      });
    console.log("doing some random work in main thread..!!");
}else{
    if(parentPort) {
        parentPort.postMessage('hello from worker thread');
        run(workerData.task)
    }
   
}
*/

/*
 if (parentPort) {
    parentPort.postMessage(run(workerData.task))
 }*/
// @ts-ignore
// parentPort.postMessage(hardCalculations(workerData.fibNumb))
