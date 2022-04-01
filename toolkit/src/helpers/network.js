export const networkReq = async (api, body) => {
    let res = await fetch(api, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json();
}
export const newReq = async (api,type) => {
    let res = await fetch(api, {
        method: type,
        headers: { 
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        },
    })
    return await res.json();
}