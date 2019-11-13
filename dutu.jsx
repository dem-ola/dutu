'use strict';


let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var dutuData;
var dutuJSON;

// retrieve
dutuData = retrieveDutu();
if (dutuData == null) {
    // doesn't exist; make new blank and then open
  dutuData = { 
    "me" : "My",
    "tasks" : {}
  }
  saveDutu(dutuData);
  retrieveDutu();  
}

function retrieveDutu() {
    // get JSON file or return null
    let obj = localStorage.getItem("dutuJSON");
    obj = (obj == null || obj == 'undefined') ? null : obj;
    if (obj == null) return obj
    return JSON.parse(obj);
}

function saveDutu(data) {
    dutuJSON = JSON.stringify(data);
    localStorage.setItem("dutuJSON", dutuJSON);
}

function editClassName(elem, cname, action) {
    let cur = elem.className;
    let chg;
    if (action == 'add') {
        chg = cur + ' ' + cname;
    } else { //'remove'
        chg = cur.replace(cname, '');
    }
    elem.setAttribute('class', chg);
}

function convertTextToDate(dateText) {
    let reg = dateText.match(/(\d+)-(.*?)-(\d+)/);
    return new Date(reg[3], months.indexOf(reg[2]), reg[1])
}

function convertDateToText(date) {
    return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear()
}

function daysSince(dateText, fin=null) {
    if (dateText == null || dateText == undefined ) return '0d';

    let now = new Date();
    if (fin != null) {
        now = convertTextToDate(fin);
    }
    let then = convertTextToDate(dateText);
    return parseInt((now-then) / (1000 * 60 * 60 * 24))+'d'
}


////////////////////

const InputBox = props => {
    return (
        <input
            type='text'
            id={props.id} 
            className={props.className}
            placeholder={props.place}
            disabled={props.disabled}
            defaultValue={props.value}
            onChange={props.handle}
        />
    )
}

const Btn = props => {
    return (
        <button 
            id={props.id}
            className={props.className}
            onClick={props.handle}
            disabled={props.disabled}
            >
            {props.txt}
        </button>
    )
}

const CheckBox = props => {
    if ( props.checked == true || props.checked == 'true') {
        return (
            <span>
            <label className={props.classNameLabel}>Done =></label>
            <input
                className={props.className}
                type='checkbox' 
                checked={true}
                onChange={props.handle}
            />
             </span>
        )  
    } else { 
        return (
            <span>
            <label className={props.classNameLabel}>Done =></label>
            <input 
                className={props.className}
                type='checkbox' 
                checked={false}
                onChange={props.handle}
            />
            </span>
        )
    }
}


class ToDoItem extends React.Component {   
    constructor(props) {
        super(props)
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDone = this.handleDone.bind(this);

        this.state = {
            item: props.taskie,
            todo: props.taskie.task,
            key: props.objKey,
            confirm: 'Confirm',
            edit: 'Edit',
            editing: false,
            added: props.taskie.added,
            finished: props.taskie.finished,
            done: props.taskie.done,
        }
    }

    componentDidMount() {
        this.setState({
            pending: daysSince(this.state.added,this.state.finished),
        })
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
                this.setState({finished: finDate});
            }
            this.setState({done: true})
            this.props.data.tasks[this.state.key].done = true;
            
        } else {
            // enable edit button and change/keep finished date
            editClassName(inp, 'item-todo-done', 'remove');
            editBtn.removeAttribute('disabled');
            if (finDate != null && finDate != undefined) {
                let confirmed = confirm("Keep the old finished date?");
                if (!confirmed) {
                    finDate = null;
                    this.setState({finished: finDate});
                }
            }
            this.setState({done: false});
            this.props.data.tasks[this.state.key].done = false;
        }
        this.props.data.tasks[this.state.key].finished = finDate;
        saveDutu(this.props.data);
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
            this.setState({editing: true});

        } else {
            if (inp.value != this.state.todo) {
                let confirmed = confirm("Save this edit?");
                if (confirmed) {
                    // update data object, convert to JSON and save
                    this.setState({todo: inp.value});
                    this.props.data.tasks[this.state.key].task = inp.value;
                    saveDutu(this.props.data);
                } else {
                    inp.value = this.state.todo; // set back to former
                }
            } 

            // reset formats; also if no changes made
            inp.setAttribute('disabled', true);
            btn.textContent = this.state.edit;
            editClassName(btn, 'item-confirm-highlight', 'remove');
            editClassName(inp, 'todo-editing', 'remove');
            this.setState({editing: false});
        }         
    }

    render() {
        // props if item done already
        let boxcname = "item-todo";
        let disableBtn = false;
        let prefixFin = '';
        if ( this.state.done == true || this.state.done == 'true') {
            boxcname = "item-todo item-todo-done"
            disableBtn = true;
        }
        if ( this.state.finished != null) {
            prefixFin = 'fin.'
        }

        return ( 
            <div id={this.props.id} className={this.props.cname}>
                <span className="item-id">
                    {this.props.id.match(/\d+/)[0]}</span>
               
                <span className="item-obj-key">
                    {this.props.objKey}</span>         
                
                <InputBox
                    className={boxcname}
                    disabled={true}
                    value={this.state.todo}
                    done={this.state.done}
                />    

                <Btn 
                    className="item-edit" 
                    txt='Edit' 
                    handle={this.handleEdit}
                    disabled={disableBtn} />                
                
                <Btn 
                    className="item-delete" 
                    txt='Delete' 
                    handle={this.props.handleDelete} />

                <CheckBox 
                    className="item-done"
                    classNameLabel='item-done-label'
                    handle={this.handleDone}
                    checked={this.state.done} /> 
                
                <span className="item-date">
                    <span className='item-date-prefix'>add. </span>
                    {this.state.added}
                </span>

                <span className="item-date">
                    <span className='item-date-prefix'>{prefixFin} </span>
                    {this.state.finished}
                </span>

                <span className="item-pending">=> {this.state.pending}</span>

            </div>
        )
    }
}

