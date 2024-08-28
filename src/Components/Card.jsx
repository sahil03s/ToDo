import '../styles.css';
import { useContext } from 'react';
import { context } from '../App';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Card({data, onEdit})
{
    const {deleteTodo, updateItem} = useContext(context);
    return (
        <div className="relative flex items-center mt-10 card box-border min-h-max max-w-96 border-2 m-auto rounded-md outline-2 shadow-2xl">
            <Checkbox className='max-w-9' checked={data.completed} onClick={() => {updateItem({
                ...data,
                completed : !data.completed
            })}}/>
            <p className="text-sm font-medium max-w-72">
            {data.todo}
            </p>
            <EditIcon className='max-w-9 absolute mr-4 right-3' onClick={() =>onEdit(data)}/>
            <DeleteIcon className='max-w-9 absolute mr-1 right-0' onClick={() => deleteTodo(data.id)}/>
        </div>
    );
}