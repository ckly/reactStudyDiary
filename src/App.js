import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

const reducer = (state,action)=>{
  let newState = [];
  switch(action.type){
    case 'INIT' : {
      return action.data;     
    }
    case 'CREATE' : {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }   
    case 'REMOVE' : {
      newState = state.fliter((it)=>it.id !== action.targetId);
      break;
    } 
    case 'EDIT' : {
      newState = state.map((it)=>it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default :
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id:1,
    emotion : 1,
    content : "Todays first write",
    date : 1682378834880
  },
  {
    id:2,
    emotion : 2,
    content : "Todays 2nd write",
    date : 1682378834881
  },
  {
    id:3,
    emotion : 3,
    content : "Todays 3nd write",
    date : 1682378834882
  },
  {
    id:4,
    emotion : 4,
    content : "Todays 4nd write",
    date : 1682378834883
  },
  {
    id:5,
    emotion : 5,
    content : "Todays 5nd write",
    date : 1682378834884
  },
]


function App() {

  const dataId = useRef(0);
  
  //CREATE
  const onCreate = (date, content, emotion)=>{
    dispatch({
        type : "CREATE",
        data : {
          date : new Date(date).getTime(),
          content,
          emotion,      
        },
    });
    dataId.current += 1;
  }

  //REMOVE
  const onRemove = (targetId)=> {
    dispatch({type : "REMOVE",targetId});
  }

  //EDIT
  const onEdit = (targetId,date,content,emotion)=>{
    dispatch(
      {
        type:"EDIT",
        data : {
          id : targetId,
          date : new Date(date).getTime(),
          content,
          emotion,      
        },

      }
    );
  }

  const [data,dispatch] = useReducer(reducer,dummyData);
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,onEdit,onRemove}}>
        <BrowserRouter>
          <div className="App">      
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/new' element={<New/>}></Route>
              <Route path='/edit/:id' element={<Edit/>}></Route>
              <Route path='/diary/:id' element={<Diary/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
