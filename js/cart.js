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
			//console.log('box clicked', event);
			//deleteItem.setAttribute('style', 'background-color: yellow;');
			//deleteItem.parentNode.setAttribute('style', 'background-color: orange;');
			//deleteItem.parentNode.parentNode.setAttribute('style', 'background-color: green;');
			//deleteItem.parentNode.parentNode.parentNode.setAttribute('style', 'background-color: blue;');
			//deleteItem.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'background-color: red;');
			//deleteItem.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'background-color: cyan;');
			
			const nodeMap = deleteItem.parentNode.parentNode.parentNode.parentNode.attributes;
			//let text = "";
			//for (let i = 0; i < nodeMap.length; i++) {
			//  text += nodeMap[i].name + " = " + nodeMap[i].value + "<br>";
			//}
			//console.log(text);
			let id = nodeMap[1].value;
			let color = nodeMap[2].value;
		
			// remove element from localstorage,  delete it visually, estimate total
			let cart = JSON.parse(localStorage.cart);
			cart.kanap = cart.kanap.filter(k => (k.id !== id) || (k.color !== color));
			localStorage.setItem('cart', JSON.stringify(cart));
			refreshTotal();
			
			deleteItem.parentNode.parentNode.parentNode.parentNode.remove() ;
		});
	});
}
//initSupprimer()  for test event
function refreshTotal(){
	total = 0;
	cart = JSON.parse(localStorage.cart);
	for (k of cart.kanap){
		total += k.price * k.quantity;
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	document.getElementById('totalPrice').innerHTML = total;
};

// test API post
boutton = document.getElementById("order");
boutton.addEventListener("click", testOrder);

function testOrder(){
	//url + json body
	let url = "https://azure-brainy-echidna.glitch.me/api/products/order/";

	let content = {};content.contact = {};
	content.contact.firstName = "Mohamed";
	content.contact.lastName = "Harmouche";
	content.contact.address = "37 rue le Fontaine";
	content.contact.city = "le Havre";
	content.contact.email = "mohamed@fayezbok.lb";
	content.products = ["107fb5b75607497b96722bda5b504926"];
	let strBody =  JSON.stringify(content);
		
	//test8 : send request to kanap api
	fetch(url, {
	    method: "POST",
	    headers: {
	      'Accept': 'application/json', 
	      'Content-Type': 'application/json'
	    },
	    body: strBody
	})
	  .then(function(res) {
	    if (res.ok) {
	      return res.json();
	    }
	  })
	  .then(function(value) {
		let orderId = value.orderId;
		console.log("orderId : " + orderId);
		let cart = JSON.parse(localStorage.cart);
		cart.orderId = orderId;
		localStorage.setItem('cart', JSON.stringify(cart));
		window.location.href = `./confirmation.html?orderId=${orderId}`;
	  });

	
	
	
};
//end testOrder
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
