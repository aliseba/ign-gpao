const jobs = require('./../middlewares/job')
const projects = require('./../middlewares/project')
const clusters = require('./../middlewares/cluster')
const router = require('express').Router()


// home page
router.get('/', function(req, res) {
    var electron = 'off';
    if (req.query.electron) electron = req.query.electron;
    var json = ''
    if (req.query.json) json = req.query.json;
   res.render('pages/index', {electron:electron, json:json});
});

// job page
router.get('/job', jobs.getJobs, function(req, res) {
    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
  
    res.render('pages/job', {json:array})
  })
  

// project page 
router.get('/project', projects.getProjects, function(req, res) {
    var array = []
  
    for(var i in req.body){
      array.push(req.body[i])
    }
    res.render('pages/project', {json:array})
})
  
// cluster page 
router.get('/cluster', clusters.getClusters, function(req, res) {
    var array = []

    for(var i in req.body){
      array.push(req.body[i])
    }
    res.render('pages/cluster', {json:array})
})

module.exports = router
