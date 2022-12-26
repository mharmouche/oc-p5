// to be organised in externl js and called.

// initialisation : init localStorage
function init1(){
  let cart0 = '{"orderId":"","total":0,"kanap":[]}';
  if (localStorage.cart == null){

      localStorage.setItem( 'cart', cart0);

  };
  let cart = JSON.parse(localStorage.cart);
  orderId = cart.orderId;
  localStorage.setItem( 'cart', cart0);
  // identify in case of refrech, bck to main page
  orderId2 = new URLSearchParams(window.location.search).get('orderId');
  if ((orderId2 == null) || (orderId !== orderId2))
  {
    window.location.href = `./index.html`;
  }
 
}
// End of file
orderId = "";
init1();

document.getElementById("orderId").innerHTML = "<br>" + orderId;

