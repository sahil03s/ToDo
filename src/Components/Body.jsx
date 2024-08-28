import { useContext, useState, useRef, useEffect } from 'react';
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
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if(textarea)
        {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;

        }
    }, [newTodo]);



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
        textareaRef.current.focus();
    }

    return (
        <div className='pt-2 px-3'>
            <div className='flex justify-between items-center m-auto mt-32 bg-white box-border min-h-max max-w-96 border-2 outline-2 shadow-2xl rounded-md'>
                <input className='min-w-8 h-5' type='checkbox' name='completed' checked={newTodo.completed} onChange={handleChange}></input>
                <textarea 
                className='min-w-20 md:min-w-80 min-h-8 resize-none outline-transparent focus:border-b-2 border-black overflow-hidden   ' 
                type='text' 
                name='todo' 
                placeholder='Add an item' 
                autoComplete='off' 
                value={newTodo.todo} 
                rows={1}
                onChange={handleChange} 
                ref={textareaRef}/>
                
                {isEditing
                ? <SendSharpIcon onClick={save}/> 
                : <AddIcon className='h-5' onClick={save}/> }
            </div>

            {todoList.loading 
            ? <div className='my-36'>   
                <Loader type='spinner-circle' bgColor='#BFA181'/>
            </div>
            : <div className='cards-container mt-4'>
             {todos.filter((ele) => !ele.isDeleted).map((ele) =><Card key={ele.id} data={ele} onEdit={edit}/>)}
            </div>
            }
        </div>
    );
}