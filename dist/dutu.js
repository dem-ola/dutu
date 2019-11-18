/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/fromtojson.jsx
 //////////////////////////////

const fPrefix = 'dutu'; // leave alone to not risk overwriting stored JSON
//////////////////////////////

function retrieveDutu(defaultCategories, defaultCategory) {
  // get JSON file or return null
  let obj = localStorage.getItem(fPrefix + "JSON");
  obj = obj == null || obj == 'undefined' ? null : obj;
  if (obj == null) return obj;
  obj = JSON.parse(obj); // checks
  // if no categories node; add default

  let keys = Object.keys(obj);

  if (keys.indexOf('categories') == -1) {
    obj['categories'] = defaultCategories;
  }

  let tasks = obj.tasks;

  for (let t in tasks) {
    // set to default if if task has no category
    if (!tasks[t].hasOwnProperty('category')) {
      tasks[t].category = defaultCategory;
    } // if blank then set to default


    if (tasks[t].category.trim() == '') {
      tasks[t].category = defaultCategory;
    } // add category to categories if not in categories node


    if (obj.categories.indexOf(tasks[t].category) == -1) {
      obj.categories.push(tasks[t].category);
    } // remove blanks


    obj.categories = obj.categories.filter(cat => cat.trim() != '');
  }

  return obj;
}
function saveDutu(data, defaultCategory) {
  // checks
  //1. each task has a category; if not set to default
  let tasks = data.tasks;

  for (let t in tasks) {
    if (typeof tasks[t].category != 'string') {
      tasks[t].category = defaultCategory;
    }
  }

  localStorage.setItem(fPrefix + "JSON", JSON.stringify(data));
}
// CONCATENATED MODULE: ./src/dutu.jsx



let version = 0.13;
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var dutuData;
var defaultCategories = ['All', 'General'];
var defaultCategory = 'General'; // retrieve

dutuData = retrieveDutu(defaultCategories, defaultCategory);

if (dutuData == null) {
  // doesn't exist; make new blank and then open
  dutuData = {
    "me": "My",
    "categories": defaultCategories,
    // default
    "tasks": {}
  };
  saveDutu(dutuData, defaultCategory);
  retrieveDutu(defaultCategories, defaultCategory);
}

function editClassName(elem, cname, action) {
  let cur = elem.className;
  let chg;

  if (action == 'add') {
    chg = cur + ' ' + cname;
  } else {
    //'remove'
    chg = cur.replace(cname, '');
  }

  elem.setAttribute('class', chg);
}

function convertTextToDate(dateText) {
  let reg = dateText.match(/(\d+)-(.*?)-(\d+)/);
  return new Date(reg[3], months.indexOf(reg[2]), reg[1]);
}

function convertDateToText(date) {
  return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
}

function daysSince(dateText, fin = null) {
  if (dateText == null || dateText == undefined) return '0d';
  let now = new Date();

  if (fin != null) {
    now = convertTextToDate(fin);
  }

  let then = convertTextToDate(dateText);
  return parseInt((now - then) / (1000 * 60 * 60 * 24)) + 'd';
} // add capitalize method to String prototype


String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}; ////////////////////


const InputBox = props => {
  return React.createElement("input", {
    type: "text",
    id: props.id,
    className: props.className,
    placeholder: props.place,
    disabled: props.disabled,
    defaultValue: props.value,
    onChange: props.handle
  });
};

const NotesBox = props => {
  return React.createElement("textarea", {
    type: "text",
    id: props.id,
    className: props.className,
    placeholder: props.placeholder,
    maxLength: props.maxlength,
    defaultValue: props.value
  });
};

const Btn = props => {
  return React.createElement("button", {
    id: props.id,
    className: props.className,
    onClick: props.handle,
    disabled: props.disabled
  }, props.txt);
};

const CheckBox = props => {
  if (props.checked == true || props.checked == 'true') {
    return React.createElement("span", null, React.createElement("label", {
      className: props.classNameLabel
    }, "Done =>"), React.createElement("input", {
      className: props.className,
      type: "checkbox",
      checked: true,
      onChange: props.handle
    }));
  } else {
    return React.createElement("span", null, React.createElement("label", {
      className: props.classNameLabel
    }, "Done =>"), React.createElement("input", {
      className: props.className,
      type: "checkbox",
      checked: false,
      onChange: props.handle
    }));
  }
};

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {}; // empty but created so ref to this.state can work
  }

  componentDidMount() {
    this.setState({
      value: this.props.categories[0]
    });

    if (this.props.todoitem) {
      // so not the filter categories select
      if (this.props.task.category != undefined) {
        this.setState({
          value: this.props.task.category
        }); // reset if existing
      }
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange();
  }

  render() {
    let cats_ = [];
    let len = this.props.categories.length; // to avoid undefined

    for (let i = 0; i < len; i++) {
      cats_.push(React.createElement("option", {
        key: i,
        value: this.props.categories[i]
      }, this.props.categories[i]));
    }

    return React.createElement("select", {
      id: this.props.id,
      className: this.props.className,
      value: this.state.value,
      onChange: this.handleChange
    }, cats_);
  }

}

