/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  //creating empty array, then we will push the data to it
  const results = [];

  //change n , v , a to noun verb adjective
  const positions ={
    n:"noun" ,
    v:"verb",
    a:"adjective"
  }


  const words = rawStory.split(" ");
words.map(word=>{

  //check the word has positons or not, it's like (went[v]) or like (to ,the , and ... )
if(word.includes("[")){
// true, the word has position then

// get the word only without the [v] [a] [n], output=> Louis , went , not look like louis[n] went[v]
let getTheWord =word.substring(0,word.indexOf("["));

//get the positions inside the [], output =>( [n] => n ), a , v ... , and change them to noun, adj , adverb by positons [n or a or v]
let getThePositions = positions[word.substring(word.indexOf("[")+1 , word.indexOf("]"))];

//push the word and with it's positions to the empty array
results.push({word:getTheWord , pos:getThePositions})
// if the word include dot or comma and at the same time include the [] like =>(fun[a].) , (store[n],)
if(word.includes(',')){
  results.push({word: ','})
}
else if(word.includes('.')){
results.push({word: '.'})

} 

} 

else {
  // if the word has no positions or not include "[]", like (to, for, and , then ...)

//if the word does not include dot and comma  like (to, for, and , then ...)
if(!word.includes(".")&& !word.includes(",")){
results.push({word:word})
}

// if the word include dot like (guess.)
else if(word.includes(".")){

  // get the word only without the dot like ( guess. => guess)
  let getTheWordWithoutTheDot= word.substring(0 , word.indexOf("."))

  //push the word 
  results.push({word:getTheWordWithoutTheDot})


  // get the dot without the the word like (guess. => .)
  let getTheDot=word.substring(word.indexOf("."))

  // push the dot to the array
  results.push({word:getTheDot})
} 
//if the word include comma (,) 
else if(word.includes(",")){
 // get the word only without the comma like ( guess, => guess)
 let getTheWordWithoutTheComma= word.substring(0 , word.indexOf(","))

 //push the word 
 results.push({word:getTheWordWithoutTheComma})


 // get the comma without the the word like (guess, => ,)
 let getTheComma=word.substring(word.indexOf(","))

 // push the comma to the array
 results.push({word:getTheComma})
}
}
})

console.log(results)

  return {}; // This line is currently wrong :)

}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
