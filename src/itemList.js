function Item(name, desc, priority, dueDate) {
  priority = priority === "high" ? 3 : priority === "mid" ? 2 : 1;

  return { name, desc, priority, dueDate };
}

const listControl = (function () {
  function addToList(list, item) {
    if (list.length === 0) {
      list[0] = item;
      item.index = 0;
      return;
    }

    for (let j = 0; j <= list.length; j++) {
      if (list.length === j) {
        list[list.length] = item;
        item.index = j;
        break;
      }

      if (Number(item.dueDate) < Number(list[j].dueDate)) {
        for (let p = list.length; p > j; p--) {
          list[p] = list[p - 1];
        }

        list[j] = item;
        item.index = j;
        break;
      } else if (Number(item.dueDate) == Number(list[j].dueDate)) {
        if (Number(item.priority) <= Number(list[j].priority)) {
          for (let p = list.length; p > j; p--) {
            list[p] = list[p - 1];
          }

          list[j] = item;
          item.index = j;
          break;
        } else {
          for (let p = list.length; p > j + 1; p--) {
            list[p] = list[p - 1];
          }

          list[j + 1] = item;
          item.index = j + 1;
          break;
        }
      } else {
        continue;
      }
    }
  }

  function removeFromList(list, item) {
    let itemIndex = list.indexOf(item);
    list.splice(itemIndex, 1);
  }

  return { addToList, removeFromList };
})();

export { listControl, Item };
