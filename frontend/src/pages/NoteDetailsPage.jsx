import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import TagsInput from '../components/TagsInput';
import FormattedText from '../components/FormattedText';

export const NoteDetailsPage = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Error fetching note:", error);
                toast.error("Error al cargar la nota.");
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Estas seguro que quieres borrar esta nota?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Nota eliminada con éxito.");
            navigate("/");
        } catch (error) {
            console.log("Error borrando la nota;", error);
            toast.error("Error al borrar la nota.");
        }
    }

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("El título y el contenido no pueden estar vacíos.");
            return;
        }
        setSaving(true);
        try {
            await api.put(`/notes/${id}`, {
                title: note.title,
                content: note.content,
                tags: note.tags || []
            });
            toast.success("Nota actualizada con éxito.");
            setIsEditing(false);
        } catch (error) {
            console.log("Error actualizando la nota:", error);
            toast.error("Error al actualizar la nota.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10' />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <div className='flex items-center justify-between mb-6'>
                        <Link to="/" className='btn btn-ghost'>
                            <ArrowLeftIcon className='h-5 w-5' />
                            Volver a las Notas
                        </Link>
                        <div className='flex gap-2'>
                            <button 
                                onClick={() => setIsEditing(!isEditing)} 
                                className='btn btn-warning btn-outline'
                            >
                                {isEditing ? 'Cancelar' : 'Editar'}
                            </button>
                            <button onClick={handleDelete} className='btn btn-error btn-outline'>
                                <Trash2Icon className='h-5 w-5' />
                                Borrar Nota
                            </button>
                        </div>
                    </div>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            {isEditing ? (
                                <>
                                    <div className='form-control mb-4'>
                                        <label className='label'>
                                            <span className='label-text'>Título</span>
                                        </label>
                                        <input 
                                            type="text"
                                            placeholder='Título de Nota'
                                            className='input input-bordered'
                                            value={note.title}
                                            onChange={(e) => setNote({ ...note, title: e.target.value })} 
                                        />
                                    </div>
                                    <RichTextEditor 
                                        value={note.content}
                                        onChange={(newContent) => setNote({ ...note, content: newContent })}
                                        placeholder='Contenido de Nota'
                                    />
                                    <TagsInput 
                                        tags={note.tags || []}
                                        onChange={(newTags) => setNote({ ...note, tags: newTags })}
                                    />
                                    <div className='card-actions justify-end'>
                                        <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 className='card-title text-3xl mb-4'>{note.title}</h1>
                                    <div className='mb-4'>
                                        <FormattedText content={note.content} />
                                    </div>
                                    {note.tags && note.tags.length > 0 && (
                                        <div className='mb-4'>
                                            <p className='text-sm font-semibold mb-2'>Etiquetas:</p>
                                            <div className='flex flex-wrap gap-2'>
                                                {note.tags.map((tag) => (
                                                    <span key={tag} className='badge badge-primary'>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailsPage;