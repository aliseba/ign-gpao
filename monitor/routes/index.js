const jobs = require('./../middlewares/job')
const projects = require('./../middlewares/project')
const clusters = require('./../middlewares/cluster')
const router = require('express').Router()
const ejse = require('ejs-electron')


// home page
router.get('/', function(req, res) {
    var electron = 'off';
    if (req.query.electron) electron = req.query.electron;
    var ihm = ''
    if (req.query.json) ihm = req.query.json;
    console.log('electron',electron)
    console.log('ihm',ihm)
    ejse.data('electron', 'on');
    ejse.data('json', 'ihm.json');
    res.render('pages/index');
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
