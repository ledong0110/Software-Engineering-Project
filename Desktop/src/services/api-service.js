import $ from 'jquery';
const API_ENDPOINTS = "https://uwc2-0.herokuapp.com";

export async function loginHTTPRequest(username, password) {
    const response = await fetch(`${API_ENDPOINTS}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            "username": username,
            "password": password,
        }
    });
    var vdata =  await response.json();
    console.log(vdata)

    return vdata;
}
export async function registerHTTPRequest(username, password) {
    const response = await fetch(`${API_ENDPOINTS}/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            "username": username,
            "password": password,
        }
    });
    var vdata =  await response.json();
    console.log(vdata)
}

export async function isUsernameAvailableHTTPRequest(username) {
    const response = await fetch(`${API_ENDPOINTS}/isUsernameAvailable/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

export async function userSessionCheckHTTPRequest(username) {
    const response = await fetch(`${API_ENDPOINTS}/userSessionCheck/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}


export async function getConversationBetweenUsers(toUserID) {
    var response
    var dataStr = {data: "hello"}
    await $.ajax({
        type: "POST",
        url: `/chat-app/GetConversation/${toUserID}`,
        data: dataStr,
        success: (res)=>{
            response = JSON.parse(res)
        }

    })
    return response
}