// expressモジュール読み込み
const express = require('express')
// Routerオブジェクトを生成
const router = express.Router()
// models/item.js を読み込む
const item = require('./models/item')

// GETリクエストの処理
router.get('/', (req, res) => {
    // リクエストの処理
    console.log(req.body)
    console.log(req.url)
    console.log(req.query)
    // レスポンスの処理
    // res.send('Hello!!!!!!')
    //テンプレート表示（レンダリング）
    res.render('index')
})

router.get('/profile', (req, res) => {
    // res.send('プロフィール')
    res.render("profile")
})

// /item/xxx のルーティング（パスパラメーター）
router.get('/item/:id', (req, res) => {
    const id = req.params.id
    // TODO: case1 RDBMS を利用する
    // TODO: case2 APIサーバを利用する
    // itemモデルを使って IDで商品データを取得
    var selectItem = item.find(id)
    res.send(selectItem.name)
})

// POSTリクエスト
router.post('/auth', (req, res) => {
    // POSTデータ取得
    var loginName = req.body.login_name
    var password = req.body.password
    console.log(loginName, password)

    var message = "ログイン失敗"
    // .env で設定した値で、ログインチェック
    // TODO：データベースに接続してユーザ取得
    // TODO：パスワードはハッシュ値でチェック
    if (loginName == process.env.LOGIN_NAME
        && password == process.env.PASSWORD) {
        message = "ログイン成功"
        //TODO ログインが成功したらユーザの状態を保存
        //TODO ログイン後のページの転送
    } else {
        // TODO ログイン画面に戻す
    }
    res.send(message)
})

// モジュール化
module.exports = router