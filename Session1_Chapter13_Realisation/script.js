let listComp =[
    {nom: "SERVER ADMIN" , code: "C1"},
    {nom: "HACKER" , code: "C2"},
    {nom: "DESKTOP DEV" , code: "C3"},
    {nom: "MOBILE DEV" , code: "C4"},
    {nom: "WEB DEV" , code: "C5"},
    {nom: "FULLSTACK" , code: "C6"},
    {nom: "DATA SCIENTIST" , code: "C7"},
    {nom: "DATA ANALYST" , code: "C8"}


]
alert("Welcome to the quiz about computer science 💻");

let score = 0;
let totalQuestions = listComp.length;

for (let i = 0; i < totalQuestions; i++){
// ask a random quesition
    let index = Math.floor(Math.random() * listComp.length);
     let question = listComp[index];
     


    //ask the user the question
    let answer = prompt("what is the code of : "+ listComp[index].nom + " ?");




// if the user typing nothing or type space...
    if (answer === null || answer.trim() === "") 
    {
    alert("You didn't answer❗❗❗" );
    //repeat the iteration for the same question
    i--;
    continue;
    }
if (answer === listComp[index].code  )
{
    
    alert("Your answer is correct ✅")
    score++;
}
else{
     alert("Your answer is incorrect ❌" + " the correct answer is : " + listComp[index].code);

}
     //use splice to remove the question from the list
     listComp.splice(index, 1);
}

alert("your score is : " + score + " / " + totalQuestions +" ✅");
alert("Thank you for participating in the quiz 🙏");



