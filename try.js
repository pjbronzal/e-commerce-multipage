let customer = {
  customerName: "",
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
      mealName: "McDonald's Burger Solo",
      price: 44,
      image: "img/Burger Mcdo Solo.png",
    },
    {
      id: 3,
      mealName: "McSpaghetti Solo Meal",
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
      mealName: "McDonald's Lipton Iced Tea",
      price: 79,
      image: "img/Lipton Iced Tea.webp",
    },
  ],
  orderedlist: [],
  showproducts() {
    let menu = document.getElementById("menu-list");
    let menulist = "";
    this.menulist.forEach(function (data) {
      menulist += `
        <div class="col-md-3 col-12">
          <div class="card mb-3">
              <p id="ids${data.id}" hidden>${data.id}</p>
              <img id="image${data.id}" src="${data.image}" class="card-img-top">
  
              <div class="card-body">
                  <h5 class="card-title" id="menu${data.id}">${data.mealName}</h5>
                  <div class="row">
                  <div class="col-md-6 col-12 fw-bold price" id="price${data.id}">₱${data.price}.00</div>
                      <div class="col-md-6 col-12 text-end">
                      <button class="btn btn-sm btn-warning" onclick="addOrder(${data.id})">+</button>
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

function calculateSubtotal() {
  let orderedlist = JSON.parse(localStorage.getItem("new")) || [];
  let subtotal = 0;

  orderedlist.forEach(function (data) {
    subtotal += data.totalPrice;
  });

  return subtotal.toFixed(2);
}

function updateTotal() {
  let subtotal = parseFloat(calculateSubtotal());
  let deliveryFee = 49;
  let total = subtotal + deliveryFee;

  let subtotalElement = document.getElementById("subtotal");
  subtotalElement.innerText = "₱" + subtotal.toFixed(2);

  let totalElement = document.getElementById("total");
  totalElement.innerText = "₱" + total.toFixed(2);
}

function addOrder(id) {
  let orderedlist = JSON.parse(localStorage.getItem("new")) || [];

  const existingItemIndex = orderedlist.findIndex((item) => item.id === id);

  if (existingItemIndex !== -1) {
    alert("This item is already in your order."); //not working :<
  } else {
    let new_id = document.getElementById("ids" + id).innerText;
    let new_order = document.getElementById("menu" + id).innerText;
    let new_price = parseFloat(
      document
        .getElementById("price" + id)
        .innerText.replace("₱", "")
        .replace(".00", "")
    );

    orderedlist.push({
      id: new_id,
      mealName: new_order,
      price: new_price,
      quantity: 1,
      totalPrice: new_price,
    });

    localStorage.setItem("new", JSON.stringify(orderedlist));
    showorder();

    document.querySelector(`button[data-id="${id}"]`).disabled = true;
  }
  updateTotal();
}

function calculateTotal() {
  let orderedlist = JSON.parse(localStorage.getItem("new")) || [];
  let total = 0;

  orderedlist.forEach(function (data) {
    total += data.totalPrice;
  });

  return total.toFixed(2);
}

function showorder() {
  let placedOrder = document.getElementById("placedOrder");
  let orderlist = "";

  let orderedlist = JSON.parse(localStorage.getItem("new"));

  if (!orderedlist) {
    placedOrder.innerHTML =
      "<div class='text-center'><small>No orders yet. Add something from the menu.</small></div>";
  } else {
    orderedlist.forEach(function (data, index) {
      orderlist += `
      <div class="row">
        <div class="col-md-8 col-12 text-start">
            <li><b>${data.quantity} x ${data.mealName}</b>
            <ul>
            <li class="suborder">${data.quantity} x ₱${data.price}.00</li>
            </ul>
            </li>
        </div>

        <div class="col-md-4 col-12 text-end">
            <li><b>₱${data.totalPrice.toFixed(2)}</b></li>
        </div>
      </div>
      `;
    });
    placedOrder.innerHTML = orderlist;
  }
  updateTotal();
}

showorder();
updateTotal();

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
  updateTotal();
}

function addQty(index) {
  let orderedlist = JSON.parse(localStorage.getItem("new"));

  if (orderedlist && index >= 0 && index < orderedlist.length) {
    orderedlist[index].quantity++;
    orderedlist[index].totalPrice =
      orderedlist[index].quantity * orderedlist[index].price;
    localStorage.setItem("new", JSON.stringify(orderedlist));
    showorder();
  }
  updateTotal();
}

function minusQty(index) {
  let orderedlist = JSON.parse(localStorage.getItem("new"));

  if (orderedlist && index >= 0 && index < orderedlist.length) {
    if (orderedlist[index].quantity > 1) {
      orderedlist[index].quantity--;
      orderedlist[index].totalPrice =
        orderedlist[index].quantity * orderedlist[index].price;
      localStorage.setItem("new", JSON.stringify(orderedlist));
      showorder();
    }
  }
  updateTotal();
}

customer.showproducts();
showorder();
