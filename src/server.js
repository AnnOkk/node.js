import express from "express";
import dotenv  from "dotenv";
import studentRouters from "./routes/studentRoutes.js";

dotenv.config();


const port = process.env.PORT || 3000;
const app = express(); //Она создаёт объект приложения. Это объект веб-сервера(созд. маршрутов, подкл. middleware,запуск сервера)

app.use(express.json());//Чтобы json преобразовался в удобоваримую форму. Это middleware

//Прикручиваем Routes:
app.use(studentRouters);//!

app.use((req,res )=>
    res.status(404).type('text/plain').send('Not Found')); //если ни один из раутов не подойдет.

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})