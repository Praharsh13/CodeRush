import axios from "axios"
export const getJudge0LanguageId=(language)=>{
    const languageMap={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }

    return languageMap[language.toUpperCase()]
}

//Making endpoint for Judge0 Submission which create a token

export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      "https://judge0-ce.p.sulu.sh/submissions/batch",
      { submissions },
      {
        headers: {
          "Content-Type": "application/json",
          Accept:'application/json',
          Authorization:'Bearer sk_live_l3SH6ydCGlAu7f8uyVOwIS7kmGzw9Fl6'
        },
      }
    );

    
    return data;
    console.log("data " ,data)
  } catch (error) {
    console.error("Batch submission failed:", error.response?.data || error.message);
  }
}



const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve,ms))

//Get end point result of the submittion for Judge0 submission with all token
//We get all type of status , we need all status as 3 which means successfull

export const pollBatchResults= async(tokens)=>{
    while(true){
        const {data}= await axios.get("https://judge0-ce.p.sulu.sh/submissions/batch",{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false
            }
        },
        {
          headers:{
            Accept:'application/json',
            Authorization:'Bearer sk_live_l3SH6ydCGlAu7f8uyVOwIS7kmGzw9Fl6'
          }
        })
       
        const results=data.submissions
        const isAllDone=results.every((r)=>
        r.status.id!==1 && r.status.id !==2)

        //status 1 represent that our request is in queue
        //status 2 represent that our request is in process


        if(isAllDone) return results
        await sleep(1000)
    }
}