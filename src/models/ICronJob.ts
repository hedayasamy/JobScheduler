export interface ICronJob {
    run: () => Promise<void>;
}