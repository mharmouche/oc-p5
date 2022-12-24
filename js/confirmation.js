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
}
// End of file
orderId = "";
init1();

document.getElementById("orderId").innerHTML = "<br>" + orderId;
