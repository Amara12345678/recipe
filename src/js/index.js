require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import list from "./model/list";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";
import List from "./model/list";
import { sample } from "lodash";
//web appin tuluw
//-hailtiin query , vr dun
//-vzvvlj baigaa jor
//- like l san joruud
//-zahialsan joriin nairlaga

const state = {};

const controlSearch = async () => {
  //1) webees hailtiin tulhuur ugiig gargaj awna
  const query = searchView.getInput();

  if (query) {
    //2)shineer hailtiin object uusgej ugnu
    state.search = new Search(query);
    //3) hailt hiihed zoriulj interface iig beltgene
    searchView.clearSearchquery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //4)  hailtiig guitsetgene
    await state.search.doSearch();
    //5) hailtiiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("илэрц олдсонгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/***
 * joriin controller
 */
const controlRecipe = async () => {
  //1 url ees id iig awna
  const id = window.location.hash.replace("#", "");
  if (!state.likes) state.likes = new Like();

  //url deer id baigaa esehiig shalgana
  if (id) {
    //2 joriin modeliig uusgene
    state.recipe = new Recipe(id);
    //3 UI delgitsiig beltgene
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);

    //4 joroo tataj awchirna
    await state.recipe.getRecipe();

    //5 joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    //6 joroo delgetsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

window.addEventListener("load", (e) => {
  //shineer like model app ehlhed vvsgene
  if (!state.likes) state.likes = new Like();

  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

  //like uud baiwal tsesend nemj haruulna
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});
/**
 *nairlagii controller
 */

const controlList = () => {
  //nairlaganii model uusgene
  state.list = new List();
  //omno haragdaj maisan nairlagiig delgestees arilgana
  listView.clearItems();
  //ug model ruu odoo haragdaj baigaa jornii buh nairlaguug hiine
  state.recipe.ingredients.forEach((n) => {
    //tuhain nairlagiig model ruu hiinee
    const item = state.list.addItem(n);
    // tuhain nairlagiig delgetsend gaargana
    listView.renderItem(item);
  });
};

/**
 * like controller
 */
const controlLike = () => {
  //1 likeiin modeliig uusgenne
  if (!state.likes) state.likes = new Like();
  //2 odoo haragdaj baigaa joriin id g olj awah
  const currentRecipeId = state.recipe.id;
  //3 ene joriig lakelsan esehiig shalgah
  if (state.likes.isLiked(currentRecipeId)) {
    //likelsan bolgoh
    state.likes.deleteLike(currentRecipeId);
    //like iin tsesnees ustgana
    likesView.deleteLike(currentRecipeId);
    //likelsan baidliig boliulah
    likesView.toggleLikeBtn(false);
  } else {
    //like hiij ugnu

    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    //like tsesend ene likeiig oruulah
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  //click hiisen li iin dataid iig shuuj awah
  const id = e.target.closest(".shopping__item").dataset.itemid;

  // oldson id tai ortsiig modeloos ustgana
  state.list.deleteItem(id);

  //deletsees id tai ortsiig olj ustgana
  listView.deleteItem(id);
});
