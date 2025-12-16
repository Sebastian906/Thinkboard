import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotesNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
            <div className='bg-primary/10 rounded-full p-8'>
                <NotebookIcon className='size-10 text-primary'/>
            </div>
            <h3 className='text-2xl font-bold'>
                No hay notas disponibles.
            </h3>
            <p className='text-base-content/70'>
                Crea una nueva nota haciendo clic en el botón "Crear Nota".
            </p>
            <Link to="/create" className='btn btn-primary'>
                Crea tu Primera Nota.
            </Link>
        </div>
    )
}

export default NotesNotFound