# dutu
the little todo app for big plans

Dutu is a lightweight todo browser app written in React and native Javascript. Todo items are created in a straightforward GUI and saved to a JSON file stored in the browser's local storage.

Installation
1. Clone the repository OR
    
   If you're feeling brave you can zip all the files using 
http://github.com/dem-ola/dutu//zipball/master/ and then rename or move the folder if you want.

2. IMPORTANT: Disable Cross-Origin restrictions
   In Safari you do this in the Develop menu

3. Open the dutu.html file in the folder from your browser.\
   The first time you open this you should see
   - an Input box;
   - two buttons: Add New and Clear List
   - an Edit Categories button and a dropdown box for filtering categories

Use\
The input box for new items - type in new todo items\
Add New - click to create and add a new item\
Clear List - this will delete all items after a warning\
Edit Categories - add new categories here\
Filter - filter todo list by category\
Restack - re-order list placing Done items at bottom. Unstack to reverse\

Each todo item:\
'Notes' - click to get a popup box for notes. 'Save' or 'Close' to save without saving.
Category - default is 'General' on creation. Change this after adding new Categories. 
Edit - Click to edit item text\
Delete - this will delete the todo item after a warning\
Done checkbox - click to indicate item done; will add a 'finished' date (default: now) to the item row\
add. date - date item created\
fin. date - date item completed\
number d - days since added or completed if finsished 

There's no overall Save button: everything is saved as you go along.

Future\
I have more ideas for Dutu and will add to it over time.

Comments\
All constructive ideas and comments welcome.
