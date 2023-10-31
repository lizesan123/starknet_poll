

import { Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
// 创建 Alchemy 实例
const alchemy = new Alchemy({
  apiKey: 'uZdrbf8mCwNAbpVI3wNDUyrwOIl9PUiD',
});

alchemy.ws.on({ method: 'alchemy_minedTransactions' },

  (result) => {

    //console.log('最新交易', result);
    
    if (result.transaction.input == '0x'){
      const value = parseInt(result.transaction.value, 16)/ 1e18;
    
      if (value >= 10 ){
        console.log('大于10个eth的转账', value);
      }
    }
    else {

      //转移函数头
      const transferMethodSignature = '0xa9059cbb';
      if (result.transaction.input.startsWith(transferMethodSignature)) {
        /* switch(result.transaction.to){
          case 1
        } */

        // 解析输入数据获取转移的目标地址和代币数量
        const data = result.transaction.input.slice(10);
        const toAddress = '0x' + data.slice(0, 64);
        const amount = ethers.BigNumber.from('0x' + data.slice(64));
        console.log('目标哈希:', result.transaction.hash);
        console.log('目标地址:', toAddress);
        console.log('转移代币数量:', amount.toString());
        console.log('all:', result);
      } 
    }
  }
);

