import { elements } from "./base";
//private function
const renderRecipe = (recipe) => {
  const markup = `<li>
  <a class="results__link " href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;
  //ul ruuge nemne
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
export const clearSearchquery = () => {
  elements.searchInput.value = "";
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //hailtiin ur dung huudaslaj uzuuleh
  //page = 2, start = 10 end = 20
  const start = (currentPage - 1) * resPerPage;

  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  //huudaslaltiin towchuudiig gargaj ireh
  const toatlPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, toatlPages);
};

const createButton = (
  page,
  type,
  direction
) => `  <button class="btn-inline results__btn--${type}"data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>

</button>`;

const renderButtons = (currentPage, toatlPages) => {
  let buttonHtml;

  if (currentPage === 1 && toatlPages > 1) {
    //1r huudsan der baina 2r huudas gedeg towchiig gargana
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < toatlPages) {
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
    // omnoh bolon daraachiin huudas ruu shiljih towchiig uzuulne
  } else if (currentPage === toatlPages) {
    //hamgiin suuliin huudas deer bna
    buttonHtml = createButton(currentPage - 1, "prev", "left");
    //omnohruu shiljuuleh towchiig uzuulne
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
