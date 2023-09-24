let orderList = [];
let totalAmount = 0;

// Adding Meal Order
function orderMeal(mealName, price) {
  orderList.push({ name: mealName, price: price });
  totalAmount += price;

  const totalElement = document.getElementById("total");
  totalElement.textContent = `₱${totalAmount.toFixed(2)}`;

  const itemNameList = document.getElementById("itemName");
  const itemPriceList = document.getElementById("itemPrice");

  // Create a container for the list item and delete button
  const listItemContainer = document.createElement("div");
  listItemContainer.classList.add("list-item-container");

  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fa-regular");
  deleteButton.classList.add("fa-trash-can");
  deleteButton.classList.add("delete-button");

  const itemNameListItem = document.createElement("li");
  itemNameListItem.textContent = mealName;

  const itemPriceListItem = document.createElement("li");
  itemPriceListItem.textContent = `₱${price.toFixed(2)}`;

  deleteButton.addEventListener("click", () => {
    totalAmount -= price;
    totalElement.textContent = `₱${totalAmount.toFixed(2)}`;

    itemNameList.removeChild(listItemContainer);

    const index = orderList.findIndex((item) => item.name === mealName);
    if (index !== -1) {
      orderList.splice(index, 1);
    }
  });

  // Append the delete button and list items to the container
  listItemContainer.appendChild(deleteButton);
  listItemContainer.appendChild(itemNameListItem);
  listItemContainer.appendChild(itemPriceListItem);

  // Append the container to the list
  itemNameList.appendChild(listItemContainer);
  event.preventDefault();
}
