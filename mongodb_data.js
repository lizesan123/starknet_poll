const { MongoClient } = require('mongodb');

// 远程MongoDB连接URL，替换为实际的远程服务器地址和端口
const url = 'mongodb://root:liwenlue123@165.154.113.206:27017';


// 数据库名称
const dbName = 'address';
f
// 数据
const data = {
    "币安冷钱包1": {
        "name": "币安冷钱包1",
        "address": "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8"
    },
    "Kraken": {
        "name": "Kraken",
        "address": "0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf"
    },
    "arb链总资产": {
        "name": "arb链总资产",
        "address": "0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a"
    },
    "币安冷钱包2": {
        "name": "币安冷钱包2",
        "address": "0xF977814e90dA44bFA03b6295A0616a897441aceC"
    },
    "Bitfinex交易所": {
        "name": "Bitfinex交易所",
        "address": "0xE92d1A43df510F82C66382592a047d288f85226f"
    }
};

async function connectAndInsertData() {
  try {
    const client = await MongoClient.connect(url);
    console.log('成功连接到数据库');

    const db = client.db(dbName);
    const collection = db.collection('addresses');
    
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            // 插入每个项
            const result = await collection.insertOne(data[key]);
            console.log('数据已成功插入:', result.ops[0]);
        }
    }

    // 插入数据
    

    // 关闭数据库连接
    client.close();
  } catch (error) {
    console.log('连接数据库出错:', error);
  }
}

connectAndInsertData();
