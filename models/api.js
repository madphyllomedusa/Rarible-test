/*var XMLHttpRequest = require('xhr2');
//var xhr = new XMLHttpRequest();
//const requestURL = 'https://api.rarible.org/v0.1/items/FLOW:A.01ab36aaf654a13e.RaribleNFT:192192' 
const requestURL = 'https://api.rarible.org/v0.1/items/ETHEREUM:0xed5af388653567af2f388e6224dc7c4b3241c544:2539'
export function sendApiRequest(url){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = () => {
            if(xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }
        xhr.send()
    })
}*/

const rp = require('request-promise')
export function sendApiRequest(url){
    return new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: 'GET',
            json: true,
        }
        rp(options)
        .then(data => {
            console.log(`data: ${data}`)
        resolve(data)})
        .catch(erroe => {
            console.log(error)
            reject(error)
        })
    })
}