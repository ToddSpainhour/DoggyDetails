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
        })
      console.log(`the cookie value is: ${OwnerIDFromCookies}`);      

    if(OwnerIDFromCookies == null || value == 0)
    {
        console.log("you're logged out");
        //
    } 
    else 
    {
        console.log("the OwnerID value is not zero or null so you must be logged in");
        console.log(`OwnerID: ${value}`)
        // show logout btn
        // hide create account
        // hide login component
    }
}

export default { getOwnerIDCookie }
