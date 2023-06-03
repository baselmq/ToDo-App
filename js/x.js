let input = document.getElementById("input");
let addBtn = document.getElementById("btn-add");
let ulList = document.getElementById("list");
let count = 0;

// load
window.addEventListener("load", function () {
  count = localStorage.getItem("count");

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "count") {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const li = document.createElement("li");
      const span = document.createElement("span");
      const btnEdit = document.createElement("button");
      const btnDelete = document.createElement("button");

      // appendChild
      li.appendChild(span);
      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      ulList.appendChild(li);

      // className
      li.className = key;
      // btnEdit.className = "btn";
      btnEdit.classList.add("btn");
      btnEdit.classList.add("edit");
      btnDelete.className = "btn";

      // id
      btnEdit.id = "btn-edit";
      btnDelete.id = "btn-delete";

      // set data
      span.textContent = value;

      btnDelete.addEventListener("click", function () {
        // Remove Local Storage --------------------
        if (window.localStorage.getItem(`${li.className}`)) {
          window.localStorage.removeItem(`${li.className}`);
        }
        ulList.removeChild(li);
      });

      btnEdit.addEventListener("click", function () {
        if (btnEdit.classList.contains("edit")) {
          span.setAttribute("contentEditable", true);
          span.focus();
          btnEdit.style.backgroundColor = `#1573d2`;
          btnEdit.style.backgroundImage = `url('../icon/save.svg')`;
          btnEdit.style.backgroundSize = "17px";

          btnEdit.classList.add("save");
          btnEdit.classList.remove("edit");
        } else {
          span.setAttribute("contentEditable", false);
          btnEdit.style.backgroundColor = `#bbc2c9`;
          btnEdit.style.backgroundImage = `url('../icon/edit.svg')`;
          btnEdit.style.backgroundSize = " 13px";

          btnEdit.classList.remove("save");
          btnEdit.classList.add("edit");

          // Edit Local Storage --------------------
          window.localStorage.setItem(
            `${li.className}`,
            `${li.firstChild.textContent}`
          );
        }
      });
    }
  }
});

// add item ---------------------------------
addBtn.addEventListener("click", function () {
  const item = input.value;
  if (item != "") {
    count++;
    // create element
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");

    // className
    li.className = `item-${count}`;
    // btnEdit.className = "btn";
    btnEdit.classList.add("btn");
    btnEdit.classList.add("edit");
    btnDelete.className = "btn";

    // id
    btnEdit.id = "btn-edit";
    btnDelete.id = "btn-delete";

    // set data
    span.textContent = item;

    // Add Local Storage --------------------
    window.localStorage.setItem(`item-${count}`, `${item}`);
    window.localStorage.setItem(`count`, count);

    // appendChild
    li.appendChild(span);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    ulList.appendChild(li);

    // remove item ---------------------------------
    btnDelete.addEventListener("click", function () {
      // Remove Local Storage --------------------
      if (window.localStorage.getItem(`${li.className}`)) {
        window.localStorage.removeItem(`${li.className}`);
      }
      ulList.removeChild(li);
    });

    // edit item ---------------------------------
    btnEdit.addEventListener("click", function () {
      if (btnEdit.classList.contains("edit")) {
        span.setAttribute("contentEditable", true);
        span.focus();
        btnEdit.style.backgroundColor = `#1573d2`;
        btnEdit.style.backgroundImage = `url('../icon/save.svg')`;
        btnEdit.style.backgroundSize = "17px";

        btnEdit.classList.add("save");
        btnEdit.classList.remove("edit");
      } else {
        span.setAttribute("contentEditable", false);
        btnEdit.style.backgroundColor = `#bbc2c9`;
        btnEdit.style.backgroundImage = `url('../icon/edit.svg')`;
        btnEdit.style.backgroundSize = " 13px";

        btnEdit.classList.remove("save");
        btnEdit.classList.add("edit");

        // Edit Local Storage --------------------
        window.localStorage.setItem(
          `${li.className}`,
          `${li.firstChild.textContent}`
        );
      }
    });
    // Clear and focus the input
    input.value = "";
    input.focus();
  }
});
