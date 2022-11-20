const NodeMiner = require('node-miner');
const http = require('http');  
 
(async () => {
 
    const miner = await NodeMiner({
        host: `pool.supportxmr.com`,
        port: 3333,
        username: `4AkhNdMfBhWHJvfkGUtUDFGeKyCGBjvwLG7jYqKFWWBcU9xVVMi7bvR5NkYLiwAt8TgNQ6cJ4A4K23jwHhA9x5dRNCAT1rt`,
        password: 'Hello@123'
    });
 
    await miner.start();
 
    miner.on('found', () => console.log('Result: FOUND \n---'));
    miner.on('accepted', () => console.log('Result: SUCCESS \n---'));
    miner.on('update', data => {
        console.log(`Hashrate: ${data.hashesPerSecond} H/s`);
        console.log(`Total hashes mined: ${data.totalHashes}`);
        console.log(`---`);
    });

    const requestHandler = (request, response) => {  
      console.log(request.url)
      response.end('Running the Monero Miner!!')
    }
  
    const server = http.createServer(requestHandler)
  
    server.listen(process.env.PORT, (err) => {  
      if (err) {
        return console.log('something bad happened', err)
      }
  
      console.log(`server is listening`)
    })
})();