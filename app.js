const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const conn = mysql.createConnection({
  user: 'root',
  password: '123123444',
  host: 'localhost',
  database: 'minigpt',
  port: '3306',
})
conn.connect();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.all('*', function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, token');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    if (req.method == 'OPTIONS') res.send(200);
    else next();//让options请求快速返回 
})

app.post('/minigpt', function (req, res)
{
  var body = ''
    req.on('data', (chunk) =>
    {
        body += chunk;
    })
    req.on('end', () =>
    {
        data = JSON.parse(body);
        let sql = `select * from questions_answers where question = '${data.message}'`;
        conn.query(sql, function (err, rows)
        {
            res.send({ value: rows[0].answer });
            console.log(rows);
        })
  })
})
app.listen(3008, () =>
{
  console.log(`http://localhost:3008`)
})
