// Parent Class
import icons from 'url:../../img/icons.svg'; // Parcel 2

class View{

_data;

    render(data , render = true){
      if(!data || (Array.isArray(data) && data.length ===0)) return this.renderError()
        this._data = data
        const markup = this._generateMarkup()
        if(!render) return markup
        this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
}
  update(data){
  //  if(!data || (Array.isArray(data) && data.length ===0))
  //   return this.renderError() 
          this._data = data
        const newMarkup = this._generateMarkup()
        // convert string into real dom node object (big object lives in the memory virtual dom) we can use this dom as it was a real dom
        const newDom = document.createRange().createContextualFragment(newMarkup)
        // covert nodelist to array
        const newElements = Array.from(newDom.querySelectorAll('*'))
        // return NodeList
        // console.log(newElement);
        // the actual element the the page now
        const curElements = Array.from(this._parentElement.querySelectorAll('*'))
      // console.log(curElements);
      // console.log(newElements);
      // compare 
      newElements.forEach((newEl , i) =>{
          const curEl = curElements[i]
          // console.log( curEl,newEl.isEqualNode(curEl));
          // update DOM when it changed | Update Change Text
          // firstChild => contains the text
          // nodeValue =>text
          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !==''){
            // console.log( '☀️',newEl.firstChild.nodeValue.trim());
            curEl.textContent = newEl.textContent
          }
          // Updates Change Attributes
          if(!newEl.isEqualNode(curEl)){
            // console.log(newEl.attributes);
            // convert to array and loop on attributes
            // console.log(Array.from(newEl.attributes));

            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name , attr.value)
          )
          }
      })
  }
    _clear(){
        this._parentElement.innerHTML =''
    }

 renderSpinner () {
  const markup = `<div class="spinner">
          <svg>
            <use href="${icons}svg#icon-loader"></use>
          </svg>
        </div> `;
    this._clear();
  this._parentElement.insertAdjacentHTML('afterbegin', markup);
};
    renderError(message = this._errorMessage){
       const markup =    `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
          this._clear()
            this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    // success
renderMessage(message = this._message){
       const markup =    `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
          this._clear()
            this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

}

// we are not going to create instance with view we need the class itself

export default View;