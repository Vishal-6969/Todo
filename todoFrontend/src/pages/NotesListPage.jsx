import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { API_URL } from '../constant'


const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    const updateNote = async (noteId,value) => {
        try {
            await fetch(API_URL + `todos/${noteId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({status:value}),
            });
            setNotes(notes.map((note)=>note._id == noteId ? {status:value, ...note} : {...note}))
        } catch (error) {
            console.error("Failed to update the note:", error);
        }
    };

    let getNotes = async () => {

        let response = await fetch(API_URL+'todos/')
        let data = await response.json()
        setNotes(data.todos);
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} updateNote={updateNote} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage
