import { useContext, useState } from 'react';
import {context} from '../App';
import '../styles.css';
import Loader from 'react-js-loader';
import Card from './Card';
import AddIcon from '@mui/icons-material/Add';
import SendSharpIcon from '@mui/icons-material/SendSharp';

export default function Body() 
{   
    const [newTodo, setNewTodo] = useState({todo : '', completed : false, userId : 5});
    const [isEditing, setIsEditing] = useState(false);
    const {todoList, addItem, updateItem} = useContext(context);
    const todos = todoList.data;

    function handleChange(e)
    {
        const {name, type, checked, value} = e.target;
        setNewTodo({...newTodo,
            [name] : type === 'checkbox' ? checked : value
        });
    }

    function save()
    {
        isEditing ? updateItem(newTodo) : addItem(newTodo);
        setIsEditing(false);
        setNewTodo({todo : '', completed : false, userId : 5});
    }

    function edit(data)
    {
        setIsEditing(true);
        setNewTodo(data);
    }

    return (
        <>
            <div className='relative text-center m-auto mt-6 bg-white box-border min-h-max max-w-96 border-2 outline-2 shadow-2xl rounded-md'>
                <input className='absolute left-0 top-1 min-w-8 min-h-5' type='checkbox' name='completed' checked={newTodo.completed} onChange={handleChange}></input>
                <input className='min-w-80 ml-6 mb-0.5 outline-transparent focus:border-b-2 border-black' type='text' name='todo' placeholder='Add an item' autoComplete='off' value={newTodo.todo} onChange={handleChange}></input>
                {isEditing
                ? <SendSharpIcon onClick={save}/> 
                : <AddIcon className='max-w-9 top-1 absolute right-0' onClick={save}/> }
            </div>
            {todoList.loading 
            ? <div className='my-36'>
                <Loader type='spinner-circle' bgColor='#BFA181'/>
            </div>
            : todos.filter((ele) => !ele.isDeleted).map((ele) =><Card key={ele.id} data={ele} onEdit={edit}/>)}
        </>
    );
}