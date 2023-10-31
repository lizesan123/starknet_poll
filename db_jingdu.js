const { MongoClient } = require('mongodb');
const axios = require('axios');

// 设置代理配置
const proxyConfig = {
    host: '104.239.84.156', // Clash 代理的主机地址
    port: 6191, // Clash 代理的端口号
    auth: {
      username: 'uwoqzznc', // 代理的用户名
      password: 't7584exmlvrh', // 代理的密码
    },
    protocol: 'http', // 使用 SOCKS5 代理
  };

// 创建 Axios 实例并设置代理
const axiosInstance = axios.create({
  proxy: proxyConfig,
});

const url = 'mongodb://root:liwenlue123@165.154.113.206:27017';
const dbName = 'address';




// 发送 GET 请求
const fetchData = async (id,doc) => {
    try {
      const response = await axiosInstance.get('https://www.okx.com/api/v5/dex/aggregator/all-tokens', {
        params: { chainId: id,},
      });
      try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(doc);
        
        for (let key in response.data.data) {
            if (response.data.data.hasOwnProperty(key)) {
                // 插入每个项
                const result = await collection.insertOne(response.data.data[key]);
                console.log('数据已成功插入:', result);
            }
        }
        client.close();
      } catch (error) {
        console.log('连接数据库出错:', error);
      }
      
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };
const ad = [{id:"1",name :"eth_1"},{id:"137",name :"polygon_137"},]

for (let item of ad) {
  fetchData(item.id, item.name);
}
  