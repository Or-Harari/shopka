
function GetItems(setItem) {
    fetch('/api/getItems')
    .then((res) => res.json()
    .then((data) => {
        if(!res.ok){
            throw new Error(res)
        }
        else{
            setItem(data)
        }})
    .catch(err => {console.log(err.message)}))
}

function GetUserFavorites(user,itemsList, SetItems){
    fetch('/api/getUserFavorites',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:user.userName})})
    .then((res) => res.json()
    .then((data) => {
        if(!res.ok){
            throw new Error(res)
        }
        else{
            let favorite = data;
            let itemsArray = [];
            if(user && itemsList && favorite.length > 0){
                favorite.map(favorite => {
                    let item =itemsList.find(item => item._id === favorite)
                    itemsArray.push(item)
                })
                SetItems(itemsArray)
            }else{
                SetItems(null);
            }
        }})
    .catch(err => {console.log(err.message)}))
}

function login(name, setUser){
    let userName = {name:name} 
    if(userName){
        fetch('/api/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userName)})
            .then(response => response.json()
            .then(responseData => {
                if(!response.ok){
                    throw new Error(responseData)
                }
                else{
                    console.log('works')
                    setUser(responseData)
                }
            })
            .catch(err => {console.log(err.message)}))
    }else  {
        return null
    }
   
}

module.exports = {
    GetItems: GetItems,
    login:login,
    GetUserFavorites:GetUserFavorites,
};




