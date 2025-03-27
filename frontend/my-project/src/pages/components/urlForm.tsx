import { useState } from 'react';
// import Link from 'react-router-dom';

export default function UrlForm({onSubmit}: {onSubmit: (url: string) => void}) {

    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(url);
    }

    return (
        <form action="#" method="POST" className="search-form" onSubmit={handleSubmit}>
            <input
                type="url"
                name="videoURL"
                value={url}
                placeholder="Enter a valid YouTube URL"
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <button type="submit">Pesquisar</button>
        </form>
    )
}