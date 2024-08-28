import '../styles.css';
export default function Header() 
{
    return (
        <div className="header fixed top-0 container flex justify-center items-center mx-auto min-h-24 z-50">
            <img 
            className='h-14'
            src='logo.png' alt='Logo'/>
            <h1 className="text-center font-bold text-6xl ml-5">TodoList</h1>
        </div>
    );  
}