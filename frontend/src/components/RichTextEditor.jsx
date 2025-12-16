import React, { useRef } from 'react';
import { Bold, Italic, Plus, Minus, Palette } from 'lucide-react';

const COLORS = {
    red: { name: 'Rojo', class: 'text-red-400' },
    blue: { name: 'Azul', class: 'text-blue-400' },
    green: { name: 'Verde', class: 'text-green-400' },
    yellow: { name: 'Amarillo', class: 'text-yellow-300' },
    orange: { name: 'Naranja', class: 'text-orange-400' },
    pink: { name: 'Rosa', class: 'text-pink-400' },
    purple: { name: 'Morado', class: 'text-purple-400' },
    amber: { name: 'Café', class: 'text-amber-400' },
    gray: { name: 'Gris', class: 'text-gray-400' },
};

const RichTextEditor = ({ value, onChange, placeholder = 'Contenido de la Nota' }) => {
    const textareaRef = useRef(null);
    const colorDropdownRef = useRef(null);

    const applyFormat = (before, after = '') => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        if (!selectedText) return;

        const newContent =
            value.substring(0, start) +
            before +
            selectedText +
            after +
            value.substring(end);

        onChange(newContent);

        // Restaurar selección
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = start + before.length;
            textarea.selectionEnd = start + before.length + selectedText.length;
        }, 0);
    };

    const handleBold = () => applyFormat('**', '**');
    const handleItalic = () => applyFormat('*', '*');
    const handleLarge = () => applyFormat('++', '++');
    const handleSmall = () => applyFormat('--', '--');
    const handleColor = (colorKey) => {
        applyFormat(`{${colorKey}:`, '}');
        colorDropdownRef.current?.close?.();
    };

    return (
        <div className='form-control mb-4'>
            <label className="label">
                <span className='label-text'>Contenido</span>
                <div className='flex gap-2 flex-wrap items-center'>
                    <button
                        type='button'
                        onClick={handleBold}
                        className='btn btn-sm btn-ghost'
                        title='Negrita (selecciona texto y haz click)'
                    >
                        <Bold className='size-4' />
                    </button>
                    <button
                        type='button'
                        onClick={handleItalic}
                        className='btn btn-sm btn-ghost'
                        title='Cursiva (selecciona texto y haz click)'
                    >
                        <Italic className='size-4' />
                    </button>
                    <button
                        type='button'
                        onClick={handleLarge}
                        className='btn btn-sm btn-ghost'
                        title='Aumentar tamaño (selecciona texto y haz click)'
                    >
                        <Plus className='size-4' />
                    </button>
                    <button
                        type='button'
                        onClick={handleSmall}
                        className='btn btn-sm btn-ghost'
                        title='Reducir tamaño (selecciona texto y haz click)'
                    >
                        <Minus className='size-4' />
                    </button>
                    <div className='dropdown dropdown-end'>
                        <button
                            type='button'
                            tabIndex={0}
                            className='btn btn-sm btn-ghost'
                            title='Cambiar color (selecciona texto y elige un color)'
                        >
                            <Palette className='size-4' />
                        </button>
                        <ul
                            tabIndex={0}
                            ref={colorDropdownRef}
                            className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            {Object.entries(COLORS).map(([key, { name, class: colorClass }]) => (
                                <li key={key}>
                                    <button
                                        type='button'
                                        onClick={() => handleColor(key)}
                                        className='flex items-center gap-2'
                                    >
                                        <span className={`w-4 h-4 rounded ${colorClass} font-bold`}>●</span>
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </label>
            <p className='text-xs text-base-content/60 mb-2'>
                <strong>**texto**</strong> negrita • <em>*texto*</em> cursiva • <span className='text-lg'>++texto++</span> grande • <span className='text-sm'>--texto--</span> pequeño • {'{'}color:texto{'}'} color
            </p>
            <textarea
                ref={textareaRef}
                placeholder={placeholder}
                className='textarea textarea-bordered h-32'
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default RichTextEditor;
