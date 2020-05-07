    function loadJson (jsonfile)
    {
        const { BrowserWindow } = require('electron').remote
        var jsonfile = '../data/'+jsonfile;
        ihm_data = require(jsonfile)['ihm'];
        ejse.data('electron', 'on');
        ejse.data('json', ihm_data);
        BrowserWindow.loadURL('file://' + __dirname + '/../views/pages/creation.ejs')
    }