const LoadList = (props) => {
    let tasks = props.data.tasks;
    let keys = Object.keys(tasks); // get keys so we can loop
    let rows = []

    for (let i=0; i<keys.length; i++) {
        let k = keys[i];
        rows.push(
            <ToDoItem key={k}
                id={'row-'+(i+1)}   // css id as well as shown row number
                cname='item-row'
                objKey={keys[i]}    // underlying object key
                data={props.data}
                taskie={tasks[k]}
                handleDelete={props.handleDelete}
            />
        )
    }
    return ( 
        <div>{rows}</div>
    );
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            theList: '',
            keys: Object.keys(props.data.tasks) // get keys so we can loop
        }
    }

    componentDidMount() {
        this.setState({
            theList : <LoadList 
                data={this.props.data}
                handleDelete={this.handleDelete} />
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                theList : <LoadList 
                    data={this.props.data}
                    handleDelete={this.handleDelete} />
            })
        }
    }

    handleAdd(e) {

        // get input or return null if nothing
        let inp = document.querySelector('#item-box');
        if (inp.value.trim() == '') return

        // save old Props for later DiDUpdate()
        this.setState({
            prevProps: this.props.data['tasks']}
        )
       
        // create new task
        let now = new Date();
        let date = convertDateToText(now)
        let newTask = {
            'task': inp.value,
            'added': date,
        }

        // add to database
        // use this.props and not a this.state.data copy
        // so underlying data object is changed
        let keys_ = this.state.keys;
        let newKey = 0;
        if (keys_.length > 0) {
            newKey = keys_.reduce((a,b)=>Math.max(a,b)) + 1;
        }
        this.props.data['tasks'][newKey] = newTask;
        saveDutu(this.props.data);
        
        // update shown list and keys
        keys_.push(newKey);
        this.setState({keys: keys_});
        this.componentDidUpdate();

        // reset input box
        inp.value = '';     
    }

    handleClear(e) {
        if (Object.keys(this.props.data['tasks']).length==0) return
        let confirmed = confirm("Clear your entire list\nWarning: This action cannot be reversed");
        if (confirmed) {
            this.props.data['tasks'] = {}
            saveDutu(this.props.data);
            this.componentDidUpdate();
        }
    }

    handleDelete(e) {
        let par = e.target.parentElement;
        let key = par.querySelector('.item-obj-key').textContent;
        let confirmed = confirm("Delete this task?");
        if (confirmed) {          
            delete this.props.data.tasks[key];
            saveDutu(this.props.data);
        }
        this.componentDidUpdate();
    }
       
    render() {
        return (
            <div>
                <div id='above'>
                    <InputBox
                        id='item-box'
                        place='Add new todo'
                    />
                    <Btn 
                        id='add-new'
                        txt='Add New' 
                        handle={this.handleAdd}
                    />
                    <Btn 
                        id='clear-list'
                        txt='Clear List' 
                        handle={this.handleClear}
                    />
                </div>
                {this.state.theList}
            </div>
        );
    }
}

class ToDo extends React.Component {
    render() {
        return (
        <div>
            <div id='app-name'>Dutu
                <span id='app-byline'>the todo app for big plans</span>
            </div>
            <div id='me'> {this.props.data.me} Todo List </div>
            <div id='table'>
                 <List data={this.props.data}/>
            </div>
        </div>
        )
    }
}

ReactDOM.render(
  <ToDo data={dutuData} />, 
  document.getElementById('root')
)