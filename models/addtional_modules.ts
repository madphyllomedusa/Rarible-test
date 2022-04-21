//rarible link example 
//https://rarible.com/token/0xed5af388653567af2f388e6224dc7c4b3241c544:4694?tab=details
//https://rarible.com/token/flow/A.01ab36aaf654a13e.RaribleNFT:192190?tab=details
//https://rarible.com/token/tezos/KT1PtNemJpLtKNCNBC5r15aRDvTonSMGcz1x:21?tab=owners
//https://rarible.com/token/polygon/0x588e505d214d1e24c0b0deaa53a963700a3dcffc:81828986316751803125285982581567898552560266892957231837264565462423134273549?tab=owners
//let url = 'https://rarible.com/token/0xed5af388653567af2f388e6224dc7c4b3241c544:4694?tab=details'
//let url = 'https://rarible.com/token/tezos/KT1PtNemJpLtKNCNBC5r15aRDvTonSMGcz1x:21?tab=owners'
export function getItemByIdRequestLinkSetup(url: string){
    let blockchain: string =''
    let contractAdress: string =''
    let tokenId: string =''
    let splitUrl = url.split('/')
    //console.log(splitUrl[4])
    if(splitUrl[4] == 'flow'){
        blockchain = 'FLOW'
    }
    else if(splitUrl[4] == 'tezos'){
        blockchain = 'TEZOS'
    }
    else if (splitUrl[4] == 'polygon'){
        blockchain = 'POLYGON'
    }
    else {
        blockchain = 'ETHEREUM'
    }
    if(blockchain == 'ETHEREUM'){
        splitUrl = splitUrl[4].split(':')
        //console.log(splitUrl)
        contractAdress = splitUrl[0]
        splitUrl = splitUrl[1].split('?')
        tokenId = splitUrl[0]
    }
    else {
        splitUrl = splitUrl[5].split(':')
        //console.log(splitUrl)
        contractAdress = splitUrl[0]
        splitUrl = splitUrl[1].split('?')
        tokenId = splitUrl[0]
    }
    return `https://api.rarible.org/v0.1/items/${blockchain}:${contractAdress}:${tokenId}`
}

//const resultlink = apiRequestLinkSetup(url)
//console.log(resultlink)