{
    const formreader = require('./renderer-process/formreader');

    let myForm = undefined;
    for (var i = 0; i < document.getElementsByTagName("form").length; i++) {
        let elem = document.getElementsByTagName("form")[i];
        if (elem.hasAttribute('class') && document.currentScript.hasAttribute('params')) {
             if (elem.getAttribute('class') == document.currentScript.getAttribute('params')) {
                myForm = elem;
             }
        }
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
       
        var fs = require('fs');
        dialog.showSaveDialog(currentWindow, options).then(result => {
            if(result.canceled == false) {
                formreader.save_parameters(jsonData, result.filePath)
             }
        }).catch(err => {
          console.log(err)
        })
    };
    
    let  asyncBtn  = document.querySelector('#'+document.currentScript.getAttribute('name'));
    asyncBtn.addEventListener("click", onButtonClick);
}
