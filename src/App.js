import './App.css';
import { useEffect, useReducer, createContext } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import { Toaster, toast } from 'react-hot-toast';

const notify = (message) => toast.error(message);

function reducer(state, action)
{
  switch(action.type)
  {
    case 'fetchSuccess' :
      return {
        ...state,
        loading : false,
        data : action.todos,
        error : ''
      }
      
      case 'add' :
        return {
          ...state,
          data : [action.res.data, ...state.data]
        }
        
      case 'update' :
        return {
          ...state,
          data : state.data.map((ele) => ele.id === action.res.data.id ? action.res.data : ele)
        }

      default :
        return {...state}
  }
}



export const context = createContext();

function App() {
  const [todoList, dispatch] = useReducer(reducer, {loading : true, data : [], error : ''});
  useEffect(() => {
    axios.get('https://dummyjson.com/todos')
    .then((res) => {
      dispatch({type : 'fetchSuccess', todos : res.data.todos});
    })
    .catch((err) => {
      dispatch({type : 'notifyErrorMessage', err})
    })
  }, []);
    
  function deleteTodo(id)
  {
    axios.delete(`https://dummyjson.com/todos/${id}`)
    .then((res) => {
      dispatch({type:'update', res : res});
    })
    .catch((err) => {
      notify(err.message);
    })
  }
  
  function addItem(todo)
  {
    axios.post('https://dummyjson.com/todos/add', todo)
    .then((res) => {
      dispatch({type:'add', res});
    })
    .catch((err) => {
      notify(err.message);
    })
  }
  
  function updateItem(todo)
  {
    axios.patch(`https://dummyjson.com/todos/${todo.id}`, {
      todo : todo.todo,
      completed : todo.completed,
      userId : todo.userId
    })
    .then((res) => {
      dispatch({type : 'update', res});
    })
    .catch((err) => {
      notify(err.message);
    })
  }   

  return (
    <>
    <context.Provider value={{todoList, addItem, updateItem, deleteTodo}}>
    <Toaster/>
      <Header/>
      <Body/>
      <Footer/>
    </context.Provider>
    </>
  );
}

export default App;
