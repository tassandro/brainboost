import { useState } from 'react';

export default function UrlForm({ onSubmit }: { onSubmit: (url: string) => void }) {

    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(url);
    }

    return (
        <form
            action="#"
            method="POST"
            className="flex max-w-[100%] gap-2 items-center"
            onSubmit={handleSubmit}>
            <input
                type="url"
                name="videoURL"
                value={url}
                placeholder="Enter a valid YouTube URL"
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1 h-[45px] px-3 rounded-xl border border-gray-300 text-gray-800 shadow-sm outline-none transition duration-300 focus:border-gray-500 focus:shadow-md"
            />
            <button
                type="submit"
                className="h-[45px] px-4 bg-[#325239] text-white rounded-lg font-semibold transition duration-200 hover:shadow-md active:scale-[0.98]"
            >Pesquisar</button>
        </form>
    )
}