# Dutu
the lightweight todo app for big plans

Dutu is a lightweight todo browser app written in React and native Javascript. Todo items are created in a straightforward GUI and saved to a JSON file stored in your browser's local storage.

**Installation**
1. Clone the repository OR

    You can copy the files from the 'dist' folder and point your browsr to the html file  OR 
    
    If you're feeling brave you can zip all the files using\
    http://github.com/dem-ola/dutu//zipball/master/  
    and then rename or move the folder if you want.


2. IMPORTANT: Disable Cross-Origin restrictions
   In Safari you do this in the Develop menu

**Use**\
Open the dutu.html file from your browser. The first time you open this you should see

   - An input box to add new items
   - Add New           		- to add items to storage
   - Clear List         - will clear all the list. Warning! There's no Undo.
   - Edit Categories    - add/delete todo categories
   - Filter             - filter list by categories
   - Restack            - re-order list placing Done items at bottom. Unstack to reverse
   - Archive            - move all Done items to an archive JSON file
   - Unarchive          - restore archive items to the list

Each todo item:
   - Notes              - opens box for notes. 'Save' or 'Close' without saving.
   - Category           - default is 'General'. Change this after adding new Categories (see Edit Categories above)
   - Edit               - Edit a todo item text
   - Delete             - Delete todo items
   - Done               - check completed items; adds curent day as 'finished' date
   - add. date          - date item created
   - fin. date          - date item completed
   - Number d           - days since added or, if completed, to finish. 

There's no overall Save button: everything is saved as you go along.

Future\
I have more ideas for Dutu and will add to it over time.

Comments\
All constructive ideas and comments welcome.
