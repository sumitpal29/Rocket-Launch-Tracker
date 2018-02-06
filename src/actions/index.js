const addFav = (favID) => {
        return {
            type: 'ADD_FAV',
            payload: favID
        }
    },
    deleteFav = (favID) => {
        return {
            type: 'DELETE_FAV',
            payload: favID
        }
    };

export {addFav, deleteFav};