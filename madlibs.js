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
  const positions = {
    n: "noun",
    v: "verb",
    a: "adjective"
  }


  const words = rawStory.split(" ");
  words.map(word => {

    //check the word has positons or not, it's like (went[v]) or like (to ,the , and ... )
    if (word.includes("[")) {
      // true, the word has position then

      // get the word only without the [v] [a] [n], output=> Louis , went , not look like louis[n] went[v]
      let getTheWord = word.substring(0, word.indexOf("["));

      //get the positions inside the [], output =>( [n] => n ), a , v ... , and change them to noun, adj , adverb by positons [n or a or v]
      let getThePositions = "(" + positions[word.substring(word.indexOf("[") + 1, word.indexOf("]"))] + ")";

      //push the word and with it's positions to the empty array
      results.push({ word: getTheWord, pos: getThePositions })
      // if the word include dot or comma and at the same time include the [] like =>(fun[a].) , (store[n],)
      if (word.includes(',')) {
        results.push({ word: ',' })
      }
      else if (word.includes('.')) {
        results.push({ word: '.' })

      }

    }

    else {
      // if the word has no positions or not include "[]", like (to, for, and , then ...)

      //if the word does not include dot and comma  like (to, for, and , then ...)
      if (!word.includes(".") && !word.includes(",")) {
        results.push({ word: word })
      }

      // if the word include dot like (guess.)
      else if (word.includes(".")) {

        // get the word only without the dot like ( guess. => guess)
        let getTheWordWithoutTheDot = word.substring(0, word.indexOf("."))

        //push the word 
        results.push({ word: getTheWordWithoutTheDot })


        // get the dot without the the word like (guess. => .)
        let getTheDot = word.substring(word.indexOf("."))

        // push the dot to the array
        results.push({ word: getTheDot })
      }
      //if the word include comma (,) 
      else if (word.includes(",")) {
        // get the word only without the comma like ( guess, => guess)
        let getTheWordWithoutTheComma = word.substring(0, word.indexOf(","))

        //push the word 
        results.push({ word: getTheWordWithoutTheComma })


        // get the comma without the the word like (guess, => ,)
        let getTheComma = word.substring(word.indexOf(","))

        // push the comma to the array
        results.push({ word: getTheComma })
      }
    }
  })

  // console.log(results)

  return results; // return array of object in this way  [{ word: "Louis", pos: "noun" }, { word: "to" }, ..etc}]

}
/** buildForm
 * function to build whole the form story
 * storyObjects is the array of ojects (story after parsing)
 */
function buildForm(storyObjects) {
  //store the div  of editStory
  const editStory = document.getElementById("editStory");
  //store the div  of previewStory
  const previewStory = document.getElementById("previewStory");
  let posPrev = [];
  // loop over the array using map
  storyObjects.map((object, index) => {
    let isFirst = true;
    // check if the element has pos like { word: "Louis", pos: "noun" }
    if (object.pos) {
      // build input under editStory parent
      const input = buildInput(editStory, "text", object.pos, index);
      input.addEventListener('keypress', (event) => {
        if (isFirst) {
          posPrev[index].innerHTML = event.key;
          isFirst = false;
        }
        else posPrev[index].innerHTML = posPrev[index].innerHTML + event.key;

      }, false);
      // build label under previewStory parent with green color
      posPrev[index] = buildLabel(previewStory, object.pos, "green");
    }
    // if the element does not have pos like { word: "to" }
    else {
      // build label under editStory parent
      buildLabel(editStory, object.word);
      // build label under previewStory parent
      buildLabel(previewStory, object.word);
    }
  });


}
/** buildInput
 * function to build an input html element <input> </input>
 * parent : the parent of this element
 * type : type of input could be text or password
 * placeholder: the value of the placeholder
 */
function buildInput(parent, type, placeholder, index) {
  //create html element "input" and set some attribuites
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("size", "10");
  //append the created input to its parent
  parent.appendChild(input);
  return input;
}
/** buildLabel
 * function to build an label html element <label> </label>
 * parent : the parent of this element
 * type : type of input could be text or password
 * text: the value of the text
 * color: to determine the color of the lable
 */
function buildLabel(parent, text, color) {
  //create html element "input" and set some attribuites
  const label = document.createElement("label");
  label.style.color = color ? color : "black"
  const node = document.createTextNode(text);
  label.appendChild(node);
  //append the created input to its parent
  parent.appendChild(label);
  return label;

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
    //call buildForm to build the story and pass array of objects "story after parsing"
    buildForm(processedStory);
    // console.log(processedStory);
  });

