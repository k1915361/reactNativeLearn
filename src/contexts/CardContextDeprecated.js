import React, { createContext, useEffect, useReducer } from 'react';
import { actionTypes } from '../helpers/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@cards';

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

let initialCardState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.create:
            return [
                ...state,
                {                   
                    id: Math.floor(Math.random() * 99999),
                    competitionName: action.payload.competitionName,
                    rinkNumber: action.payload.rinkNumber,
                    date: new Date(),
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




const CardContext = React.createContext();

export const CardProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialCardState);
    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0){
                initialCardState = JSON.parse(storage);
                initialCardState.forEach(element => {
                    dispatch({ type: actionTypes.load, payload: element })
                })
            }
        };
        loadStorage();
    }, [STORAGE_KEY]);

    const addCard = (title, content, callback) => {
        dispatch({ type: actionTypes.add, payload: { title, content }})
        dispatch({ type: actionTypes.save })
        if (callback) {
            callback()
        };
    }

    const updateCard = (id, title, content, date, callback) => {
        dispatch({ type: actionTypes.update, payload: { id, title, content, date} })
        dispatch({ type: actionTypes.save })
        if (callback) callback();
    }
    
    const deleteCard = (id, callback) => {
        dispatch({ type: actionTypes.delete, payload: { id: id } })
        dispatch({ type: actionTypes.save })
        if (callback) callback();
    }

    return (
        <CardContext.Provider value={{
            state:state,
            create: addCard,
            remove: deleteCard,
            update: updateCard,
        }}>
            {children}
        </CardContext.Provider>
    )
    
}

export default CardContext;