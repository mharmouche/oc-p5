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

// get all data
let url =  baseURL + "/api/products";
var response;
fetch(url)
  .then(function(res) {
    if (res.ok) {
      	return res.json();
    }
  })
  .then(function(value) {
	response = value;
	var innera = '';
	for (let i in response){
		//console.log(i);
		let id = response[i]._id;
		let imageUrl = response[i].imageUrl;
		let description = response[i].description;
		let altTxt = response[i].altTxt;
		let name = response[i].name;
		let a ='';
		a +='<a href="./product.html?id=' + id + '">' + '\n';
		a +=  '<article>' + '\n';
		a += '<img src="' + imageUrl +'" alt="'+ altTxt + '">' + 

	'\n';
		a += '<h3 class="productName">' + name +'</h3>' + '\n';
		a += '<p class="productDescription">' + description + '</p>' 

	+ '\n';
		a += '</article> \n </a>' + '\n';
		console.log(a);
		innera += a;
	}


	let items = document.getElementById('items');
	items.innerHTML = innera;

  })
  .catch(function(err) {
    // Une erreur est survenue
	
    	console.log(err);
  });

