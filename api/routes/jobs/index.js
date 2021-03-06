const router = require('express').Router()
const { query, body, param, oneOf } = require('express-validator/check');

const jobs = require('./../../middlewares/jobs')

router.get('/job/ready', jobs.getJobReady)

router.get('/jobs', jobs.getAllJobs)

router.post('/job/:id/:status(done|failed)/:return_code',
    body('log').exists(),
    jobs.updateJobStatus)

router.put('/job', 
    body('command').exists(),
    jobs.insertJob)

module.exports = router
