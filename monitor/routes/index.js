const jobs = require('./../middlewares/job')
const projects = require('./../middlewares/project')
const clusters = require('./../middlewares/cluster')
const router = require('express').Router()


// home page
router.get('/', function(req, res) {
    var electron = 'off';
    if (req.query.electron) electron = req.query.electron;
    var ihm_file = '';
    if (req.query.ihm_file)
    {
       ihm_file = req.query.ihm_file;
    }
    res.render('pages/index', {electron:electron, ihm_file:ihm_file});
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

// New project page
router.get('/creation', function(req, res) {
    console.log('no ihm file found')
})

  
// New project page
router.get('/creation/:electron/:ihm_file', function(req, res) {
   var ihm_data = {}
   var electron='off'
   if (req.params.electron) {
           electron = req.params.electron
   }
   if (req.params.ihm_file) {
           console.log('ihm_file (index.js)', req.params.ihm_file)
           const fs = require('fs');
           let rawdata = fs.readFileSync(req.params.ihm_file);
           ihm_data = JSON.parse(rawdata);
           if (ihm_data.hasOwnProperty('ihm')) {
               ihm_data = ihm_data['ihm'];
           }
           else {
               ihm_data = {}
               console.log('uncorrect json file for ihm description')
           }
    }
    res.render('pages/creation', {electron:electron,ihm_data:ihm_data})
})

module.exports = router
