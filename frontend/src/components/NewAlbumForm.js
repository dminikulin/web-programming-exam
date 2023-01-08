import { useState } from "react"
import { useAlbumContext } from "../hooks/useAlbumContext"

const NewAlbumForm = () => {
    const {dispatch} = useAlbumContext()
    const [name, setName] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')
    const [cover_URL, setCover] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const album = {name, artist, genre, year, cover_URL}

        const response = await fetch('/api/albums', {
            method: 'POST',
            body: JSON.stringify(album),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } 
        if(response.ok){
            setArtist('')
            setCover('')
            setGenre('')
            setName('')
            setYear('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_ALBUM', payload: json})
        } 
    }
    
    return (
        <form className="album_form" onSubmit={handleSubmit}>
            <h3>Add new album</h3>

            <label>Album title: </label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name}
                className={emptyFields.includes('name') ? 'error' : ''}/>
            <label>Artist: </label>
            <input type="text" onChange={(e) => setArtist(e.target.value)} value={artist}
                className={emptyFields.includes('name') ? 'error' : ''}/>
            <label>Genre: </label>
            <input type="text" onChange={(e) => setGenre(e.target.value)} value={genre}
                className={emptyFields.includes('name') ? 'error' : ''}/>
            <label>Year made: </label>
            <input type="text" inputMode="numeric" onChange={(e) => setYear(e.target.value)} value={year}
                className={emptyFields.includes('name') ? 'error' : ''}/>
            <label>Cover (image URL): </label>
            <input type="text" onChange={(e) => setCover(e.target.value)} value={cover_URL}/>

            <button>Add album</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default NewAlbumForm