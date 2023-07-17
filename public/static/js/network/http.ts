import axios from "axios";
import {serverIp,serverPort,servicePrefix} from '../../../../src/config/server';
import {UserInfo} from '../../../../src/interfaces/UserInterface';
import {JsonResponse} from '../../../../src/interfaces/PublicInterface';







export function httpGet(url: string, config: object,ip = serverIp, port = serverPort, prefix = servicePrefix): Promise<JsonResponse>{
    const fullRequestUrl = `${ip}:${port}${prefix}${url}`;
    
    return new Promise((resolve, reject) => {
        axios.get(fullRequestUrl,config)
        .then((res) => {
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })
      
}



export function httpPost(url: string, obj: object,config: object,ip =serverIp, port =serverPort, prefix = servicePrefix): Promise<JsonResponse>{
    const fullRequestUrl = `${ip}:${port}${prefix}${url}`;
    return new Promise((resolve, reject) => {
        axios.post(fullRequestUrl,obj,config)
        .then((res) => {
          resolve(res.data);
        }).catch(err => {
          reject(err);
        })
      })   
      
}




    


