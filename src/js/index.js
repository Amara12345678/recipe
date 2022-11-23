require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
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

const r = new Recipe(47746);
r.getRecipe();
