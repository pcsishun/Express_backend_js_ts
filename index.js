"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
var express_1 = __importDefault(require("express"));
var app = express_1.default(); // ไว้สำหรับสร้าง  app backend เป็น object
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
    res.json({
        path: "todos"
    });
});
app.get('/todos/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.params);
    res.json({
        path: "todos",
        id: id,
    });
});
app.get('/todos/:id/:name', function (req, res) {
    var _a = req.params, id = _a.id, name = _a.name;
    console.log(req.params);
    res.json({
        path: "todos",
        id: id,
        name: name,
    });
});
// จากนั้นการยิงออกไปต้องระบุ port พร้อมกับ callback ว่าจะให้วิ่งไปที่ไหน (จริงๆจะใส่หรือไม่ก็ได้เป็น option)
app.listen(3000, function () { return console.log('serve is running.'); });
