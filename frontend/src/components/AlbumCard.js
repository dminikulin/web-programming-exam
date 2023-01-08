import { useState } from 'react'
import { useAlbumContext } from '../hooks/useAlbumContext'

const AlbumCard = ({ singleAlbum }) => {
    const { dispatch } = useAlbumContext()
    const [update, setUpdate] = useState(false)
    const [name, setName] = useState(singleAlbum.name)
    const [artist, setArtist] = useState(singleAlbum.artist)
    const [genre, setGenre] = useState(singleAlbum.genre)
    const [year, setYear] = useState(singleAlbum.year)
    const [cover_URL, setCover] = useState(singleAlbum.cover_URL)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleDelete = async () => {
        const response = await fetch('/api/albums/' + singleAlbum._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_ALBUM', payload: json })
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const album = {name, artist, genre, year, cover_URL}

        const response = await fetch('/api/albums/' + singleAlbum._id, {
            method: 'PATCH',
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
            dispatch({type: 'UPDATE_ALBUM', payload: json})
            setUpdate(false)
        }
     }


    if (update) {
        return (
            <div className="album_card">
                <img className="cover" src={singleAlbum.cover_URL} alt={singleAlbum.name}></img>
                <form className="album_form" onSubmit={handleUpdate}>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}
                    className={emptyFields.includes('name') ? 'error' : ''}/>
                <input type="text" onChange={(e) => setArtist(e.target.value)} value={artist}
                    className={emptyFields.includes('artist') ? 'error' : ''}/> 
                <input type="text" onChange={(e) => setGenre(e.target.value)} value={genre}
                    className={emptyFields.includes('genre') ? 'error' : ''}/>
                <input type="text" inputMode="numeric" onChange={(e) => setYear(e.target.value)} value={year}
                    className={emptyFields.includes('year') ? 'error' : ''}/>
                <input type="text" onChange={(e) => setCover(e.target.value)} value={cover_URL}/>
                
                <button>Update</button>
                {error && <div className="error">{error}</div>}
                </form>
                <div className="album_actions">                    
                    <button type="button" onClick={() => setUpdate(false)} className="action_button btn_delete">Cancel</button><br/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="album_card">
                <img className="cover" src={singleAlbum.cover_URL} alt={singleAlbum.name}></img>
                <p className="album_title"><strong>{singleAlbum.name}</strong></p>
                <p><strong>by {singleAlbum.artist}</strong></p>
                <p>Genre: {singleAlbum.genre}</p>
                <p>Year released: {singleAlbum.year}</p>
                <div className="album_actions">
                    <button type="button" onClick={() => setUpdate(true)} className="action_button btn_update">Update</button>
                    <button type="button" onClick={handleDelete} className="action_button btn_delete">Delete</button>
                </div>
            </div>
        )
    }
}

export default AlbumCard