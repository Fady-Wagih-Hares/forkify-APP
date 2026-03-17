// put the function that reuse many times
import { TIMEOUT_SEC } from "./config.js";
 const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url , uploadData = undefined){
  try{
  const fetchPro = uploadData ? fetch(url ,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(uploadData)
    }):fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
            const data = await res.json();
            
            if (!res.ok) throw new Error(`${data.message} (${res.status})`);
            // console.log(res, data  );
            return data;
        }
        catch(err){
            // console.log(err.message);

            // rethrow the error => reject the promise if there are some errors
            throw err
            
        }
}
/*
export const getJSON = async function (url){
try{
    const res = await Promise.race([fetch(url) , timeout(TIMEOUT_SEC)]);
            const data = await res.json();
            
            if (!res.ok) throw new Error(`${data.message} (${res.status})`);
            // console.log(res, data  );
            return data;
        }
        catch(err){
            // console.log(err.message);

            // rethrow the error => reject the promise if there are some errors
            throw err
            
        }
        }
        // sending data to API
export const sendJSON = async function (url , uploadData){
try{
    const res = await Promise.race([fetch(url ,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(uploadData)
    }) , timeout(TIMEOUT_SEC)]);
            const data = await res.json();
            
            if (!res.ok) throw new Error(`${data.message} (${res.status})`);
            // console.log(res, data  );
            return data;
        }
        catch(err){
            // console.log(err.message);

            // rethrow the error => reject the promise if there are some errors
            throw err
            
        }
        }
        */