const project = (function () {
  const projects = {
    Main: [],
  };

  let currentProject = projects.Main;

  function addNewProject(name) {
    projects[name] = [];
  }

  function returnCurrent() {
    return currentProject;
  }

  function changeCurrent(list) {
    currentProject = projects[list];
  }

  return { projects, changeCurrent, addNewProject, returnCurrent, projects };
})();

function reloadProjectList() {
  let projectListDOM = document.querySelector(".list-projects");

  /*
		<li class='list-projects-personal'>
			<div class='icon'></div>
			<div class='text'>Personal</div>
			<div class='counter'></div>
		</li>
	*/

  let projectContainerDOM = document.createElement("li");
  projectContainerDOM.classList.add("list-projects");
}

function Item(name, priority, dueDate) {
  function str() {
    return JSON.stringify(this);
  }

  return { name, priority, dueDate, str };
}

export default project;
