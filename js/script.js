const input = document.getElementById("input");
const addBtn = document.getElementById("btn-add");
const ulList = document.getElementById("list");
let count = 0;

// Load the saved items from localStorage
window.addEventListener("load", function () {
  count = localStorage.getItem("count") || 0;
  if (localStorage.length === 1) count = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (key === "count" || value === "true") continue;

    const li = createListItem(key, value);

    // Check if the item was previously checked and add the "checked" class
    if (localStorage.getItem(`${key}-checked`) === "true") {
      li.classList.add("checked");
    }

    ulList.appendChild(li);
  }
});

// Add item to the list
addBtn.addEventListener("click", function () {
  const item = input.value.trim();
  if (item === "") return;

  count++;
  const key = `id-${count}`;
  const li = createListItem(key, item);

  localStorage.setItem(key, item);
  localStorage.setItem("count", count);
  ulList.appendChild(li);

  input.value = "";
  input.focus();
});

// Create a list item
function createListItem(key, value) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  div.id = key;

  const span = document.createElement("span");
  span.textContent = value;

  const btnEdit = createButton("btn-edit", "edit", "icon/edit.svg");
  // edit item
  btnEdit.addEventListener("click", function () {
    if (btnEdit.classList.contains("edit")) {
      span.contentEditable = true;
      span.focus();
      btnEdit.style.backgroundColor = "#1573d2";
      btnEdit.style.backgroundImage = "url('icon/save.svg')";
      btnEdit.style.backgroundSize = "17px";
      btnEdit.classList.remove("edit");
      btnEdit.classList.add("save");
    } else {
      span.contentEditable = false;
      btnEdit.style.backgroundColor = "#bbc2c9";
      btnEdit.style.backgroundImage = "url('icon/edit.svg')";
      btnEdit.style.backgroundSize = "13px";
      btnEdit.classList.remove("save");
      btnEdit.classList.add("edit");

      localStorage.setItem(key, span.textContent);
    }
  });

  const btnDelete = createButton("btn-delete", "delete", "icon/delete.svg");
  // delete item
  btnDelete.addEventListener("click", function () {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}-checked`);
    div.remove();
  });

  // check button - done task
  li.addEventListener("click", function () {
    li.classList.toggle("checked");
    // Save the checked state to localStorage
    const check = li.classList.contains("checked");
    if (check) {
      localStorage.setItem(`${key}-checked`, check);
    } else {
      localStorage.removeItem(`${key}-checked`);
    }
  });

  // Check if the item was previously checked and add the "checked" class
  if (localStorage.getItem(`${key}-checked`) === "true") {
    li.classList.add("checked");
  }

  li.appendChild(span);
  div.appendChild(li);
  div.appendChild(btnEdit);
  div.appendChild(btnDelete);
  return div;
}

// Create a button
function createButton(idName, className, imgUrl) {
  const button = document.createElement("button");
  button.classList.add("btn", className);
  button.id = idName;
  button.style.backgroundImage = `url('${imgUrl}')`;
  button.style.backgroundSize = "13px";

  return button;
}
