
import View from './view.js'
class PaginationView extends View
{
    _parentElement = document.querySelector('.pagination')

    addHandlerClick(handler){
        // using event delegation
        this._parentElement.addEventListener('click' , function(e){
            // select the button that clicked
            // closest search up DOM Tree like parent
            const btn = e.target.closest('.btn--inline')
            // console.log(btn);
            if(!btn) return;
            const goToPage = +btn.dataset.goto;
            // console.log(goToPage);
            handler(goToPage)
            
        })
    }

    _generateMarkup(){
        const curPage = this._data.page
        // How Many Pages?
        const numPages = Math.ceil( this._data.results.length / this._data.resultsPerPage)
        // console.log(numPages);
        // Page 1 ,and there are other Pages 
        if(curPage === 1 && numPages > 1)
        {

            return `
          <button data-goto="${curPage +1}"  class=" btn--inline pagination__btn--next">
            <span>Page ${curPage +1}</span>
            <svg class="search__icon">
              <use href="#icon-arrow-right"></use>
            </svg>
          </button>`;
        }
        
        // Last Page
        if(curPage === numPages && numPages > 1){
            return `<button  data-goto="${curPage -1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`
        }
        // Other Page 
        if(curPage < numPages){
            return `<button data-goto="${curPage -1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage +1}"class="btn--inline pagination__btn--next">
            <span>Page ${curPage +1}</span>
            <svg class="search__icon">
              <use href="#icon-arrow-right"></use>
            </svg>
          </button>
          `
        }
        // Page 1 ,and there are no other Pages 
        return '';
    }
}
export default new PaginationView()