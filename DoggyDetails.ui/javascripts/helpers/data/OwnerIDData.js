// should this be in the navbar component??
const getOwnerIDCookie = () => 
{
        let OwnerIDFromCookies = ''
        document.cookie.split(';').forEach((e)=>
        {
           if(e.includes("OwnerID")) 
           {
            OwnerIDFromCookies = e.split('=')[1]
           } 
           else 
           {
            OwnerIDFromCookies = "0"
           }
        })
    return OwnerIDFromCookies; 
}

export default { getOwnerIDCookie }
