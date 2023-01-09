// to be organised in externl js and called.
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
}
// End of file

init0();

// add event for button
boutton = document.getElementById("addToCart");
boutton.addEventListener("click", addToCart);

function addToCart(){
	let id = response._id;
	let name = response.name;
	let color = document.getElementById('colors').value;
	let quantity = document.getElementById('quantity').value;
	let price = response.price;
	
	let imageUrl = response.imageUrl;
	let altTxt = response.altTxt;

	if (color == ''){
		alert("Verifier le choix des couleurs SVP!");
	}else if (quantity == '' || quantity <1 || quantity >100) {
		alert("Verifier les quantités SVP!");
	}else {
		let item = {};
		item.id = id;
		item.name = name;
		item.color = color;
		item.quantity = parseInt(quantity);// we can not buy a part of item
		item.quantity = (item.quantity>100)?100:item.quantity;//quantity not grater than 100
		document.getElementById('quantity').value = item.quantity;
		//item.price = price;
		item.imageUrl = imageUrl;
		//item.altTxt = altTxt;

		let cart = JSON.parse(localStorage.cart);
		
		//pour eviter la duplication
		let index = cart.kanap.findIndex(k => (k.id === item.id) && (k.color === item.color));
		if (index === -1){//new
			cart.kanap.push(item);
		}else{//exists
			//test total < 100
			let newTotal = String (parseInt(cart.kanap[index].quantity) + parseInt(item.quantity));
			if (newTotal > 100) {alert("le total est > 100, déjà dans votre pannier " + cart.kanap[index].quantity + "items"); return;}
			else {cart.kanap[index].quantity = newTotal;}
			//cart.kanap[index].quantity = String (parseInt(cart.kanap[index].quantity) + parseInt(item.quantity));
		}
		
		localStorage.setItem('cart', JSON.stringify(cart));

		alert(`Ajout à votre panier!\n ${item.quantity} canapé(s) de type ${item.name}`);
	}	
}

// End of addToCart V1 , use localStorage

id = window.location.href.split('id=')[1];
url =  baseURL + "/api/products/"+id;

// get data
response= {};
fetch(url)
  .then(function(res) {
    if (res.ok) {
      	return res.json();
    }
  })
  .then(function(value) {
	response = value;
	document.title = response.name ;

	price = document.getElementById('price');
	price.innerHTML = response.price;


	description = document.getElementById('description');
	description.innerHTML = response.description ;


	colors = response.colors;
	options = document.getElementById('colors');
	optionsHTML = options.innerHTML  + '\n';
	for (color of colors)
	{
		//console.log(color);
		optionsHTML += '<option value="'+ color +'">'+ color +'</option>' + '\n';
	}
	options.innerHTML = optionsHTML ;


	image = document.getElementsByClassName("item__img")[0];
	image.innerHTML = '<img src="'+response.imageUrl+'"alt="'+response.altTxt +'">';

  })
  .catch(function(err) {
    // Une erreur est survenue
	
    	console.log(err);
  });


