import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
        GET_CONTACTS,
        ADD_CONTACT,
        DELETE_CONTACT,
        SET_CURRENT,
        CLEAR_CURRENT,
        UPDATE_CONTACT,
        FILTER_CONTACTS,
        CLEAR_CONTACTS,
        CLEAR_FILTER,
      } from '../type';

const ContactState = props => {
    const initialState = {
        contacts : [
            {
                id: 1,
                name: "Husnain",
                email: "test@email.com",
                phone: "2323232-23",
                type: 'personal'
            },
            
            {
                id: 2,
                name: "moshin",
                email: "moshin@email.com",
                phone: "3425324-23",
                type: 'professional'
            },
            
            {
                id: 3,
                name: "ahsan",
                email: "ahsan@email.com",
                phone: "005324-23",
                type: 'professional'
            },
        ],
        current: null,
        filtered: null
        };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Add a contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({type: ADD_CONTACT, payload: contact});
    }

    //Delete a contact
    const deleteContact = id => {
        dispatch ({type:DELETE_CONTACT, payload: id});
    }

    //Set current contact
    const setCurrent = contact => {
        dispatch ({type:SET_CURRENT, payload: contact});
    }

    //Clear current contact
    const clearCurrent = () => {
        dispatch ({type:CLEAR_CURRENT});
    }

    //Update current contact
    const updateContact = contact => {
        dispatch ({type:UPDATE_CONTACT, payload: contact});
    }

    //Filer Contact
    const filterContacts = text =>{
        dispatch({type: FILTER_CONTACTS, payload:text});
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch ({type:CLEAR_FILTER});
    }

    return (
        <ContactContext.Provider
        value = {{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            
            addContact,
            deleteContact,
            setCurrent,
            updateContact,
            clearCurrent,
            filterContacts,
            clearFilter,
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;