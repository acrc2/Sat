var cnf="hole5.cnf";
var resp=solve(cnf);
console.log(resp);
var specOk=false;
function solve(cnf){
	var fs=require('fs');
	var file=fs.readFileSync(cnf,"utf8");
	var result=readFormula(file);
	var sat=doSolve(result.variables,result.clauses);
	return sat;
}
function readFormula(file) {
	            var linha=file.split('\n');
                let clauses= readClauses(file,linha);
                let variables = readVariables(clauses,linha);
               
                let result ={'clauses':[],'variables':[]}
               specOk=specOk(clauses,linha);
                if(specOk==true){ 	
                result.clauses=clauses;
                result.variables=variables;
            }
                return result;
} 
function readClauses(file,linha){
                let clause=new Array;
                let pos =0;
                for (var i =0; i <linha.length; i++) {
                if(linha[i].charAt(0)!= 'c' && linha[i].charAt(0)!='p'&& linha[i]!=''){
                var x = linha[i].split(' ');
                clause[pos]=x;
                pos++;
                               }
                }
                return clause;
}             
function readVariables(file,linha){
                let variaveis = new Array;
                var k;
                for (var i = 0; i<linha.length; i++) {
                  if(linha[i].charAt(0)=='p'||linha[i].charAt(3)=='n'){
                 k=linha[i].split(' ');
                               }
                }
for (var i = 0; i <parseInt(k[2]); i++) {
                variaveis[i]=0;
}
                return variaveis;
}
function nextAssignment(result){
var bin = '';
  for (var i = 0; i <result.length; i++) {
bin= bin+ result[i];
  }
bin = parseInt(bin , 2);
bin++;
bin=bin.toString(2);
var x = result;
var y=0;
var z = x.length-bin.length;
for (var i = 0; i <x.length; i++) {
	if(i<z){
		x[i]=0;
	}else{
		x[i]=parseInt(bin.charAt(y));
		y++;
	}
}
return x;
}
function doSolve(assigns,clauses){
	let isSat=false;
	let satifyingAssignment=new Array;
	let ouAssignment=new Array;
	let aAT=false;
	let c;
		var e =0;
	while(isSat==false && aAT==false){
	      for(e=0;e<clauses.length;e++){
	let ouBoolean=false;
			for (var i = 0; i <clauses[e].length-1; i++) {
				if(clauses[e][i]>0){
					c=clauses[e][i]-1;
					ouAssignment[i]=assigns[c];
					if(assigns[c]==1){
						ouBoolean=true;
					}
				}else{
					c=(-1*clauses[e][i])-1;
						if(assigns[c]==0){
						ouAssignment[i]=1;
						ouBoolean=true;
					}else{
						ouAssignment[i]=0;
					}
				}
			}
            if (ouBoolean==true){
				satifyingAssignment[e]=1;
			}else{
				satifyingAssignment[e]=0;
			}
		}
		isSat=true;
		for(i=0;i<satifyingAssignment.length;i++){
			if(satifyingAssignment[i]==0){
				isSat= false;
			}
		}
		aAT=true;
		for (var i = 0; i <assigns.length; i++) {
			if (assigns[i]==0) {
				aAT=false;
			}
		}
		if(isSat==false)
		assigns=nextAssignment(assigns);
			}			
        let result={'isSat':isSat,'satifyingAssignment':null}
        if 	(isSat==true){
        	result.satifyingAssignment=assigns;
        }
        return result;	
}
function specOk(clausulas,linha){
	let m;
	for (var i = 0; i<linha.length; i++) {
                  if(linha[i].charAt(0)=='p'||linha[i].charAt(3)=='n'){
		         var l=linha[i].split(' ');
                 m=l[3];
                               }
                }              
	if(clausulas.length==m){
		specOk=true;
	}
	return specOk;
}