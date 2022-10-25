import React, { createContext, useEffect, useReducer } from 'react';
import { actionTypes } from '../helpers/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items';

const dummyPlayers1 = [
    {
        id: -1,
        firstName: 'Ace', 
        lastName: 'Ary', 
    }, 
    {
        id: -2,
        firstName: 'Bob', 
        lastName: 'Boris', 
    }, 
];
const dummyPlayers2 = [
    {
        id: -1,
        firstName: 'Cacey', 
        lastName: 'Carly', 
    }, 
    {
        id: -2,
        firstName: 'Drake', 
        lastName: 'Drone', 
    }, 
];

let initialItemState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.create:
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content,
                    date: new Date()
                }
            ];
        case actionTypes.update:
            return state.map((item) => {
                if (item.id === action.payload.id){
                    return action.payload;
                } else { 
                    return item 
                }
            });
        case actionTypes.delete:
            return state.filter((item) => item.id != action.payload.id);
        case actionTypes.save:
            try {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (ex) {
                console.log(ex);
            } finally {
                return state;
            };
        case actionTypes.load: 
            return [
                ...state, {
                    id: action.payload.id,
                    title: action.payload.title,
                    content: action.payload.content,
                    date: new Date(action.payload.date)
                }];
        default: 
            return state;
    }
};




const ItemContext = React.createContext();

export const ItemProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialItemState);
    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0){
                initialItemState = JSON.parse(storage);
                initialItemState.forEach(element => {
                    dispatch({ type: actionTypes.load, payload: element })
                })
            }
        };
        loadStorage();
    }, [STORAGE_KEY]);

    const addItem = (title, content, callback) => {
        dispatch({ type: actionTypes.create, payload: { title, content }})
        dispatch({ type: actionTypes.save })
        if (callback) {
            callback()
        };
    }

    const updateItem = (id, title, content, date, callback) => {
        dispatch({ type: actionTypes.update, payload: { id, title, content, date} })
        dispatch({ type: actionTypes.save })
        if (callback) callback();
    }
    
    const deleteItem = (id, callback) => {
        dispatch({ type: actionTypes.delete, payload: { id: id } })
        dispatch({ type: actionTypes.save })
        if (callback) callback();
    }

    return (
        <ItemContext.Provider value={{
            state:state,
            create: addItem,
            remove: deleteItem,
            update: updateItem,
        }}>
            {children}
        </ItemContext.Provider>
    )
    
}

export default ItemContext;