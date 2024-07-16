import axios from 'axios';
const headers:any = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json' ,
    'Authorization': "Bearer "+ localStorage.getItem("token")
}
async function get(url: string) {
    
    return axios.get(url, {headers}).then(res => {
        return res.data;
    })
}
function post(url: string, body: any) {

    return axios.post(url, body, {headers}).then(res=>{
        if (res.data) {
            return res.data;
         }
    })
   
}

export { get, post }