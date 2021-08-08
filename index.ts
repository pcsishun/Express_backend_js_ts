// const express = require('express');
import express from 'express';

const app = express() // ไว้สำหรับสร้าง  app backend เป็น object

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
    res.json({
        path: "todos"
    })
})

app.get('/todos/:id', (req, res) => {
    
    const {id} = req.params
    console.log(req.params);

    res.json({
        path: "todos",
        id,
    })
})

app.get('/todos/:id/:name', (req, res) => {
    
    const {id,name} = req.params

    console.log(req.params);

    res.json({
        path: "todos",
        id,
        name,
    })
})

// จากนั้นการยิงออกไปต้องระบุ port พร้อมกับ callback ว่าจะให้วิ่งไปที่ไหน (จริงๆจะใส่หรือไม่ก็ได้เป็น option)
app.listen(3000, ()=> console.log('serve is running.'))

