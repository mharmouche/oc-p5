//global variable 
gCart = {};
//host of API
baseURL = "https://azure-brainy-echidna.glitch.me";


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
	gCart = JSON.parse(localStorage.cart);
}
// End of file
// GetPrice : recuperation des prix et description 
function GetPrice(id){
	//copie de la cart actuelle en gCart
  	let gcart = JSON.parse(localStorage.cart);
	//ajout des prix et description
	id = gcart.kanap[1].id;
	url =  baseURL + "/api/products/"+id;
	fetch(url)
	  .then(function(res) {
	    if (res.ok) {
		return res.json();
	    }
	  })
	.then(function(value) {
		//response = value;
		let ret = {}:
		let ret.price = value.price;
		let ret.altTxt = value.price;
		return ret;
	
	  })
	  .catch(function(err) {
	    // Une erreur est survenue

		console.log(err);
	  });
	
	
	
	
	
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
	totalQuantity = 0;
	cart = JSON.parse(localStorage.cart);
	for (k of cart.kanap){
		total += k.price * k.quantity;
		totalQuantity += parseInt(k.quantity);
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	document.getElementById('totalPrice').innerHTML = total;
	document.getElementById('totalQuantity').innerHTML = totalQuantity;
};

// manipulation quantity
function manipQuantity(){
	const itemQuantitys = document.querySelectorAll('.itemQuantity');

	itemQuantitys.forEach(itemQuantity => {
	    itemQuantity.addEventListener('change', (event) => {
			//alert(`You like ${event.target.value}`);
			
			
			const nodeMap = itemQuantity.parentNode.parentNode.parentNode.parentNode.attributes;
			
			let id = nodeMap[1].value;
			let color = nodeMap[2].value;
		
			// adjust localStorage, estimate total
			let cart = JSON.parse(localStorage.cart);
			let index = cart.kanap.findIndex(k => (k.id === id) && (k.color === color));
		    	// make sure that is not float nor NaN
		    	let newQuantity = parseInt(event.target.value);
		    	newQuantity = isNaN(newQuantity)?0:newQuantity;//quantity is int
		    	newQuantity = (newQuantity<1)?1:newQuantity;//quantity not less than 1
		    
			event.target.value = newQuantity;
		    	cart.kanap[index].quantity = String(newQuantity);
		    
		    
			localStorage.setItem('cart', JSON.stringify(cart));
			refreshTotal();
	    }); 
	});
}
//End manipumation 

// test API post
boutton = document.getElementById("order");
boutton.addEventListener("click", testOrder);
//interrupt form as in https://html.form.guide/snippets/html-submit-button-onclick-code/
document.getElementsByClassName("cart__order__form")[0].setAttribute("onSubmit", "return false");  
//verifForm to check if all information are given properly
function verifForm(){
	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let address = document.getElementById("address").value;
	let city = document.getElementById("city").value;
	let email = document.getElementById("email").value;
	
	regName = /^[A-Za-z]+$/;
	regAddress = /^[A-Za-z0-9 ]/;
	regCity = /^[A-Za-z ]/;
	regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;;
	
	let result = 0;
	result &= firstName.match(regName) != null;
	if (firstName.match(regName) == null){return 1}
	result &= lastName.match(regName) != null;
	if (lastName.match(regName) == null){return 2}
	
	result &= address.match(regAddress) != null;;
	if (address.match(regAddress) == null){return 3}
	
	result &= city.match(regCity) != null;;
	if (city.match(regCity) == null){return 4}
	
	result &= email.match(regEmail) != null;;
	if (email.match(regEmail) == null){return 5}
	
	console.log('Validation = ' + result);
	return result;
}

//End verifForm()

function testOrder(){
	//url + json body
	let url = "https://azure-brainy-echidna.glitch.me/api/products/order/";
	//exit testOrder() if test not OK
	//if (verifForm() !=0) { alert("Formulaire Incorrect!");return false;}
	if (verifForm() == 1) { alert("pérnom Incorrect!");return false;}
	if (verifForm() == 2) { alert("nom Incorrect!");return false;}
	if (verifForm() == 3) { alert("addresse Incorrect!");return false;}
	if (verifForm() == 4) { alert("ville Incorrect!");return false;}
	if (verifForm() == 5) { alert("Email Incorrect!");return false;}
	

	let content = {};content.contact = {};
	//Get  data from form and localStorage
	content.contact.firstName = document.getElementById("firstName").value;
	content.contact.lastName = document.getElementById("lastName").value;
	content.contact.address = document.getElementById("address").value;
	content.contact.city = document.getElementById("city").value;
	content.contact.email = document.getElementById("email").value;
	content.products = []; 
	//get product list
	JSON.parse(localStorage.cart).kanap.forEach(k => content.products.push(k.id));
	//remove duplication content.products
	let arrAUX = [];
	for (let k of content.products){
		if(arrAUX.indexOf(k) === -1){
                arrAUX.push(k);
            } 
	}
	content.products = arrAUX;
	
	console.log(content.products);
		
	let strBody =  JSON.stringify(content);
		
	//send request to kanap api
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
//document.getElementById('totalPrice').innerHTML = total;
//document.getElementById('totalQuantity').innerHTML = totalQuantity;


refreshTotal();
initSupprimer();
manipQuantity();
