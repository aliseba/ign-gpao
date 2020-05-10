{
    const formreader = require('./renderer-process/formio');

    let myForm = undefined;
    for (var i = 0; i < document.getElementsByTagName("form").length; i++) {
        let elem = document.getElementsByTagName("form")[i];
        if (elem.hasAttribute('class') && document.currentScript.hasAttribute('params')) {
             if (elem.getAttribute('class') == document.currentScript.getAttribute('params')) {
                myForm = elem;
             }
        }
    }
    
    const exec = require('child_process').exec;

    function execute(command, callback) {
        exec(command, (error, stdout, stderr) => {
            callback(stdout);
        });
    };
    
     let onButtonClick_test = function() {
        if (myForm == undefined)   {
            dialog.showErrorBox('Error', 'impossible to find a form of class ' + document.currentScript.getAttribute('params'))
        }
        jsonData=formreader.retrieve_parameters(myForm);
         
        let commands = document.getElementsByTagName('commands');
        if (commands == undefined)   {
            return;
        }
         
        let  directory  = commands[0].getAttribute('directory');
        console.log('commands[0]: ', commands[0])
        console.log('directory: ', directory)
        var path = require('path');
        var filename = path.join(directory, 'parameters.json');
        formreader.save_parameters(jsonData, filename)
                
         var  executelist = commands[0].getElementsByTagName('execute');

         for (var i in executelist) {
             var cmd = executelist[i].innerHTML;
             if (cmd == null) {
                 break;
             }
             cmd=cmd.replace("$PARAM$", filename)
             cmd=cmd.replace("$DIRECTORY$", directory)
             console.log('cmd:', cmd)
             
             // call the function
             execute(cmd, (output) => {
                 console.log(output);
             });
         }
    }
    
    let onButtonClick_test2 = function() {
       if (myForm == undefined)   {
           dialog.showErrorBox('Error', 'impossible to find a form of class ' + document.currentScript.getAttribute('params'))
       }
       jsonData=formreader.retrieve_parameters(myForm);
      //Création dynamique du formulaire
       var form = document.createElement('form');
       form.setAttribute('method', 'POST');
       form.setAttribute('action', 'creategpao');
       //Ajout des paramètres sous forme de champs cachés
       for(var cle in jsonData) {
           var champCache = document.createElement('input');
           champCache.setAttribute('type', 'text');
           champCache.setAttribute('name', cle);
           champCache.setAttribute('value', jsonData[cle]);
           form.appendChild(champCache);
       }

      // The form needs to be a part of the document in
      // order for us to be able to submit it.
      document.body.append(form);
      form.submit();
   }

    let onButtonClick = function() {
        if (myForm == undefined)   {
            dialog.showErrorBox('Error', 'impossible to find a form of class ' + document.currentScript.getAttribute('params'))
        }
        jsonData=formreader.retrieve_parameters(myForm);
        
        const { dialog, currentWindow } = require('electron').remote;

        let options = {
            //Placeholder 1
        title: "sauvegarder les parametres",
            buttonLabel : "sauvegarder",
            filters :[  {name: 'Json file', extensions: ['json']}  ]
        }
        if (myForm == undefined) {
            dialog.showErrorBox('Error', 'impossible to find a form of class ' + document.currentScript.getAttribute('params'))
        }
       
        dialog.showSaveDialog(currentWindow, options).then(result => {
            if(result.canceled == false) {
                formreader.save_parameters(jsonData, result.filePath)
             }
        }).catch(err => {
          console.log(err)
        })
    };
    
    let  asyncBtn  = document.querySelector('#'+document.currentScript.getAttribute('name'));
    asyncBtn.addEventListener("click", onButtonClick_test);
}
