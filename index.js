"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var fs_1 = __importDefault(require("fs")); //  สำหรับสร้างไฟล์เก็บข้อมูล เมื่อทำการปิด serve ค่าต่างๆจะไม่หาย
var Todos = []; // เราสร้างค่านี้ไว้เพื่อที่จะทำการ push ค่าเข้าไปด้านใน
var app = express_1.default(); // ไว้สำหรับสร้าง  app backend เป็น object
app.use(body_parser_1.default.json()); // เพิ่ม pugin ให้ body อยู่ในรูปแบบของ json 
// การเขียน path จำเป็นต้องมีองค์ประกอบอยู่ 2 อย่าง ณ บริเวณ callback คือ req res ต้องเรียงตามรายละเอียดตามนี้
// res ต้องดึง หรือเก็บเป็น json 
// การใช้ res นั้นจะขึ้นบน serve เสมอ 
app.get('/', function (req, res) {
    console.log('this is index page.'); // จะถูกแสดงที่หน้า termial
    res.json({
        message: "Hello world"
    });
});
// สามารถใช้เขียน web ได้แต่ไป react เถอะ 
app.get('/home', function (req, res) {
    console.log("this is homepage");
    console.log("Asdasdasd");
    res.send('<h2>This is homepage</h2>');
});
app.get('/todos', function (req, res) {
    console.log("this is todos page.");
    var file = fs_1.default.readFileSync('db.json', 'utf-8'); // (ชื่อไฟล์, ตัว encoding ตัวอักษร)
    var db = JSON.parse(file); // การใช้ parse เป็นการทำให้ file อยู่ในรูปแบบของ json 
    // res.json({
    //     path: "todos"
    // })
    res.json(db.Todos);
});
app.post('/todos', function (req, res) {
    console.log("This is todos post methods");
    var file = fs_1.default.readFileSync('db.json', 'utf-8'); // (ชื่อไฟล์, ตัว encoding ตัวอักษร)
    var db = JSON.parse(file); // การใช้ parse เป็นการทำให้ file อยู่ในรูปแบบของ json 
    var todo = req.body; // คาดหวังว่า Todo จะส่งค่าผ่านมาทาง body
    db.Todos.push(__assign(__assign({}, todo), { id: Date.now() // เมื่อนำ id มาวางไว้ด้านล่าง id จะทำการทับ id ใน spread operator
     }));
    fs_1.default.writeFileSync('db.json', JSON.stringify(db)); // ต้แงแปลง json file ให้อยู่ในรูปแบบของ string โดยใช้ stringify 
    res.json({ message: "Create complete" });
});
// เมื่อทำการใส่ค่าลงใน body ใน location todos ใน method post ค่่าจะถูกจัดเก็บอยู่ใน interface Todo และถูกนำไปแสดงในรูปแบบของ json ใน location todos แบบ get methods
// delete methods 
app.delete('/todos/:id', function (req, res) {
    console.log("this is delete methods");
    var file = fs_1.default.readFileSync('db.json', 'utf-8'); // (ชื่อไฟล์, ตัว encoding ตัวอักษร)
    var db = JSON.parse(file); // การใช้ parse เป็นการทำให้ file อยู่ในรูปแบบของ json 
    var Todos = db.Todos;
    var id = req.params.id;
    if (!Todos) {
        res.json({ message: "this id not found " + id + " 404" });
    }
    else {
        var newTodos = Todos.filter(function (todo) { return todo.id !== Number(id); });
        fs_1.default.writeFileSync('db.json', JSON.stringify(newTodos));
        res.json({ message: "id alreadly delete " + id });
    }
});
// update methods 
app.put('/todos/:id', function (req, res) {
    var id = req.params.id;
    var title = req.body.title;
    var file = fs_1.default.readFileSync('db.json', 'utf-8');
    var db = JSON.parse(file);
    // console.log("id:", id)
    // console.log("file:", db['Todos'][0].id);
    for (var i = 0; i < db['Todos'].length; i++) {
        // console.log(db['Todos'][i]);
        if (db['Todos'][i].id === Number(id)) {
            // console.log("Now it in if");
            db['Todos'][i].title = title;
            fs_1.default.writeFileSync('db.json', JSON.stringify(db));
            res.json({ message: "Success update." });
            break;
        }
        else {
            res.json({ message: "Not found this id. 404" });
        }
    }
});
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
app.get('/queryparam', function (req, res) {
    var query = req.query, body = req.body; // req จะประกอบได้ด้วย req.query เเละ req.body (มาจากการ import bodyParser)
    console.log("this is queryparam page.");
    console.log("test");
    res.json({
        message: "queryparam",
        query: query,
        body: body,
    });
});
// จากนั้นการยิงออกไปต้องระบุ port พร้อมกับ callback ว่าจะให้วิ่งไปที่ไหน (จริงๆจะใส่หรือไม่ก็ได้เป็น option)
app.listen(8000, function () { return console.log('serve is running.'); });
