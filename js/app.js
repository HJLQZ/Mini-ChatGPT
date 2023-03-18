const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const Semaphore = require('semaphore');
const semaphore = Semaphore(3); // Semaphore对象初始值为3

const conn = mysql.createConnection({
  user: 'root',//your name
  password: 'password',//your password
  host: 'localhost',//your host
  database: 'minigpt',//your database
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
    if (!semaphore.available())
    {
        //res.send('对不起，繁忙中，请稍后再试');
        res.send({ value: '对不起，繁忙中，请稍后再试' });
        return;
    }
    semaphore.take(function ()// 获取到信号量，开始处理请求
    {
        var body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () =>
        {
            data = JSON.parse(body);
            let sql = `select * from questions_answers where question = '${data.message}'`;
            conn.query(sql, function (err, rows)
            {
                if (err) console.log('error!');
                else
                {
                    res.send({ value: rows[0].answer });
                    console.log(rows);
                }
            });
            let sql2 = `UPDATE questions_answers SET access_count = access_count + 1 WHERE question = '${data.message}'`;
            conn.query(sql2, function (err, rows)
            {
                if (err) console.log('error!');
                semaphore.leave();// 处理完成后释放信号量
            });
        });
    });
})

app.get('/hotlist', function (req, res)
{
    let sql = `SELECT * FROM questions_answers ORDER BY access_count DESC LIMIT 9`; 
    conn.query(sql, function (err, rows)
    {
        if (err) console.log('error!');
        else { res.send(rows);  }
    });
});

app.listen(3008, () =>
{
  console.log(`http://localhost:3008`)
})