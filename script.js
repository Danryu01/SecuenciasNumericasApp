const quiz = document.querySelector('.quiz');
const alternatives = document.querySelector('.alternatives');
let sequences = [];
let sequencesHide = [];

Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

const generateSequence = () => {
	sequences = [];	
	let randomNumber = [1,2,3,4,5,6,7,8,9,10,15,20,25,30,35,40,50,60,100].sample();
	console.log(randomNumber);
	let array = [-1,1];
	let value = array.sample();
	let another = parseInt(Math.floor(Math.random()*1000));
	randomNumber = randomNumber*value;
	for(let i=0;i<6;i++){
		sequences.push(another+randomNumber*(i+1));
	}
}

const hideSomeSequences = () => {
	sequencesHide = [];
	let pos1 = [0,1,2,3,4,5].sample();
	let pos2 = [0,1,2,3,4,5].sample();	
	for(let i=0;i<sequences.length;i++){
		if(i==pos1 || i==pos2){
			sequencesHide.push("_");
		}
		else{
			sequencesHide.push(sequences[i]);
		}
	}
}

const showQuiz = () => {
	for(let i=0;i<sequencesHide.length;i++){
		if(sequencesHide[i]==="_"){
			alternatives.innerHTML += `<div class="alternative"><input class="answer" valueNumber="${i}" type="number"></input></div>`;
		}
		else{
			alternatives.innerHTML += `<div class="alternative">${sequencesHide[i]}</div>`;
		}
	}
}

document.querySelector('#register').addEventListener('click', () => {
	const getAnswersValue = document.querySelectorAll('.answer');
	let result = "";
	getAnswersValue.forEach((answer) => {
		let position = answer.getAttribute("valueNumber");
		let value = answer.value;
		if(sequences[position]==value){
			result = "✔";
		}
		else{
			result = "✘";
		}
		answer.value = result;
	})

})

const cleanHTML = () => {
	document.getElementById("alternatives").innerHTML = "";
}

document.querySelector('#next').addEventListener('click', () => {
	generateSequence();
	hideSomeSequences();
	cleanHTML();
	showQuiz();
})


generateSequence();
hideSomeSequences();
showQuiz();