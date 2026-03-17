import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js'; 
// polyfilling everthing else
import 'core-js/stable'
// polyfilling async /await
import 'regenerator-runtime/runtime'
import { MODEL_CLOSE_SEC } from './config';
// this component does not have to knew about DOM 
// const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2
// https://forkify-api.jonas.io

///////////////////////////////////////

// Rendering Spinner
// console.log('test');
// Parcel
if(module.hot){
  module.hot.accept()
} 

const controlRecipes = async function () {
  try {
    // Get id | window.location => url
    const id = window.location.hash.slice(1)
// console.log(id);
if(!id) return;
recipeView.renderSpinner();
// 0 - Update Results view to mark selected search result
    resultsView.update(model
    .getSearchResultPage())
        // 1- Updating Bookmarks view
    //  debugger;
    bookmarksView.update(model.state.bookMarks)
    // 2- Loading recipe
    await model.loadRecipe(id)
    //  const {recipe} = model.state
    // 3- Rendering Recipe
    // more descriptive | alot cleaner
    recipeView.render(model.state.recipe)
    // if you will export the whole class => not cleaner
    // const recipeView = new recipeView(recipe)
    
 
  } catch (err) {
    console.error(err.message);
    recipeView.renderError()
  }
};
// controlRecipes();

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner()
    // console.log(resultsView);
    // 1- Get Search Query
    // never store it because it does not return any  thing it just manipulate the state
const query = searchView.getQuery()
    if(!query) return;
    // 2- Load Search Results
  await  model.loadSearchResults(query)

    // 3- Render Results
        // console.log(model.state.search.results);
      // resultsView.render(model.state.search.results)
      // console.log(model.getSearchResultPage(1));
      resultsView.render(model.getSearchResultPage())
      // Pagination after display the result
      // 4- Render The Initial Pagination Buttons
      PaginationView.render(model.state.search)
      
    }catch(err){
      console.error(err);
    }
  

}

const controlPagination = function(goToPage){
  // console.log(goToPage);
      // 1)- Render New Results
        resultsView.render(model.getSearchResultPage(goToPage))
 
      // 2)- Render New Pagination Buttons
      PaginationView.render(model.state.search)
}
const controlServings = function(newServings){
  // Update the recipe servings (in state) => model
  model.updateServings(newServings)

  // Update recipe View also
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

// control bookMark
const controlAddBookMark = function(){
  // console.log(model.state.recipe.bookMarked);
  // 1- ADD || Remove Bookmark
  if(!model.state.recipe.bookMarked)
model.addBookMark(model.state.recipe)
else
model.deleteBookmark(model.state.recipe.id)
// console.log(model.state.recipe);
  // 2- Update Recipe View
recipeView.update(model.state.recipe)

  // 3- Render Bookmarks
  bookmarksView.render(model.state.bookMarks)
}

const controlBookMarks = function(){
  bookmarksView.render(model.state.bookMarks)
} 

const controlAddRecipe =async function(newRecipe){
  try{
    // Show Loading Spinner

    addRecipeView.renderSpinner()
    // console.log(newRecipe);
    // Upload the new Recipe Data
   await  model.uploadRecipe(newRecipe)
  //  console.log(model.state.recipe);
   // Render Recipe
   recipeView.render(model.state.recipe)

  // Success Message  
    addRecipeView.renderMessage()
    // Render Bookmark View
    bookmarksView.render(model.state.bookMarks)
  // Change ID in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
  //  close form window
  setTimeout(function(){
    addRecipeView.toggleWindow()
  }, MODEL_CLOSE_SEC * 1000)
  }catch(err){
    console.error('❌' , err);
    addRecipeView.renderError(err.message)
    
  }
}
const init = function(){
  bookmarksView.addHandlerRender(controlBookMarks)
  // publisher | subscriber Pattern
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookMark(controlAddBookMark)
  searchView.addHandlerSearch(controlSearchResults)
  PaginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}
init()