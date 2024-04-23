const winston = require("winston");

const { combine, timestamp, prettyPrint , json } = winston.format;


const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        prettyPrint()

    ),
    // format: winston.format.json(),
    
    // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    ],
});


function buildLogger( service ){

    return {
        log: (message) => {
            // console.log('service');
            // console.log(service);
            logger.log( 'info', 
                {
                    message, 
                    service,
                    // at: new Date().toISOString()
                }  
            )
        },
        error: (message) => {
            // console.log('err');
            // console.log(service);
            logger.error( 'error', {message , service}  )
        }
    }

}

module.exports = {
    buildLogger
}