!function(e){var t={};function a(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(s,i,function(t){return e[t]}.bind(null,i));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const s={me:"My",version:"0.17",dataStore:{primary:"dutu",archive:"dutu-archive"},defaultCategories:["All","General"],defaultCategory:"General"};var i=s.defaultCategories,n=s.defaultCategory;function r(){return{me:s.me,categories:i,tasks:{},restack:!1,archive:!1}}function l(e){let t=localStorage.getItem(e+"JSON");if(null==(t=null==t||"undefined"==t?null:t))return t;(t=JSON.parse(t)).listorder=-1;let a=t.tasks;for(let e in a)a[e].hasOwnProperty("category")||(a[e].category=n),""==a[e].category.trim()&&(a[e].category=n),-1==t.categories.indexOf(a[e].category)&&t.categories.push(a[e].category),t.categories=t.categories.filter(e=>""!=e.trim()),a[e].done||(a[e].order=++t.listorder);for(let e in a)a[e].done&&(a[e].order=++t.listorder);return t}function d(e,t,a){let s=t.tasks;for(let e in s)"string"!=typeof s[e].category&&(s[e].category=a);localStorage.setItem(e+"JSON",JSON.stringify(t))}const o=s.version,c=s.dataStore.primary,h=s.dataStore.archive,p=s.defaultCategory;let m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var u;function g(e,t,a){let s,i=e.className;s="add"==a?i+" "+t:i.replace(t,""),e.setAttribute("class",s)}function f(e){let t=e.match(/(\d+)-(.*?)-(\d+)/);return new Date(t[3],m.indexOf(t[2]),t[1])}function y(e){return e.getDate()+"-"+m[e.getMonth()]+"-"+e.getFullYear()}function k(e,t=null){if(null==e||null==e)return"0d";let a=new Date;null!=t&&(a=f(t));let s=f(e);return parseInt((a-s)/864e5)+"d"}null==(u=l(c))&&(u=r(),d(c,u,p),u=l(c)),String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};const v=e=>React.createElement("input",{type:"text",id:e.id,className:e.className,placeholder:e.place,disabled:e.disabled,defaultValue:e.value,onChange:e.handle,onKeyUp:e.onKeyUp}),b=e=>React.createElement("textarea",{type:"text",id:e.id,className:e.className,placeholder:e.placeholder,maxLength:e.maxlength,defaultValue:e.value}),E=e=>React.createElement("button",{id:e.id,className:e.className,onClick:e.handle,disabled:e.disabled},e.txt),R=e=>1==e.checked||"true"==e.checked?React.createElement("span",null,React.createElement("label",{className:e.classNameLabel},"Done =>"),React.createElement("input",{className:e.className,type:"checkbox",checked:!0,onChange:e.handle})):React.createElement("span",null,React.createElement("label",{className:e.classNameLabel},"Done =>"),React.createElement("input",{className:e.className,type:"checkbox",checked:!1,onChange:e.handle}));class N extends React.Component{constructor(e){super(e),this.handleChange=this.handleChange.bind(this),this.state={}}componentDidMount(){this.setState({value:this.props.categories[0]}),this.props.todoitem&&null!=this.props.task.category&&this.setState({value:this.props.task.category})}handleChange(e){this.setState({value:e.target.value}),this.props.onChange()}render(){let e=[],t=this.props.categories.length;for(let a=0;a<t;a++)e.push(React.createElement("option",{key:a,value:this.props.categories[a]},this.props.categories[a]));return React.createElement("select",{id:this.props.id,className:this.props.className,value:this.state.value,onChange:this.handleChange},e)}}class C extends React.Component{constructor(e){super(e),this.handleEdit=this.handleEdit.bind(this),this.handleDone=this.handleDone.bind(this),this.handleChangeCat=this.handleChangeCat.bind(this),this.handleNotesOpen=this.handleNotesOpen.bind(this),this.handleNotesSave=this.handleNotesSave.bind(this),this.state={item:e.taskie,todo:e.taskie.task,notes:e.taskie.notes,notesPlaceholder:"Write here",key:e.objKey,confirm:"Confirm",edit:"Edit",editing:!1,added:e.taskie.added,finished:e.taskie.finished,done:e.taskie.done,categories:e.data.categories,pending:k(e.taskie.added,e.taskie.finished),catId:"item-category-"+e.objKey}}handleDone(e){let t=e.target.parentElement.parentElement,a=t.querySelector(".item-todo"),s=t.querySelector(".item-edit"),i=this.state.finished;if(e.target.checked)g(a,"item-todo-done","add"),s.setAttribute("disabled",!0),null!=i&&null!=i||(i=y(new Date),this.setState({finished:i})),this.setState({done:!0}),this.props.data.tasks[this.state.key].done=!0;else{if(g(a,"item-todo-done","remove"),s.removeAttribute("disabled"),null!=i&&null!=i){confirm("Keep the old finished date?")||(i=null,this.setState({finished:i}))}this.setState({done:!1}),this.props.data.tasks[this.state.key].done=!1}this.props.data.tasks[this.state.key].finished=i,d(c,this.props.data,p)}handleEdit(e){let t=e.target.parentElement.querySelector(".item-todo"),a=e.target;if(a.textContent=this.state.confirm,this.state.editing){if(t.value!=this.state.todo){confirm("Save this edit?")?(this.setState({todo:t.value}),this.props.data.tasks[this.state.key].task=t.value,d(c,this.props.data,p)):t.value=this.state.todo}t.setAttribute("disabled",!0),a.textContent=this.state.edit,g(a,"item-confirm-highlight","remove"),g(t,"todo-editing","remove"),this.setState({editing:!1})}else t.removeAttribute("disabled"),t.focus(),g(e.target,"item-confirm-highlight","add"),g(t,"todo-editing","add"),this.setState({editing:!0})}handleNotesOpen(e){let t=e.target.parentElement,a=t.querySelector(".item-notes-wrap"),s=t.querySelector(".item-notes");-1==e.target.className.indexOf("item-notes-opened")?(e.target.textContent="Close",g(e.target,"item-notes-opened","add"),g(a,"item-notes-selected","add")):(e.target.textContent="Notes",s.value=this.state.notes||this.state.notesPlaceholder,g(e.target,"item-notes-opened","remove"),g(a,"item-notes-selected","remove"))}handleNotesSave(e){let t=e.target.parentElement.parentElement;t.querySelector(".item-notes-btn-open").textContent="Notes";let a=t.querySelector(".item-notes").value;this.setState({notes:a}),this.props.data.tasks[this.state.key].notes=a,d(c,this.props.data,p),g(t.querySelector(".item-notes-wrap"),"item-notes-selected","remove")}handleChangeCat(){let e=this.state.catId;this.props.data.tasks[this.state.key].category=document.querySelector("#"+e).value,d(c,this.props.data,p)}render(){let e="item-todo",t=!1,a="";1!=this.state.done&&"true"!=this.state.done||(e="item-todo item-todo-done",t=!0),null!=this.state.finished&&(a="fin.");let s=this.props.data.categories.slice(1),i="item-key-"+this.props.objKey;return React.createElement("div",{id:i},React.createElement("div",{id:this.props.id,className:this.props.cname},React.createElement("span",{className:"item-line"},this.props.id.match(/\d+/)[0]),React.createElement("span",{className:"item-obj-key"},this.props.objKey),React.createElement("div",{className:"item-todo-box"},React.createElement(v,{className:e,disabled:!0,value:this.state.todo,done:this.state.done}),React.createElement(E,{className:"item-notes-btn item-notes-btn-open",txt:"Notes",handle:this.handleNotesOpen,disabled:t}),React.createElement("div",{className:"item-notes-wrap"},React.createElement(b,{className:"item-notes",maxlength:"500",placeholder:this.state.notesPlaceholder,value:this.state.notes}),React.createElement(E,{className:"item-notes-btn item-notes-btn-save",txt:"Save",handle:this.handleNotesSave}))),React.createElement(N,{id:this.state.catId,className:"item-category",categories:s,todoitem:!0,task:this.props.data.tasks[this.state.key],data:this.props.data,onChange:this.handleChangeCat}),React.createElement(E,{className:"item-edit",txt:"Edit",handle:this.handleEdit,disabled:t}),React.createElement(E,{className:"item-delete",txt:"Delete",handle:this.props.handleDelete}),React.createElement(R,{className:"item-done",classNameLabel:"item-done-label",handle:this.handleDone,checked:this.state.done}),React.createElement("span",{className:"item-date"},React.createElement("span",{className:"item-date-prefix"},"add. "),this.state.added),React.createElement("span",{className:"item-date"},React.createElement("span",{className:"item-date-prefix"},a," "),this.state.finished),React.createElement("span",{className:"item-pending"},"=> ",this.state.pending)))}}const x=e=>{let t=e.data.tasks,a=Object.keys(t),s=[],i={},n=e.data.restack;for(let e=0;e<a.length;e++){let s=a[e];i[t[s].order]=s}for(let r=0;r<a.length;r++){let l=n?i[r]:a[r];if(null!=e.selected&&"All"!=e.selected){if((null==t[l].category?p:t[l].category)!=e.selected)continue}s.push(React.createElement(C,{key:r,id:"row-"+(parseInt(r)+1),cname:"item-row",objKey:l,data:e.data,taskie:t[l],handleDelete:e.handleDelete}))}return React.createElement("div",null,s)};class S extends React.Component{constructor(e){super(e),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleAdd=this.handleAdd.bind(this),this.handleClear=this.handleClear.bind(this),this.handleDelete=this.handleDelete.bind(this),this.handleEditCat=this.handleEditCat.bind(this),this.handleFilterCat=this.handleFilterCat.bind(this),this.handleRestack=this.handleRestack.bind(this),this.handleArchive=this.handleArchive.bind(this),this.showRows=this.showRows.bind(this),this.state={theList:React.createElement(x,{data:this.props.data,handleDelete:this.handleDelete}),keys:Object.keys(e.data.tasks),listorder:this.props.data.listorder,restack:this.props.data.restack,stackText:this.props.data.restack?"Unstack":"Restack",archText:this.props.data.archive?"Unarchive":"Archive"}}componentDidUpdate(e){this.props!==e&&this.setState({restack:this.props.data.restack,theList:React.createElement(x,{data:this.props.data,handleDelete:this.handleDelete})})}showRows(e,t,a,s){for(let a in t){let i=t[a].task,n=document.querySelector("#item-key-"+a);if("filter"==e){if(s.exec(i))n.style.display="Block";else{document.querySelector("#item-key-"+a).style.display="None"}}else"add"==e&&n&&(n.style.display="Block")}}handleKeyUp(e){let t=e.target.value;var a=new RegExp(t,"i");let s=this.state.theList.props.data.tasks;this.showRows("filter",s,t,a)}handleAdd(e){let t=document.querySelector("#item-box");if(""==t.value.trim())return;this.setState({prevProps:this.props.data.tasks});let a=y(new Date),s={task:t.value,added:a,order:++this.state.listorder},i=this.state.keys,n=0;i.length>0&&(n=i.reduce((e,t)=>Math.max(e,t))+1),this.props.data.tasks[n]=s,d(c,this.props.data,p),i.push(n),this.setState({keys:i,listorder:this.state.listorder}),this.showRows("add",this.props.data.tasks),this.componentDidUpdate(),t.value=""}handleClear(e){if(0==Object.keys(this.props.data.tasks).length)return;confirm("Clear your entire list\nWarning: This action cannot be reversed")&&(this.props.data.tasks={},d(c,this.props.data,p),this.componentDidUpdate())}handleEditCat(){let e=this.props.data.categories.slice(0,2),t=this.props.data.categories.slice(2);t=t.join(", ");let a=prompt("Create a new category. Separate multiples with commas.\n\nIf you rename an existing Category\nyou will have to re-categorise affected items",t);if(a!=t){let t=a.split(",");t=t.map(e=>e.trim().capitalize()),t=e.concat(t);let s=this.props.data.tasks;for(let e in s)-1==t.indexOf(s[e].category)&&(s[e].category=p);this.props.data.categories=t,d(c,this.props.data,p)}this.componentDidUpdate()}handleFilterCat(){let e=document.querySelector("#cat-filter").value;this.setState({theList:React.createElement(x,{data:this.props.data,selected:e,handleDelete:this.handleDelete})})}handleDelete(e){let t=e.target.parentElement.querySelector(".item-obj-key").textContent;confirm("Delete this task?")&&(delete this.props.data.tasks[t],d(c,this.props.data,p)),this.componentDidUpdate()}handleRestack(e){this.state.restack?(this.props.data.restack=!1,e.target.textContent="Restack"):(this.props.data.restack=!0,e.target.textContent="Unstack"),d(c,this.props.data,p),this.componentDidUpdate(),location.reload()}handleArchive(e){let t;this.props.data.archive?(this.props.data.archive=!1,t=function(e,t,a){let s=!1,i=l(t);if(!i)return!1;let n=l(e),r=n.tasks,o=i.tasks;for(let e in o)r.hasOwnProperty(e)||(s=!0,r[e]=o[e]);return n.archive=!1,d(e,n,a),d(t,i,a),s}(c,h,p)):(this.props.data.archive=!0,t=function(e,t,a){let s=!1,i=l(e),n=l(t);n||(n=r());let o=i.tasks,c=n.tasks;for(let e in o){let t=o[e];t.done&&(s=!0,c.hasOwnProperty(e)||(c[e]=t),delete o[e])}return i.archive=!0,d(e,i,a),d(t,n,a),s}(c,h,p)),t&&location.reload()}render(){return React.createElement("div",{id:"todos"},React.createElement("div",{id:"above"},React.createElement(v,{id:"item-box",place:"Add new todo item",onKeyUp:this.handleKeyUp}),React.createElement(E,{id:"add-new",className:"above-btn",txt:"Add New",handle:this.handleAdd}),React.createElement(E,{id:"clear-list",className:"above-btn",txt:"Clear List",handle:this.handleClear}),React.createElement(E,{id:"cat-edit",className:"above-btn",txt:"Edit Categories",handle:this.handleEditCat}),React.createElement("span",{id:"cat-filter-label"},"Filter:"),React.createElement(N,{id:"cat-filter",categories:this.props.data.categories,onChange:this.handleFilterCat})),React.createElement("div",{id:"right"},React.createElement(E,{id:"restack",className:"right-btn",txt:this.state.stackText,handle:this.handleRestack}),React.createElement(E,{id:"archive",className:"right-btn",txt:this.state.archText,handle:this.handleArchive})),this.state.theList)}}class D extends React.Component{render(){return React.createElement("div",null,React.createElement("div",{id:"app-name-wrap"},React.createElement("span",{id:"app-name"},"Dutu"),React.createElement("span",{id:"version"},o),React.createElement("span",{id:"app-byline"},"the todo app for big plans")),React.createElement("div",{id:"table-wrap"},React.createElement("div",{id:"table"},React.createElement(S,{data:this.props.data}),React.createElement("div",{id:"right-wrap"}))))}}ReactDOM.render(React.createElement(D,{data:u}),document.getElementById("root"))}]);