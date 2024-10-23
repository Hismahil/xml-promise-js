'use strict';

const xhrGet = function(url, callback) {
    try {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                switch(xhr.status) {
                    case 200: callback(JSON.parse(xhr.response)); break;
                    case 400: throw new Error('Bad Request'); break;
                    case 401: throw new Error('Unauthorized'); break
                    case 403: throw new Error('Forbidden'); break;
                    case 502: throw new Error('Bad Gateway'); break;
                    case 504: throw new Error('Gateway Timeout'); break;
                    case 500:
                    case 503:
                    default: throw new Error('Internal Server Error');
                }
            }
        };

        xhr.open('GET', url);
        xhr.send();
    }
    catch(e) {
        throw e;
    }
};

const xhrPost = function(url, jsonObject, callback) {
    try {
        const xhr = new XMLHttpRequest();

        console.log(jsonObject);

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {

                switch(xhr.status) {
                    case 200: 
                    case 201: callback(true); break;
                    case 400: throw new Error('Bad Request'); break;
                    case 401: throw new Error('Unauthorized'); break
                    case 403: throw new Error('Forbidden'); break;
                    case 502: throw new Error('Bad Gateway'); break;
                    case 504: throw new Error('Gateway Timeout'); break;
                    case 500:
                    case 503:
                    default: throw new Error('Internal Server Error');
                }
            }   
            
        };

        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(jsonObject);
    }
    catch(e) {
        throw e;
    }
};


const promiseGET = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);
        return data;
    }
    catch(e) {
        throw e;
    }
};

const promisePOST = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const response = await res.json();

        return response;
    }
    catch(e) {
        throw e;
    }
};