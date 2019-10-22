const dns = require('dns')

dns.lookup('baidu.com',(err, address, family) => {
    console.log('IP 地址: %j 地址族: IPv%s', address, family);
    //结果为 【IP 地址: "220.181.38.148" 地址族: IPv4】
})

dns.resolve('www.qq.com','A',(err,address)=>{
    if(err) throw err;
    console.log(address);
    //结果为 【[ '113.96.232.215', '14.18.175.154' ]】
});
