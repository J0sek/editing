import { Item, listControl } from "./itemList.js";

import { addNewItemDOM, removeItemDOM, addProjectDOM } from "./domControl.js";

const addItemButton = document.querySelector(".add-item");

addItemButton.addEventListener("click", () => {
  addItemButton.style.display = "none";

  newItemForm.style.display = "block";
});

const newItemForm = document.querySelector(".item-maker");

const newItemSubmit = document.querySelector(".item-input-submit");

const priorities = document.querySelectorAll(".priority-container > div");

priorities.forEach((x) => {
  x.addEventListener("click", () => {
    priorities.forEach((x) => (x.style.backgroundColor = "transparent"));

    priorities.forEach((x) => {
      if (x.classList[1] !== undefined) x.classList.remove(x.classList[1]);
    });

    x.style.backgroundColor = "rgb(230, 230, 230)";

    x.classList.add("selected");
  });
});

newItemSubmit.addEventListener("click", () => {
  event.preventDefault();

  let newItemName = document.querySelector(".item-input-name");

  newItemName = newItemName.value;

  let newItemDesc = document.querySelector(".item-input-desc");

  newItemDesc = newItemDesc.value;

  let newItemDate = document.querySelector(".item-input-date");

  newItemDate = String(newItemDate.value).replaceAll("/", "");

  newItemDate =
    newItemDate.slice(4, 9) + newItemDate.slice(0, 2) + newItemDate.slice(2, 4);

  console.log(newItemDate);

  let newItemPriority = document.querySelector(
    ".priority-container > .selected"
  );

  newItemPriority = newItemPriority.classList[0].substring(9, 12);

  console.log(newItemPriority);

  let newItem = Item(newItemName, newItemDesc, newItemPriority, newItemDate);

  addNewItemDOM(newItem);

  addItemButton.style.display = "flex";

  newItemForm.style.display = "none";

  newItemForm.reset();

  priorities.forEach((x) => (x.style.backgroundColor = "transparent"));
});

const newItemCancel = document.querySelector(".item-input-cancel");

newItemCancel.addEventListener("click", () => {
  event.preventDefault();

  addItemButton.style.display = "flex";

  newItemForm.style.display = "none";

  priorities.forEach((x) => (x.style.backgroundColor = "transparent"));
});

const addNewProject = document.querySelector(".add-new-project");

const newProject = document.querySelector(".new-project-form");

addNewProject.addEventListener("click", () => {
  newProject.style.display = "block";
});

newProject.addEventListener("submit", () => {
  event.preventDefault();

  const newProjectName = document.querySelector(".new-project-input-name");

  const ProjectName = newProjectName.value;

  addProjectDOM(ProjectName);

  newProjectName.value = "";

  console.log("submitted");
});
