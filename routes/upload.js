const
	fs = require('fs'),
	csv=require('csvtojson'),
	mainDb = require('../db/main');
  
module.exports.recebe = _recebe;


function _recebe(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  let arquivo = req.files.file;
  let temporario = req.files.file.path;
  let novo = './uploads/' + concatDateTime() + '.csv';
  
 	fs.rename(temporario, novo, function(err){
 		readCSV(novo); 		
 		if(err){
 			res.status(500).json({error: err})
 		}
 		res.json({message: "enviado com sucesso.", file: novo});
 	})
}



function concatDateTime(){
	let date = new Date();  
  	let day = date.getDate();
  	let monthIndex = date.getMonth() + 1;
  	let year = date.getFullYear();
  	let minutos = date.getMinutes();
  	let horas = date.getHours();
  
  	let dateConcat = `${year}_${monthIndex}_${day}-${horas}_${minutos}`;

  	return dateConcat;
};

function readCSV(caminhoArquivo){
	let	csvFilePath = caminhoArquivo; 

  	//Lendo arquivo csv
	csv()
	.fromFile(csvFilePath)
	.on('json',(jsonObj)=>{
		mainDb.setDB(jsonObj);
   	console.log(jsonObj);
	})
	.on('done',(error)=>{
    console.log('end')
	});
}