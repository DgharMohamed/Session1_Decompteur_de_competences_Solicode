//Chapite : variable
//Somme
let a = 18;
let b = 10;

let Somme = a + b;
console.log("la somme de a et b est : ", Somme );

//mutiplication

let mutiplication = a * b;
console.log("la somme de a et b est : ", mutiplication);

//Div
let Div = a / b ;
console.log("la divisions de a et b est : " + Div);


//Conditions if else

let i = 10, j = 0;
if (i < j)
{
    console.log("i is less then j")
}
else if (i > j)
{
    console.log("i is larger than j")
}
else {
    console.log("i is equal to j")
}

//other one 

let x = 20;

if (x < 18) {

    console.log("mineur")
}
else {
    console.log("majeur")
}




//Les fonctions simple

function testing() 
{
console.log("Hello my name is Mohamed")
}
testing(); // call the function
///function exmaple
function age(a) {
    if (a > 16 && a < 35) {
        console.log("this is the perfect age to learn programming");
    }else{
        console.log("it's not the perfect time to start programing");
    }
}
let Mohamed = 22;
let Marwan = 37;

age(Mohamed);
age(Marwan);



///Les Boucles
//Boucles For

for (let i = 0; i <= 10; i = i+1)
{
console.log(i)
}


for( let i = 1; i <= 2; ++i)
{
    console.log("Professeur : " + i)

    for (let j = 1; j <= 3; j++)
    {
        console.log("Etudiant : " + j)
    }
}


//Boucle Break

for (let i = 0; i < 10; i++)
{
    if (i == 4)
    {
        break;
    }
    console.log(i);
}
//Boucle While
let s = 0;
while (i = 5)
{
    console.log(i);
    i++
}
//

do {
    console.log("Hello to SoliCode")
    W++;
}
while (w < 10)

do {
    console.log("welcome home")
    f++

}while (f < 6)








