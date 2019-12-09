'use strict';

import {params} from './setup.js';

var defaultCategories = params.defaultCategories;
var defaultCategory = params.defaultCategory;

export function newDutu() {
    const data = { 
        "me" : params.me,
        "categories": defaultCategories, // default
        "tasks" : {},
        "restack": false,
        "archive": false,
      }
    return data
}

export function retrieveDutu(store) {
    
    // get JSON file or return null
    let obj = localStorage.getItem(store+"JSON");
    obj = (obj == null || obj == 'undefined') ? null : obj;
    if (obj == null) return obj
    
    obj = JSON.parse(obj);

    // if no orders node; create one - 0.14  
    // we always reset order on load in case things have changed
    obj['listorder'] = -1;  

    let tasks = obj.tasks;
    for (let t in tasks) {
         // set to default if if task has no category
        if (!tasks[t].hasOwnProperty('category')) {
            tasks[t].category = defaultCategory;
        }
        // if blank then set to default
        if (tasks[t].category.trim() == '') {
            tasks[t].category = defaultCategory;
        }
        // add category to categories if not in categories node
        if (obj.categories.indexOf(tasks[t].category) == -1) {
            obj.categories.push(tasks[t].category)            
        }
        // remove blanks
        obj.categories = obj.categories.filter((cat)=>cat.trim() != '');
        
        // listorder: for restacking - we only do live tasks now
        if (!tasks[t].done) {
            tasks[t].order = ++obj.listorder;
        } 
    }
    // do record order for done tasks
    for (let t in tasks) {
        if (tasks[t].done) {
            tasks[t].order = ++obj.listorder;
        }
    }

    return obj;
}

export function saveDutu(store, data, defaultCategory) {
    let tasks = data.tasks;
    for (let t in tasks) {
        if (typeof tasks[t].category != 'string') {
            tasks[t].category = defaultCategory;
        }
    }
    localStorage.setItem(store+"JSON", JSON.stringify(data));
}

export function archiveDutu(primary, archive, defaultCategory) {
    
    let reload = false;
    
    // load both live and existing stores
    let live = retrieveDutu(primary);
    let archived = retrieveDutu(archive);
    if (!archived) { archived = newDutu(); }

    // archive done tasks
    let livetasks = live.tasks;
    let archtasks = archived.tasks;
    for (let t in livetasks) {
        let task = livetasks[t]
        if (task.done) {
            reload = true;
            // copy over if not already in archive
            // taking care not to duplicate b/c if previously unarchived
            if (!archtasks.hasOwnProperty(t)) {
                archtasks[t] = task;
            }
            delete livetasks[t];
        }
    }
    live.archive = true;
    saveDutu(primary, live, defaultCategory);
    saveDutu(archive, archived, defaultCategory);
    return reload
}

export function unarchiveDutu(primary, archive, defaultCategory ) {

    let reload = false;

    // abort if no current archive
    let archived = retrieveDutu(archive);
    if (!archived) { return false }

    let live = retrieveDutu(primary);

    // add done tasks to live
    let livetasks = live.tasks;
    let archtasks = archived.tasks;
    for (let t in archtasks) {
        if (!livetasks.hasOwnProperty(t)) {
            reload = true;
            livetasks[t] = archtasks[t];
        }
    }
    live.archive = false;
    saveDutu(primary, live, defaultCategory);
    saveDutu(archive, archived, defaultCategory);
    return reload
}