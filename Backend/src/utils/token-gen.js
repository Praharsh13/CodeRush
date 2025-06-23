import crypto from 'crypto'
const temporaryTokenGenration=()=>{

    const unhashedToken=crypto.randomBytes(20).toString("hex")
    const hashedToken=crypto.createHash("sha256").update(unhashedToken).digest("hex")
    const expiryDate=new Date(Date.now()+(20*60*1000))  //20 mins

    return {unhashedToken,hashedToken,expiryDate}

}

export default temporaryTokenGenration