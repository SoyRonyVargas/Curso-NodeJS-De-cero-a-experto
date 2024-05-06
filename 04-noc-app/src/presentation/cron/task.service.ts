import { CronJob } from 'cron'

type cronTime = string | Date
type OnTick = () => void
    
export class TaskService {

    static createTask( cronTime : cronTime , onTick: OnTick ) : CronJob {

        const job = new CronJob(
          cronTime,
          onTick
        );

        job.start();

        return job;

    }
    
}