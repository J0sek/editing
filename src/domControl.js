import project from "./projectList.js";
import { Item, listControl } from "./itemList.js";

function creator(elem, text, ...classes) {
  let newElem = document.createElement(elem);

  if (text !== undefined && text !== "" && text !== null)
    newElem.textContent = text;

  if (classes.length > 0) {
    for (const className of classes) {
      newElem.classList.add(className);
    }
  }

  return newElem;
}

function makeItemDOM(item) {
  console.log(item);

  let itemContainer = creator("li", "", "main-list-item");

  let checkbox = creator("div", "", "checkbox");

  checkbox.addEventListener("click", () => {
    console.log(item.index);
    removeItemDOM(item);
  });

  let priorityDOM = creator("div", "", "priority");
  priorityDOM.textContent =
    item.priority === 3 ? "!!!" : item.priority === 2 ? "!!" : "!";

  let itemTextContainer = creator("div", "", "item-text");

  itemContainer.append(checkbox, priorityDOM, itemTextContainer);

  let itemName = creator("div", item.name, "name");

  let itemDesc = creator("div", item.desc, "desc");

  let dueDateText = String(item.dueDate);

  let itemDateFormatted =
    dueDateText.slice(4, 6) +
    " / " +
    dueDateText.slice(6, 8) +
    " / " +
    dueDateText.slice(0, 4);

  let itemDate = creator("div", itemDateFormatted, "date");

  itemTextContainer.append(itemName, itemDesc, itemDate);

  return itemContainer;
}

function removeItemDOM(item) {
  let trash = document.querySelector(`.item${item.index}`);

  const listDOM = document.querySelector(".main-list");

  listDOM.removeChild(trash);

  listControl.removeFromList(project.currentProject, item);
}

function addNewItemDOM(item) {
  let current = project.returnCurrent();

  listControl.addToList(current, item);

  console.log(current);

  let itemDOM = makeItemDOM(item);

  let index = item.index;

  itemDOM.classList.add(`item${item.index}`);

  const listDOM = document.querySelector(".main-list");

  if (index === 0) {
    listDOM.insertBefore(itemDOM, listDOM.firstChild);
    return;
  }

  let ref = listDOM.firstChild;

  for (let k = 0; k !== index; k++) {
    ref = ref.nextSibling;
  }

  listDOM.insertBefore(itemDOM, ref);

  console.log(project.currentProject);
}

function loadListToDOM(list) {
  const listDOM = document.querySelector(".main-list");

  if (list.length === 0) return;

  const addItemButton = document.querySelector(".new-item-container");

  for (const item of list) {
    let itemDOM = makeItemDOM(item);
    listDOM.insertBefore(itemDOM, addItemButton);
  }
}

function wipeListDOM() {
  const listDOM = document.querySelector(".main-list");

  const addItemButton = document.querySelector(".new-item-container");

  let temp = addItemButton.previousElementSibling;

  while (temp) {
    listDOM.removeChild(temp);

    temp = addItemButton.previousElementSibling;
  }
}

function makeProjectDOM(projectName) {
  /*<li class='project personal'>
  <div class='icon'></div>
  <div class='text'>Personal</div>
  <div class='counter'></div>
</li>*/

  const projectHolder = creator("li", "", "project", `class${projectName}`);
  const projectIcon = creator("div", "", "icon");
  const projectText = creator("div", projectName, "text");
  const counter = creator("div", "", "counter");

  projectHolder.append(projectIcon, projectText, counter);

  projectHolder.addEventListener("click", () => {
    changeProjectDOM(projectName);
    console.log("holder");
  });

  projectIcon.addEventListener("click", () => {
    removeProjectDOM(projectName);
    console.log("icon");
    event.stopPropagation();
  });

  return projectHolder;
}

function changeProjectDOM(projectName) {
  wipeListDOM();
  project.changeCurrent(projectName);
  loadListToDOM(project.returnCurrent());
  console.log(project.projects);
  const title = document.querySelector(".main-top-title");
  title.textContent = projectName;
}

function addProjectDOM(projectName) {
  let newProject = makeProjectDOM(projectName);

  const projectList = document.querySelector(".list-projects");

  const projectForm = document.querySelector(".new-project-form-container");

  projectList.insertBefore(newProject, projectForm);

  project.addNewProject(projectName);

  changeProjectDOM(projectName);
}

function removeProjectDOM(projectName) {
  const trash = document.querySelector(`.project.class${projectName}`);

  const projectList = document.querySelector(".list-projects");

  projectList.removeChild(trash);

  changeProjectDOM("Main");

  console.log(project.returnCurrent());
}

const mainProject = document.querySelector(".main.project");

mainProject.addEventListener("click", () => {
  changeProjectDOM("Main");
});

export { addNewItemDOM, removeItemDOM, addProjectDOM };
