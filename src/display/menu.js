const {Menu, BrowserWindow} = require('electron')

var template = [
    {
        label:"home",
        submenu:[
            {
                label:"about",
                click:function(){
                    var newWin = new BrowserWindow({
                        width:200,
                        height:200
                    })
                    newWin.loadFile('#/about')
                    newWin.on('close',()=>{
                        newWin=null
                    })
                }
            }
         ]
    }
]
/*将设置好的菜单模版应用上去*/
var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)