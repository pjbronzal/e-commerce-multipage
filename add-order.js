let user = {
  orderlist: [],
  menulist: [
    {
      id: 1,
      mealName: "Mushroom Pepper Steak",
      price: 79,
      image: "img/Mushroom Pepper Steak Rice Bowl Solo.webp",
    },
    {
      id: 2,
      mealName: "Burger McDo Solo",
      price: 44,
      image: "img/Burger Mcdo Solo.png",
    },
    {
      id: 3,
      mealName: "McSpaghetti Solo",
      price: 72,
      image: "img/McSpaghetti Solo.webp",
    },
    {
      id: 4,
      mealName: "McCafé Iced Coffee Original",
      price: 61,
      image: "img/McCafé Iced Coffee Original.webp",
    },
    {
      id: 5,
      mealName: "McCrispy Chicken Sandwich Solo",
      price: 61,
      image: "img/McCrispy Chicken Sandwich Solo.png",
    },
    {
      id: 6,
      mealName: "McCrispy Chicken Fillet Ala King Solo",
      price: 89,
      image: "img/McCrispy Chicken Fillet Ala King Solo.webp",
    },
    {
      id: 7,
      mealName: "McCrispy Chicken Fillet Solo",
      price: 79,
      image: "img/McCrispy Chicken Fillet Solo.webp",
    },
    {
      id: 8,
      mealName: "McDonald's Medium Fries",
      price: 60,
      image: "img/Medium Fries.webp",
    },
    {
      id: 9,
      mealName: "McFlurry® with Oreo®",
      price: 59,
      image: "img/McFlurry with Oreo.png",
    },
    {
      id: 10,
      mealName: "Hot Fudge Sundae",
      price: 53,
      image: "img/Hot Fudge Sundae.webp",
    },
    {
      id: 11,
      mealName: "Coke McFloat Medium",
      price: 55,
      image: "img/Coke McFloat.png",
    },
    {
      id: 12,
      mealName: "Lipton Iced Tea",
      price: 79,
      image: "img/Lipton Iced Tea.webp",
    },
  ],
  orderedlist: [],
  showproducts() {
    let menu = document.getElementById("menu-list");
    let menulist = "";
    // Loop for Array
    this.menulist.forEach(function (lalagyan) {
      menulist += `
      <div class="col-md-3 col-12">
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
  
          <div class="col-3 text-center">
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

user.showproducts();
showorder();
