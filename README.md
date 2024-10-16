# How to run:

You have to have docker installed.

Once installed run commands below.

```console
    docker build -t [name] .
```

```console
    docker run -p 3000:3000 [name]
```

## TODO:

- [x] Add adding of folders functionality (To button on sidebar, and context menu)
- [x] Add adding of notes functionality
- [x] Mockup code move to another file
- [x] Refactor localstorage custom hook
- [ ] Create backend for project
  - [x] Connect Prisma with the front-end
  - [x] Make function for deleting folders and notes
  - [x] Make function for moving notes to different folders
  - [x] Make function for renaming notes
  - [ ] Implement error checking when renaming notes/folders. So the empty string is by default (No title)
- [ ] Find better approach to deleting notes that are in folder
- [x] Implement loading skeleton on sidebar component
- [x] Make a note page
- [x] Make editing note functionality
- [ ] Make tags, when you visit a note, display tags where that note is nested
- [x] Delete note functionality on form edit note page
  - [x] When deleting note with Context-menu or with function make sure we redirect to homepage
- [x] Add toast notification for CRUD operations
- [ ] Add more complex error pages
- [x] Add error checking when the id on note page isn't found
- [x] Add markup page that displays documentation.
- [x] Add better styling for markdowns
- [x] Style better toast notification
- [x] In the folder controlls, make name edit button turn to check on input show
- [ ] make it mobile responsive
- [x] save sidebar settings somewhere
- [x] Make colorschemes
- [ ] Add dynamic imports
- [ ] refactor sidebar resize drag functionality
- [ ] Put everything in ENV, checkout docker what is missing for ENV.
- [ ] Make dynamic theme changing fucntion when implement multiple themes
