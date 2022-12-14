require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:iampassword123@cluster0.vjvs0aq.mongodb.net/?retryWrites=true&w=majority';
//let db = jelynmongodatabase;

MongoClient.connect(url, function(err, client) {
    console.log('Connected successfully to the db server!');

    const db = client.db('jelynmongodatabase');
});

function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err? reject(err) : resolve(doc);
        });
    })
}

function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            // change the toArray
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {email, password};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err? reject(err) : resolve(doc);
        });
    })
}

function deposit(user, amount) {
    const newBalance = user.balance + Number(amount);
    console.log('newBalance' + newBalance);
    return new Promise ((resolve, reject) => {
        try{
            const customers = db
            .collection('users')
            .updateOne(
                // {name: user.name},
                {email: user.email}, 
                {$set: {balance: newBalance}}, 
                // function(err, docs) {
                // err ? reject(err): resolve(docs);
            );
        resolve(customers)
        } catch(e) {
            reject(e)
        }
        
    });
}


function withdraw (user, amount) {
    const newBalance = user.balance - Number(amount);
    //user.balance = newTotal;
    console.log('newBalance' + newBalance);
    return new Promise ((resolve, reject) => {
        try{
            const customers = db
            .collection('users')
            // .find({email: email}, {balance: amount})
            .updateOne( 
                {email: user.email},
                {$set: {balance: newTotal}},
            // .toArray(function(err, docs) {
            // err ? reject(err): resolve(docs);
        );
        resolve(customers)
        } catch(e) {
            reject(e)
        }
    });
}

function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
};


function all() {
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err, docs) {
            err? reject(err) : resolve(docs);
        });
    })
}

module.exports = {create, findOne, find, deposit, withdraw, login, update, all}