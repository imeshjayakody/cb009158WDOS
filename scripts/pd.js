let overallOrder = [];
let currentOrder = [];
let favFlag = false;

  //calculates current order
  function addCurrentOrder(type, choice, qty, dur, cost){
    if(qty > 0){
      
      var ttl = parseInt(qty)*parseInt(cost);
      document.getElementById("current_ttl").innerHTML = ttl;
      console.log(ttl);
      var current = [type, choice, qty, dur, ttl];
      var flag = false;
      for(var i = 0; i < currentOrder.length; i++){
        if(currentOrder[i][0]===type && currentOrder[i][1] === choice){
          currentOrder[i] = current;
          flag = true;
          break;
        }
      }
      if(currentOrder.length <= 0 || flag === false){
        currentOrder.push(current);
      }
      console.log("Current: " + currentOrder);
      appendCurrentItem();
      if(favFlag === false){
        alert("Ticket Added To The Current Order");
      }

    }else{
      alert("Ticket Quantity Must Be Greater Than 0");
    }

  };


  //append current items
  function appendCurrentItem(){
    var html = '';
    var total = 0;
    for(var i = 0; i < currentOrder.length; i++){
      html += '<div class="flex item-details">'+
      '<span class="cart-item">'+ currentOrder[i][0] +'</span>'+
       '<span class="cart-item">'+ currentOrder[i][1] +'</span>'+
       '<span class="cart-item">'+ currentOrder[i][2] +'</span>';
       if(currentOrder[i][0] === "Extra"){
         html+='<span class="cart-item"> - </span>';
       }else{
         html+='<span class="cart-item">'+ currentOrder[i][3] +'</span>';
       }
       html += '<span class="cart-item">'+ currentOrder[i][4] +'</span>'+
       '<i onclick="removeItem('+i+');" style="color:red;cursor:pointer;" class="fa fa-trash" aria-hidden="true"></i>'+
     '</div>';

     total += parseInt(currentOrder[i][4]);
    }
    document.getElementById("current_ttl").innerHTML = total;
    document.getElementById("current_items").innerHTML='';//clear the current items
    document.querySelector('#current_items').insertAdjacentHTML('afterbegin', html);//append the elements
  };

  function removeItem(index){
    currentOrder.splice(index, 1);
    appendCurrentItem();
  }

  //append items to the overall order
  function appendOverallItem(){
    var html = '';
    var total = 0;
    for(var i = 0; i < overallOrder.length; i++){
      html += '<div class="flex item-details">'+
      '<span class="cart-item">'+ overallOrder[i][0] +'</span>'+
       '<span class="cart-item">'+ overallOrder[i][1] +'</span>'+
       '<span class="cart-item">'+ overallOrder[i][2] +'</span>';
       if(overallOrder[i][0] === "Extra"){
         html+='<span class="cart-item"> - </span>';
       }else{
         html+='<span class="cart-item">'+ overallOrder[i][3] +'</span>';
       }
       html += '<span class="cart-item">'+ overallOrder[i][4] +'</span>'+
     '</div>';

     total += parseInt(overallOrder[i][4]);
    }
    document.getElementById("total_cost").innerHTML = total;
    document.getElementById("overall_items").innerHTML=''; //clear the current items
    document.querySelector('#overall_items').insertAdjacentHTML('afterbegin', html);//append the elements
  };

// store loyalty in the local storage
  function addLoyalty(){
    var loyalty = 0;
    if(overallOrder.length > 3){
      for(var i = 0; i < overallOrder.length; i++){
        loyalty += 20;
      }
    }else {
      loyalty = 0;
    }
    localStorage.setItem("Loyalty", loyalty);
    console.log(localStorage.getItem("Loyalty"));
  }

// retrieve loyalty points from the local storage
  function getLoyalty(){
    var loyalty = localStorage.getItem("Loyalty");
    if(loyalty != null){
      alert("TOTAL LOYAL POINTS EARNED: " + loyalty);
    }else{
      alert("No Loyalty Points Available");
    }
  }

// add favourite order to local storage
  function addFavourite(){
    if(currentOrder.length > 0){
      localStorage.setItem("Favourite", JSON.stringify(currentOrder));
      console.log("Favourite: " + JSON.parse(localStorage.getItem("Favourite")));
    }else{
      alert("Current Order Is Empty");
    }

  }

// get favourite order from the local storage
  function getFavourite(){
    // split and assign the favourite order to an array
    var temp = JSON.parse(localStorage.getItem("Favourite"));
    if(temp.length > 0){
      favFlag = true;
      for(var i = 0; i< temp.length; i++){
        addCurrentOrder(temp[i][0], temp[i][1], temp[i][2], temp[i][3], temp[i][4]);
      }
    }else{
      alert("Favourites Not Available");
    }
    alert("Your Favourite Order Is Added To The Current Order");
    favFlag = false;
  }

// place curretn order
  function placeOrder(){
    addLoyalty();
    alert("Purchase Confirmed. Thank You For Your Reservation.");
    // reset the page
    location.reload();
  }

// add current order to overall order
  function addToOrder(){
    if(currentOrder.length > 0){
      overallOrder = currentOrder;
      appendOverallItem();
      // reset current order
      document.getElementById("current_items").innerHTML='';
      document.getElementById("current_ttl").textContent = 0;
      currentOrder = [];
      var qtys = document.getElementsByName("quantity");
      var selects = document.getElementsByName("duration");
      qtys.forEach(function(e) { e.value = 0; });
      selects.forEach(function(e) { e.selectedIndex = 0; });
    }else{
      alert("Current Order Is Empty");
    }

  }