class dutu_ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleNotesOpen = this.handleNotesOpen.bind(this);
    this.handleNotesSave = this.handleNotesSave.bind(this);
    this.state = {
      item: props.taskie,
      todo: props.taskie.task,
      notes: props.taskie.notes,
      notesPlaceholder: 'Write here',
      key: props.objKey,
      confirm: 'Confirm',
      edit: 'Edit',
      editing: false,
      added: props.taskie.added,
      finished: props.taskie.finished,
      done: props.taskie.done,
      categories: props.data.categories,
      pending: daysSince(props.taskie.added, props.taskie.finished),
      catId: 'item-category-' + props.objKey
    };
  }

  handleDone(e) {
    let par = e.target.parentElement.parentElement;
    let inp = par.querySelector('.item-todo');
    let editBtn = par.querySelector('.item-edit');
    let finDate = this.state.finished;

    if (e.target.checked) {
      // disable edit button, add finished date
      editClassName(inp, 'item-todo-done', 'add');
      editBtn.setAttribute('disabled', true);

      if (finDate == null || finDate == undefined) {
        finDate = convertDateToText(new Date());
        this.setState({
          finished: finDate
        });
      }

      this.setState({
        done: true
      });
      this.props.data.tasks[this.state.key].done = true;
    } else {
      // enable edit button and change/keep finished date
      editClassName(inp, 'item-todo-done', 'remove');
      editBtn.removeAttribute('disabled');

      if (finDate != null && finDate != undefined) {
        let confirmed = confirm("Keep the old finished date?");

        if (!confirmed) {
          finDate = null;
          this.setState({
            finished: finDate
          });
        }
      }

      this.setState({
        done: false
      });
      this.props.data.tasks[this.state.key].done = false;
    }

    this.props.data.tasks[this.state.key].finished = finDate;
    saveDutu(this.props.data, defaultCategory);
  }

  handleEdit(e) {
    let par = e.target.parentElement;
    let inp = par.querySelector('.item-todo');
    let btn = e.target;
    btn.textContent = this.state.confirm;

    if (!this.state.editing) {
      // enable input and set css/flags
      inp.removeAttribute('disabled');
      inp.focus();
      editClassName(e.target, 'item-confirm-highlight', 'add');
      editClassName(inp, 'todo-editing', 'add');
      this.setState({
        editing: true
      });
    } else {
      if (inp.value != this.state.todo) {
        let confirmed = confirm("Save this edit?");

        if (confirmed) {
          // update data object, convert to JSON and save
          this.setState({
            todo: inp.value
          });
          this.props.data.tasks[this.state.key].task = inp.value;
          saveDutu(this.props.data, defaultCategory);
        } else {
          inp.value = this.state.todo; // set back to former
        }
      } // reset formats; also if no changes made


      inp.setAttribute('disabled', true);
      btn.textContent = this.state.edit;
      editClassName(btn, 'item-confirm-highlight', 'remove');
      editClassName(inp, 'todo-editing', 'remove');
      this.setState({
        editing: false
      });
    }
  }

  handleNotesOpen(e) {
    let par = e.target.parentElement;
    let notesWrap = par.querySelector('.item-notes-wrap');
    let notes = par.querySelector('.item-notes');

    if (e.target.className.indexOf('item-notes-opened') == -1) {
      // box not open
      e.target.textContent = 'Close';
      editClassName(e.target, 'item-notes-opened', 'add');
      editClassName(notesWrap, 'item-notes-selected', 'add');
    } else {
      // box already open so close: note no saving!
      e.target.textContent = 'Notes';
      notes.value = this.state.notes || '';
      editClassName(e.target, 'item-notes-opened', 'remove');
      editClassName(notesWrap, 'item-notes-selected', 'remove');
    }
  }

  handleNotesSave(e) {
    let par = e.target.parentElement.parentElement;
    let btn = par.querySelector('.item-notes-btn-open');
    btn.textContent = 'Notes'; // save data

    let notes_written = par.querySelector('.item-notes').value;
    this.setState({
      notes: notes_written
    });
    this.props.data.tasks[this.state.key].notes = notes_written;
    saveDutu(this.props.data, defaultCategory); // close box

    let notes = par.querySelector('.item-notes-wrap');
    editClassName(notes, 'item-notes-selected', 'remove');
  }

  handleChangeCat() {
    let id_ = this.state.catId;
    this.props.data.tasks[this.state.key].category = document.querySelector('#' + id_).value;
    saveDutu(this.props.data, defaultCategory);
  }

  render() {
    // props if item done already
    let boxcname = "item-todo";
    let disableBtn = false;
    let prefixFin = '';

    if (this.state.done == true || this.state.done == 'true') {
      boxcname = "item-todo item-todo-done";
      disableBtn = true;
    }

    if (this.state.finished != null) {
      prefixFin = 'fin.';
    } // categories for items: exclude 'All'


    let itemCategories = this.props.data.categories.slice(1);
    return React.createElement("div", {
      id: this.props.id,
      className: this.props.cname
    }, React.createElement("span", {
      className: "item-id"
    }, this.props.id.match(/\d+/)[0]), React.createElement("span", {
      className: "item-obj-key"
    }, this.props.objKey), React.createElement("div", {
      className: "item-todo-box"
    }, React.createElement(InputBox, {
      className: boxcname,
      disabled: true,
      value: this.state.todo,
      done: this.state.done
    }), React.createElement(Btn, {
      className: "item-notes-btn item-notes-btn-open",
      txt: "Notes",
      handle: this.handleNotesOpen,
      disabled: disableBtn
    }), React.createElement("div", {
      className: "item-notes-wrap"
    }, React.createElement(NotesBox, {
      className: "item-notes",
      maxlength: "500",
      placeholder: this.state.notesPlaceholder,
      value: this.state.notes
    }), React.createElement(Btn, {
      className: "item-notes-btn item-notes-btn-save",
      txt: "Save",
      handle: this.handleNotesSave
    }))), React.createElement(Categories, {
      id: this.state.catId,
      className: "item-category",
      categories: itemCategories,
      todoitem: true // flag
      ,
      task: this.props.data.tasks[this.state.key],
      data: this.props.data,
      onChange: this.handleChangeCat
    }), React.createElement(Btn, {
      className: "item-edit",
      txt: "Edit",
      handle: this.handleEdit,
      disabled: disableBtn
    }), React.createElement(Btn, {
      className: "item-delete",
      txt: "Delete",
      handle: this.props.handleDelete
    }), React.createElement(CheckBox, {
      className: "item-done",
      classNameLabel: "item-done-label",
      handle: this.handleDone,
      checked: this.state.done
    }), React.createElement("span", {
      className: "item-date"
    }, React.createElement("span", {
      className: "item-date-prefix"
    }, "add. "), this.state.added), React.createElement("span", {
      className: "item-date"
    }, React.createElement("span", {
      className: "item-date-prefix"
    }, prefixFin, " "), this.state.finished), React.createElement("span", {
      className: "item-pending"
    }, "=> ", this.state.pending));
  }

}

