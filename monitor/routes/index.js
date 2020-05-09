const jobs = require('./../middlewares/job')
const projects = require('./../middlewares/project')
const clusters = require('./../middlewares/cluster')
const router = require('express').Router()


// home page
router.get('/', function(req, res) {
    console.log("index.js: home page")
    var electron = 'off';
    res.render('./pages/index', {electron:electron});
});

// job page
router.get('/job', jobs.getJobs, function(req, res) {
    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
  
    res.render('./pages/job', {json:array})
  })
  

// project page 
router.get('/project', projects.getProjects, function(req, res) {
    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
    res.render('./pages/project', {json:array})
})
  
// cluster page 
router.get('/cluster', clusters.getClusters, function(req, res) {
    var array = []

    for(var i in req.body){
      array.push(req.body[i])
    }
    res.render('./pages/cluster', {json:array})
})

// new project page
router.get('/creation', function(req, res) {
           console.log("index.js: creation / get")
           res.render('./pages/creation', {electron:'on', ihm_data:{}});
})
           
// new project page
router.post('/creation', function(req, res) {
    console.log("index.js: creation / post")
    var body = ""
    req.on('data', function (chunk) {
      body += chunk
    })
    req.on('end', function () {
       var ihm_data = JSON.parse(body)
       res.locals.electron = 'on'
       res.render('./pages/creation',{ihm_data:ihm_data['ihm'], electron:'on'})
    })
    req.on('error', function(e) {
         console.log('problem with request: ' + e.message);
    })
})


module.exports = router
