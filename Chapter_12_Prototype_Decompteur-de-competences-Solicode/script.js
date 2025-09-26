// création de tableu
let competences =["C1","C0","C1","C3","C5","C9","C6","C4","C2","C1"];
// un object pour stocker les valeur avec leur répetition 
//Tableau associative
let count = {}; 

//creation d'une oucle for for la repition

for( let i = 0; i < competences.length;i++){
let item = competences[i]
if (count[item])
{
    //Modification de la valeur de la clé item 
count[item]++;
}else
{
    //Nouvelle entrée dans le tablaeu : key = item value = 1
    count[item] = 1;
}
}


//affichage de resultat

for(let j in count){
    console.log(j+ " repeat "+ count[j]);
}

