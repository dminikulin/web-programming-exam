import { AlbumContext } from "../context/AlbumContext"
import { useContext } from "react"

export const useAlbumContext = () => {
    const context = useContext(AlbumContext)

    if(!context) throw Error('useAlbumContext must be used inside an AlbumContextProvider')

    return context
}