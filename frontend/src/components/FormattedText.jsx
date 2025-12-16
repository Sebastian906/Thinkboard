import React from 'react';

const COLOR_MAP = {
    red: 'text-red-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-300',
    orange: 'text-orange-400',
    pink: 'text-pink-400',
    purple: 'text-purple-400',
    amber: 'text-amber-400',
    gray: 'text-gray-400',
};

const FormattedText = ({ content }) => {
    const formatContent = (text) => {
        if (!text) return '';

        // Convertir colores primero {red:texto} -> <span class="text-red-400">texto</span>
        let formatted = text;
        
        Object.keys(COLOR_MAP).forEach(color => {
            const regex = new RegExp(`\\{${color}:(.*?)\\}`, 'g');
            formatted = formatted.replace(regex, `<span class="${COLOR_MAP[color]}">$1</span>`);
        });

        // Convertir otros formatos de texto
        formatted = formatted
            .replace(/\+\+(.*?)\+\+/g, '<span class="text-lg font-medium">$1</span>')
            .replace(/\-\-(.*?)\-\-/g, '<span class="text-sm">$1</span>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br />');

        return formatted;
    };

    return (
        <div
            className='prose prose-sm max-w-none text-base-content'
            dangerouslySetInnerHTML={{
                __html: formatContent(content)
            }}
        />
    );
};

export default FormattedText;
