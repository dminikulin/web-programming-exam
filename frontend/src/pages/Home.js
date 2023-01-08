import { useEffect } from "react"
import { useAlbumContext } from "../hooks/useAlbumContext"

import AlbumCard from '../components/AlbumCard'
import NewAlbumForm from "../components/NewAlbumForm"

const Home = () => {
    const {albums, dispatch} = useAlbumContext()

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await fetch('/api/albums')
            const json = await response.json()

            if (response.ok) dispatch({type: 'SET_ALBUMS', payload: json})
            // console.log(json)
        }

        fetchAlbums()
    }, [dispatch])

    return (
        <div className="home">
            <div className="albums">
                {albums && albums.map((singleAlbum) => (
                    <AlbumCard key={singleAlbum._id} singleAlbum={singleAlbum} />
                ))}
            </div>
            <NewAlbumForm />
        </div>
    )
}

export default Home