let user = {
  orderlist: [],
  menulist: [
    {
      id: 1,
      mealName: "McFlurry® with Oreo®",
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

  let orderedlist = JSON.parse(localStorage.getItem("new")); //converts str into obj

  if (!orderedlist) {
    order.innerHTML = "<h3>No orders yet.</h3>";
  } else {
    orderedlist.forEach(function (lalagyan) {
      orderlist += `<li>${lalagyan.mealName}<br>${lalagyan.price}</li>`;
    });
    order.innerHTML = orderlist;
  }
}

function del() {
  localStorage.removeItem("new");
  // let ords = JSON.parse(localStorage.getItem("new"));
  // ords.pop();
  // localStorage.setItem("new", JSON.stringify(ords));
  showorder();
}

function delRecent() {
  // localStorage.removeItem("new");
  let ords = JSON.parse(localStorage.getItem("new"));
  ords.pop();
  localStorage.setItem("new", JSON.stringify(ords));
  showorder();
}

user.showproducts();
showorder();
