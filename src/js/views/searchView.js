// Get Query and listening for click event

class SearchView{
_parentElement = document.querySelector('.search')
    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value
        this._clearInput()
        return query
    }
    _clearInput(){
        this._parentElement.querySelector('.search__field').value =''
    }
    // publisher
    
    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit' , function(e){
            e.preventDefault()
            // control search result function
             handler()
        })
    }


}

export default new SearchView()