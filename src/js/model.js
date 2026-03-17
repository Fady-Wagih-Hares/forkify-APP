 import { async } from "regenerator-runtime";
 import { API_URL  ,RES_PER_PAGE , KEY} from "./config.js";
//  import { getJSON ,sendJSON } from "./helpers.js";
 import { AJAX } from "./helpers.js";
 
 export const state = {
     recipe: {},
    search:{
        query: '',
        results:[],
        page:1,
        resultsPerPage:RES_PER_PAGE
    },
    bookMarks:[],
 
}

// fetching recipe from forkfiy api
const createRecipeObject = function(data){
 const { recipe } = data.data;
       return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            ...(recipe.key && {key:recipe.key}),
            // the same
            // key: recipe.key
        };
}


export const loadRecipe = async function(id){
    try{

    const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
       state.recipe= createRecipeObject(data)
        // console.log(state.recipe);
        if(state.bookMarks.some(bookMark => bookMark.id === id))
            state.recipe.bookMarked = true
        else
            state.recipe.bookMarked = false

    }catch(err){
        // Temp error handling
        console.error(`${err}❌❌❌`);
        throw err
    }
    
}

// the controller tell it what should search for
export const loadSearchResults = async function (query){
    try{
        state.search.query = query
        // getJSON returns promise
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
        // console.log(data);
       state.search.results=  data.data.recipes.map(recipe => {
            return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url,
             ...(recipe.key && {key:recipe.key}),
            }
        })
        // console.log(state.search.results);
        state.search.page = 1;
    }catch(err){
        console.error(`${err}❌❌❌`);

        throw err

    }
}
// not async function we have async function to load the content already
export const getSearchResultPage = function(page = state.search.page){
    // calc the number of results in each page
    state.search.page = page
const start = (page - 1) * state.search.resultsPerPage//0
const end = page * state.search.resultsPerPage //9
    // part of results
    // console.log(start , end);
    return state.search.results.slice(start,end)
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings
        // newQu = oldQu * newServings / oldServings 2 * 8 / 4 = 4
    })

    // update servings in state
    state.recipe.servings = newServings
}

const persistBookMarks = function(){
localStorage.setItem('bookmarks' ,  JSON.stringify(state.bookMarks))
}


// push the recipe into an array
export const  addBookMark = function(recipe){
    // add Bookmark
state.bookMarks.push(recipe);
    // mark current recipe as bookmarked
    if(recipe.id === state.recipe.id)
        state.recipe.bookMarked = true
    persistBookMarks()
    
}
// when add something => get the entire data | when remove something get the id => common pattern in programming 
export const deleteBookmark = function(id){
    // calc index 
    const index = state.bookMarks.findIndex(el => el.id === id)
    // delete bookmark from array => splice
state.bookMarks.splice(index , 1)

    // mark current recipe as not bookmarked
    if(id === state.recipe.id)
        state.recipe.bookMarked = false

    persistBookMarks()
    
}

const init = function(){
const storage = localStorage.getItem('bookmarks')
if(storage) state.bookMarks = JSON.parse(storage)
}
init()
// console.log(state.bookMarks);
// clear localstorage
const clearBookmarks = function(){
    localStorage.clear('bookmarks')
}
// clearBookmarks()
// do request to API
export const uploadRecipe = async function(newRecipe){
    // console.log(Object.entries(newRecipe));
    // convert an object into array
    try{
const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !=='').map(ing =>{

        // const ingArr = ing[1].replaceAll(' ' , '').split(',')
        const ingArr = ing[1].split(',').map(el => el.trim())
        if(ingArr.length !== 3) throw new Error('Wrong Ingredient Format! Please Use The Correct Format :)')
            const [quantity ,unit , description]=  ingArr  
        // console.log(quantity,unit,description);


      return {quantity: quantity ? +quantity : null , unit , description}
})
                // console.log(ingredients);
//  create object to upload it 
const recipe ={
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
}
//   console.log(recipe);

const data = await AJAX(`${API_URL}?key=${KEY}` ,recipe)
// console.log(data);
state.recipe = createRecipeObject(data)
addBookMark(state.recipe)
    }catch(err){
        throw err
    }


}