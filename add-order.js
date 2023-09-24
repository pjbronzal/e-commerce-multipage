let user = {
  orderlist: [],
  menulist: [
    {
      id: 1,
      mealName: "McFlurry with Oreo",
      price: 59,
      image: "img/McFlurry with Oreo.png",
    },
    { id: 2, mealName: "Samsung", price: 30000 },
    { id: 3, mealName: "Vans", price: 3000 },
    { id: 4, mealName: "Dell Laptop", price: 40000 },
  ],
  orderedlist: [],
  showproducts() {
    let menu = document.getElementById("menu-list");
    let menulist = "";
    // Loop for Array
    this.menulist.forEach(function (lalagyan) {
      menulist += `
      <div class="col-md-3">
        <div class="card mb-3">
            <p id="ids${lalagyan.id}" hidden>${lalagyan.id}</p>
            <img id="image${lalagyan.id}" src="${lalagyan.image}" class="card-img-top">

            <div class="card-body">
                <h5 class="card-title" id="menu${lalagyan.id}">${lalagyan.mealName}</h5>
                <div class="row">
                <div class="col-6 fw-bold price" id="price${lalagyan.id}">₱${lalagyan.price}.00</div>
                    <div class="col-6 text-end">
                    <button class="btn btn-sm btn-warning" onclick="addOrder(${lalagyan.id})">+</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
    });
    menu.innerHTML = menulist;
  },
};

orderedlist = localStorage.getItem("new");

function addOrder(id) {
  let array = JSON.parse(localStorage.getItem("new"));

  if (array == null) {
    user.orderedlist = [];
    let new_id = document.getElementById("ids" + id).innerText;
    let new_order = document.getElementById("menu" + id).innerText;
    let new_price = document.getElementById("price" + id).innerText;

    user.orderedlist.push({
      id: new_id,
      mealName: new_order,
      price: new_price,
    });
    localStorage.setItem("new", JSON.stringify(user.orderedlist));
    showorder();
  } else {
    user.orderedlist = JSON.parse(localStorage.getItem("new"));
    let new_id = document.getElementById("ids" + id).innerText;
    let new_order = document.getElementById("menu" + id).innerText;
    let new_price = document.getElementById("price" + id).innerText;

    user.orderedlist.push({
      id: new_id,
      mealName: new_order,
      price: new_price,
    });
    localStorage.setItem("new", JSON.stringify(user.orderedlist));
    showorder();
  }
}

function showorder() {
  let order = document.getElementById("order");
  let orderlist = "";

  let orderedlist = JSON.parse(localStorage.getItem("new"));

  if (!orderedlist) {
    order.innerHTML =
      "<div class='container text-center'><small>No orders yet. Add something from the menu.</small></div>";
  } else {
    orderedlist.forEach(function (lalagyan, index) {
      orderlist += `
        <div class="row">
          <div class="col-2 text-center">
              <button class="btn p-0 border-0" onclick="deleteThisOrder(${index})"><i class="fa-regular fa-circle-xmark"></i></button>
          </div>
  
          <div class="col-7 text-start">
              <li>${lalagyan.mealName}</li>
          </div>
  
          <div class="col-3 text-end">
              <li>${lalagyan.price}</li>
          </div>
        </div>
        `;
    });
    order.innerHTML = orderlist;
  }
}

function deleteThisOrder(index) {
  let orderedlist = JSON.parse(localStorage.getItem("new"));

  if (index !== -1) {
    orderedlist.splice(index, 1);

    if (orderedlist.length === 0) {
      localStorage.removeItem("new");
    } else {
      localStorage.setItem("new", JSON.stringify(orderedlist));
    }

    showorder();
  }
}

function del() {
  localStorage.removeItem("new");
  showorder();
}

function delRecent() {
  let ords = JSON.parse(localStorage.getItem("new"));
  ords.pop();
  localStorage.setItem("new", JSON.stringify(ords));
  showorder();
}

user.showproducts();
showorder();
