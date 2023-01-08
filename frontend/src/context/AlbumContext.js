import { createContext, useReducer } from "react";

export const AlbumContext = createContext()

export const albumReducer = (state, action) => {
    switch (action.type){
        case 'SET_ALBUMS':
            return {
                albums: action.payload
            }
        case 'CREATE_ALBUM':
            return {
                albums: [action.payload, ...state.albums]
            }
        case 'DELETE_ALBUM':
            return {
                albums: state.albums.filter((A) => A._id !== action.payload._id)
            }
        case 'UPDATE_ALBUM':
            return{
                albums: state.albums.map((A) => A._id === action.payload ? action.payload : A)
            }
        default: return state
    }
}

export const AlbumContextProvider = ({children}) => {
    const [state,  dispatch] = useReducer(albumReducer, {
        albums: null
    })

    return (
        <AlbumContext.Provider value={{...state, dispatch}}>
            {children}
        </AlbumContext.Provider>
    )
}