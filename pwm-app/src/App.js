import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import MainPage from './components/layout/MainPage';
import NavigationController from './components/navbars/NavigationController';
import SignUp from './components/user-auth/SignUp';
import WatchList from './pages/WatchList';
import  api from './ServiceAPI'

function App() {
  
  const [items, SetItems] = useState();
  const [searchInput, SetSearchInput] = useState();
  const [filteredItems, SetFilteredItems] = useState();
  const [user, SetUser] = useState();


  useEffect(() => {
    api.GetItems(SetItems);
    const storedData = JSON.parse(localStorage.getItem('UserData'));
    if(storedData && storedData.token){
      console.log(storedData)
       api.login(storedData.name, SetUser)
    }
  }
 ,[]);

  const SearchHandler = (search) => {
    SetSearchInput(search);
  }
  const FilterItems = (filtered) => {
    SetFilteredItems(filtered);
  }
  const GetUser = (user) => {
    SetUser(user)
    localStorage.setItem('UserData', JSON.stringify({name: user.userName, token: user.token, favorites: user.favorites}));
  }
  const LogOutUser = () => {
    SetUser(null);
    localStorage.removeItem('UserData');
  }

  return (
<div className='test'>
    <div className="App">
     <BrowserRouter>
     <NavigationController LogOutUser={LogOutUser} user={user} GetUser={GetUser} SearchHandler={SearchHandler} items = {items}/>
        <Routes>
          <Route path='/' element={<MainPage loading={api.loading} FilterItems={FilterItems} searchInput={searchInput} filteredItems={filteredItems} items = {items}/>}></Route>
          <Route path='/watchList' element={<WatchList items={items} user={user}/>}></Route>
          <Route path='/signUp' element={<SignUp/>}></Route>
        </Routes>
     </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
