const userData = require('./mock/modules/sum.json');
const address = require('./mock/modules/address_table.json');
module.exports = {
  publicPath: './',
    outputDir: "dist",
    devServer: {
        port:4000,
        open:true,
        proxy:{
          '/api':{
            target:'http://localhost:8089',
          }
        },
        before(app){
          app.get('/sum/list',(req,res,next)=>{
            res.json(userData);
          })
          app.get('/address/list',(req,res,next)=>{
            res.json(address);
          })
        },
      }

}