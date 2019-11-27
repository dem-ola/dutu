'use strict';

export function retrieveDutu(dataStore) {
    
    // get JSON file or return null
    let obj = localStorage.getItem(dataStore+"JSON");
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

export function saveDutu(dataStore, data, defaultCategory) {
    // checks
    //1. each task has a category; if not set to default
    let tasks = data.tasks;
    for (let t in tasks) {
        if (typeof tasks[t].category != 'string') {
            tasks[t].category = defaultCategory;
        }
    }
    localStorage.setItem(dataStore+"JSON", JSON.stringify(data));
}