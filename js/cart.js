// initialisation : init localStorage
function init0(){
  let cart0 = '{"orderId":"","total":0,"kanap":[]}';
  if (localStorage.cart == null){

      localStorage.setItem( 'cart', cart0);

  };
  let cart = JSON.parse(localStorage.cart);
  if (cart.kanap.length ==0){
    localStorage.setItem( 'cart', cart0);
  }
}
// End of file

//initSupprimer() to be executer after html DOM construction
function initSupprimer(){
	const deleteItems = document.querySelectorAll('.deleteItem');
	deleteItems.forEach(deleteItem => {
		deleteItem.addEventListener('click', function handleClick(event) {
			console.log('box clicked', event);
			deleteItem.setAttribute('style', 'background-color: yellow;');
		});
	});
}
//initSupprimer() V0 for test event

cart = JSON.parse(localStorage.cart);

total = 0;
document.getElementById('cart__items').innerHTML = '';
for (k of cart.kanap){

	total += k.price * k.quantity;
 
	document.getElementById('cart__items').innerHTML+= `
              <article class="cart__item" data-id="${k.id}" data-color="${k.color}">
                <div class="cart__item__img">
                  <img src="${k.imageUrl}" alt="${k.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${k.name}</h2>
                    <p>${k.color}</p>
                    <p>${k.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${k.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>

	`;

   
	//console.log(total);

}
document.getElementById('totalPrice').innerHTML = total;



initSupprimer();