const LoadList = props => {
  let tasks = props.data.tasks;
  let keys = Object.keys(tasks); // get keys so we can loop

  let rows = [];

  for (let i = 0; i < keys.length; i++) {
    let k = keys[i]; // check if we need to filter
    // nb. props.selected is undefined at first load

    if (props.selected != undefined && props.selected != 'All') {
      // task category may be undefined if not initially assigned
      // probably not necessary once General is assigned as default on creation
      let category = tasks[k].category == undefined ? defaultCategory : tasks[k].category;

      if (category != props.selected) {
        continue;
      }
    }

    rows.push(React.createElement(dutu_ToDoItem, {
      key: k,
      id: 'row-' + (i + 1) // css id as well as shown row number
      ,
      cname: "item-row",
      objKey: keys[i] // underlying object key
      ,
      data: props.data,
      taskie: tasks[k],
      handleDelete: props.handleDelete
    }));
  }

  return React.createElement("div", null, rows);
};

class dutu_List extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditCat = this.handleEditCat.bind(this);
    this.handleFilterCat = this.handleFilterCat.bind(this);
    this.state = {
      theList: React.createElement(LoadList, {
        data: this.props.data,
        handleDelete: this.handleDelete
      }),
      keys: Object.keys(props.data.tasks) // get keys so we can loop

    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // reset this so it can be reloaded eg when categories change etc
      this.setState({
        theList: React.createElement(LoadList, {
          data: this.props.data,
          handleDelete: this.handleDelete
        })
      });
    }
  }

  handleAdd(e) {
    // get input or return null if nothing
    let inp = document.querySelector('#item-box');
    if (inp.value.trim() == '') return; // save old Props for later DiDUpdate()

    this.setState({
      prevProps: this.props.data['tasks']
    }); // create new task

    let now = new Date();
    let date = convertDateToText(now);
    let newTask = {
      'task': inp.value,
      'added': date
    }; // add to database
    // use this.props and not a this.state.data copy
    // so underlying data object is changed

    let keys_ = this.state.keys;
    let newKey = 0;

    if (keys_.length > 0) {
      newKey = keys_.reduce((a, b) => Math.max(a, b)) + 1;
    }

    this.props.data['tasks'][newKey] = newTask;
    saveDutu(this.props.data, defaultCategory); // update shown list and keys

    keys_.push(newKey);
    this.setState({
      keys: keys_
    });
    this.componentDidUpdate(); // reset input box

    inp.value = '';
  }

  handleClear(e) {
    if (Object.keys(this.props.data['tasks']).length == 0) return;
    let confirmed = confirm("Clear your entire list\nWarning: This action cannot be reversed");

    if (confirmed) {
      this.props.data['tasks'] = {};
      saveDutu(this.props.data, defaultCategory);
      this.componentDidUpdate();
    }
  }

  handleEditCat() {
    let cats = this.props.data.categories.slice(0, 2);
    let cats_ = this.props.data.categories.slice(2);
    cats_ = cats_.join(', ');
    let edited = prompt('Create a new category. Separate multiples with commas.\n\n' + 'If you rename an existing Category\n' + 'you will have to re-categorise affected items', cats_);

    if (edited != cats_) {
      let newCats = edited.split(',');
      newCats = newCats.map(c => c.trim().capitalize());
      newCats = cats.concat(newCats); // iterate through tasks and set to default if category not in new list
      // this is strict - so must be exact spelling 

      let tasks = this.props.data.tasks;

      for (let t in tasks) {
        if (newCats.indexOf(tasks[t].category) == -1) {
          tasks[t].category = defaultCategory;
        }
      } // save new categories


      this.props.data.categories = newCats;
      saveDutu(this.props.data, defaultCategory);
    }

    this.componentDidUpdate();
  } // this is hereso we can filter the list
  // can't really do it inside Categories component


  handleFilterCat() {
    let selected = document.querySelector('#cat-filter').value;
    this.setState({
      theList: React.createElement(LoadList, {
        data: this.props.data,
        selected: selected,
        handleDelete: this.handleDelete
      })
    });
  }

  handleDelete(e) {
    let par = e.target.parentElement;
    let key = par.querySelector('.item-obj-key').textContent;
    let confirmed = confirm("Delete this task?");

    if (confirmed) {
      delete this.props.data.tasks[key];
      saveDutu(this.props.data, defaultCategory);
    }

    this.componentDidUpdate();
  }

  render() {
    return React.createElement("div", null, React.createElement("div", {
      id: "above"
    }, React.createElement(InputBox, {
      id: "item-box",
      place: "Add new todo item"
    }), React.createElement(Btn, {
      id: "add-new",
      className: "above-btn",
      txt: "Add New",
      handle: this.handleAdd
    }), React.createElement(Btn, {
      id: "clear-list",
      className: "above-btn",
      txt: "Clear List",
      handle: this.handleClear
    }), React.createElement(Btn, {
      id: "cat-edit",
      className: "above-btn",
      txt: "Edit Categories",
      handle: this.handleEditCat
    }), React.createElement("span", {
      id: "cat-filter-label"
    }, "Filter:"), React.createElement(Categories, {
      id: "cat-filter",
      categories: this.props.data.categories,
      onChange: this.handleFilterCat
    })), this.state.theList);
  }

}

class ToDo extends React.Component {
  render() {
    return React.createElement("div", null, React.createElement("div", {
      id: "app-name"
    }, "Dutu", React.createElement("span", {
      id: "version"
    }, version), React.createElement("span", {
      id: "app-byline"
    }, "the todo app for big plans")), React.createElement("div", {
      id: "me"
    }, " ", this.props.data.me, " Todo List "), React.createElement("div", {
      id: "table"
    }, React.createElement(dutu_List, {
      data: this.props.data
    })));
  }

}

ReactDOM.render(React.createElement(ToDo, {
  data: dutuData
}), document.getElementById('root'));

/***/ })
/******/ ]);