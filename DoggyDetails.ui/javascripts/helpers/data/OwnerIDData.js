// should this be in the navbar component??
const getOwnerIDCookie = () => 
{
        let OwnerIDFromCookies = "";
        const cookieArray = document.cookie.split(';');

        for (let i = 0; i < cookieArray.length; i++)
        {
            if(cookieArray[i].includes("OwnerID")) 
            {
                OwnerIDFromCookies = cookieArray[i].split('=')[1];
                break;
            } 
        }
    return OwnerIDFromCookies; 
}

export default { getOwnerIDCookie }
