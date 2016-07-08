const fs = require('fs'),
    wurl = require('wurl');

const sites = ['http://www.panli.com/']; // 这里存放网站的Url列表
let sheet = [];
sites.map(site => {
    let sitep = site.replace(/http|https|:|\//g, "");

    let addresses = JSON.parse(fs.readFileSync(`./resource/${sitep}.json`));
    addresses = addresses.map(address => {
        return wurl('hostname', address);
    });
    sheet.push({
        addresses: addresses,
        domain: site
    });
});

sheet = sheet.map(site => {
    // 此处即为书写csv的格式，可根据需要进行修改
    return site.addresses.join(`,${site.domain}\r\n`) + `,${site.domain}\r\n`;
});

fs.writeFileSync('./resources.csv',"ss");