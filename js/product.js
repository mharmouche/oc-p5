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


