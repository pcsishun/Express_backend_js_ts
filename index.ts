// const express = require('express');
import express from 'express';
import bodyParser from  'body-parser';
import fs from 'fs'; //  สำหรับสร้างไฟล์เก็บข้อมูล เมื่อทำการปิด serve ค่าต่างๆจะไม่หาย

// สร้าง interface ไว้เก็บข้อมูลใน Todos เอามาใช้งานกับ post methods line 47

interface Todo {
    id:number
    title:string
    desc:string
}



let Todos: Todo[] = [] // เราสร้างค่านี้ไว้เพื่อที่จะทำการ push ค่าเข้าไปด้านใน

const app = express() // ไว้สำหรับสร้าง  app backend เป็น object
app.use(bodyParser.json()) // เพิ่ม pugin ให้ body อยู่ในรูปแบบของ json 



// การเขียน path จำเป็นต้องมีองค์ประกอบอยู่ 2 อย่าง ณ บริเวณ callback คือ req res ต้องเรียงตามรายละเอียดตามนี้
// res ต้องดึง หรือเก็บเป็น json 
// การใช้ res นั้นจะขึ้นบน serve เสมอ 

app.get('/', (req, res) => {
    console.log('this is index page.') // จะถูกแสดงที่หน้า termial
    
    res.json({
        message: "Hello world"
    })
})

// สามารถใช้เขียน web ได้แต่ไป react เถอะ 
app.get('/home', (req, res) => {
    console.log("this is homepage")
    console.log("Asdasdasd")
    res.send('<h2>This is homepage</h2>')
})

app.get('/todos', (req, res) => {
    console.log("this is todos page.")
    const file = fs.readFileSync('db.json', 'utf-8') // (ชื่อไฟล์, ตัว encoding ตัวอักษร)
    const db = JSON.parse(file) // การใช้ parse เป็นการทำให้ file อยู่ในรูปแบบของ json 
    // res.json({
    //     path: "todos"
    // })
    res.json(db.Todos)
})

app.post('/todos', (req, res)=>{
    console.log("This is todos post methods")
    const file = fs.readFileSync('db.json', 'utf-8') // (ชื่อไฟล์, ตัว encoding ตัวอักษร)
    const db = JSON.parse(file) // การใช้ parse เป็นการทำให้ file อยู่ในรูปแบบของ json 

    const todo:Todo = req.body // คาดหวังว่า Todo จะส่งค่าผ่านมาทาง body
    db.Todos.push({
        ...todo, // spread operator จะทำการแตก element ใน todo ออกมาทั้งหมด (ใน todo มี id, title, desc) 
        id: Date.now() // เมื่อนำ id มาวางไว้ด้านล่าง id จะทำการทับ id ใน spread operator
    })

    fs.writeFileSync('db.json', JSON.stringify(db)) // ต้แงแปลง json file ให้อยู่ในรูปแบบของ string โดยใช้ stringify 
    res.json({ message: "Create complete"})
})

// เมื่อทำการใส่ค่าลงใน body ใน location todos ใน method post ค่่าจะถูกจัดเก็บอยู่ใน interface Todo และถูกนำไปแสดงในรูปแบบของ json ใน location todos แบบ get methods

// delete methods 
app.delete('/todos/:id', (req,res)=>{
    console.log("this is delete methods")

    const file = fs.readFileSync('db.json', 'utf-8') // (ชื่อไฟล์, ตัว encoding ตัวอักษร)
    const db = JSON.parse(file) // การใช้ parse เป็นการทำให้ file อยู่ในรูปแบบของ json 
    const Todos: Todo[] = db.Todos

    const {id} = req.params
    const newTodos = Todos.filter(todo => todo.id !== Number(id))
    fs.writeFileSync('db.json', JSON.stringify(newTodos))
    if (!Todos){
        res.json({message: `this id not found ${id} 404`})
    }

    res.json({message: `id alreadly delete ${id}`})
    
})


// เรียกใช้ parameter req 
// app.get('/todos/:id/:name', (req, res) => {
//     const {id, name} = req.params
//     console.log("this is todos page.", "witd id:", id, "name:", name)
//     res.json({
//         path: "todos",
//         id,
//         name,
//     })
// })

// เรียกใช้ query parameter req 
// ลอง test 
// http://localhost:3000/queryparam/?test=somthing 
// http://localhost:3000/queryparam/?test=somthing&contant=Hi
// http://localhost:3000/queryparam/?test=somthing&contant=Hi&contant=Earth

app.get('/queryparam', (req, res) => {
    const {query, body} = req // req จะประกอบได้ด้วย req.query เเละ req.body (มาจากการ import bodyParser)
    console.log("this is queryparam page.")
    console.log("test")
    res.json({
        message: "queryparam",
        query,
        body,
    })
})



// จากนั้นการยิงออกไปต้องระบุ port พร้อมกับ callback ว่าจะให้วิ่งไปที่ไหน (จริงๆจะใส่หรือไม่ก็ได้เป็น option)
app.listen(3000, ()=> console.log('serve is running.'))

