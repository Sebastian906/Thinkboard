import React, { useState } from 'react';
import { XIcon, PlusIcon } from 'lucide-react';

const TagsInput = ({ tags = [], onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            onChange([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className='form-control mb-4'>
            <label className='label'>
                <span className='label-text'>Etiquetas (Tags)</span>
            </label>
            <div className='flex gap-2 mb-2 flex-wrap'>
                {tags.map((tag) => (
                    <div key={tag} className='badge badge-primary gap-2'>
                        {tag}
                        <button
                            type='button'
                            onClick={() => handleRemoveTag(tag)}
                            className='btn btn-ghost btn-xs'
                        >
                            <XIcon className='size-3' />
                        </button>
                    </div>
                ))}
            </div>
            <div className='flex gap-2'>
                <input
                    type='text'
                    placeholder='Añade una etiqueta...'
                    className='input input-bordered flex-1'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    type='button'
                    onClick={handleAddTag}
                    className='btn btn-primary'
                >
                    <PlusIcon className='size-4' />
                </button>
            </div>
        </div>
    );
};

export default TagsInput;
