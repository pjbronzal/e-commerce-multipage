let customer = {
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
  let order = document.getElementById("order");
  let orderlist = "";

  let orderedlist = JSON.parse(localStorage.getItem("new"));

  if (!orderedlist) {
    order.innerHTML =
      "<div class='container text-center'><small>No orders yet. Add something from the menu.</small></div>";
  } else {
    orderedlist.forEach(function (data, index) {
      orderlist += `
          <div class="row">
            <div class="col-md-1 col-12 text-center">
                <button class="btn p-0 border-0" onclick="deleteThisOrder(${index})"><i class="fa-regular fa-trash-can"></i></button>
            </div>
    
            <div class="wrapper col-md-3 col-12">
              <span class="minus" onclick="minusQty(${index})">-</span>
              <span class="num">${data.quantity
                .toString()
                .padStart(2, "0")}</span>
              <span class="plus" onclick="addQty(${index})">+</span>
            </div>
    
            <div class="col-md-6 col-12 text-start">
                <li>${data.mealName}</li>
            </div>
    
            <div class="col-md-2 col-12 text-end">
                <li>₱${data.totalPrice.toFixed(2)}</li>
            </div>
          </div>
          `;
    });
    order.innerHTML = orderlist;
  }

  let totalElement = document.getElementById("total");
  totalElement.innerText = "₱" + calculateTotal();
  updateTotal();
}

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
