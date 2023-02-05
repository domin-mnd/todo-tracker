# Todo App

![Todo App](/public/preview.png)

This is a minimalistic CRUD Todo app built with Vue.js and Tailwind CSS.
It uses firestore instead of local storage to store the todos.

## Project setup

```bash
git clone https://github.com/Domin-MND/todo-tracker . # clone the repository
npm install # or yarn
npm run build # build the project
npm run preview # start the project, you can provide --port & --host flags directly in package.json script
```

## Firebase

This project uses firebase therefore to run the project you need to setup a firebase project. To do that:
- Add project
- Add firebase to your app - select "Web" to get started
- Place firebase SDK credentials in `config.ts` (copy & paste `config.example.ts` & rename it)
- Add authentication. There's only 1 provider to add - Google.
- Setup cloud firestore - create the database.
- In cloud firestore stepper select "Rules" & edit the following line: `allow read, write: if false;` to `allow read, write: if true;`
- Done!

## Colors

This project is all made with Tailwind CSS.
The colors are defined in the `tailwind.config.js` file.
The project itself is based on dark colors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contribute

If you want to contribute to this project, feel free to open a pull request.