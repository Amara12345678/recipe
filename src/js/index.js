require("@babel/polyfill");
import Search from "./model/search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";
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
    //4)  hailtiig guitsetgene
    await state.search.doSearch();
    //5) hailtiiin ur dung delgetsend uzuulne
    if (state.search.result === undefined) alert("илэрц олдсонгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
