import { save, load } from './locale-storage';
import render from './render-favorite';

export default (() => {

    const FAV_KEY = 'favorite';

    const refs = {
        favList: document.querySelector('.favorite-list'),
    }

    const { favList } = refs;

    favList.addEventListener('click', onRemoveBtnClick);

    function onRemoveBtnClick(e) {

        if (e.target.classList.contains('js-from-fav')) {

            let dataArr = load(FAV_KEY);

            dataArr.splice(findCardIndexByCardID(e.target.parentNode.parentNode.id), 1);
        
            save(FAV_KEY, dataArr);
            
            insertMarkupToUL(dataArr);

        } else {
            console.log('you clicked outside the button');
        }
    }


    // returns index of the object to delete
    function findCardIndexByCardID(cardID) {
      return load(FAV_KEY).findIndex(obj => obj.id === cardID);
    }

   function modifyData(dataArr) {
       if (dataArr.length > 0) {
            
           return dataArr.map(obj => obj.dataString);            
       } 

       favList.innerHTML = " "; 
    }

     // returns markup
    function makeFavoriteMarkup(dataArr) {
        return modifyData(dataArr).join("");  
    }

    function insertMarkupToUL(dataArr) {
        favList.innerHTML = `<li class="favorite-item">${makeFavoriteMarkup(dataArr)}</li>`;
    }
    
});