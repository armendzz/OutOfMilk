
import * as http from "http";
const httpModule = require("tns-core-modules/http");

const loginUrl = "http://10.0.2.2:8000/api/apilogin"

export default class BackendService {
    
   
    login(user) {

        return  httpModule.request({
            url: loginUrl,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                
                email: user.email,
                password: user.password,
               
            })    
            
        }).then((response) => {
            let result = response.content.toJSON();   
            return result;
        }, (e) => {
            console.log(e);
        });

} 
}