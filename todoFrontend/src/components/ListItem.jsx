import React, { useState } from "react";
import { Link } from "react-router-dom";

let getTime = (note) => {
    let date = new Date(note.updatedAt);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

let getTitle = (note) => {
    let title = note.title || "";
    if (title.length > 45) {
        return title.slice(0, 45);
    }
    return title;
};

let getContent = (note) => {
    let content = note.description ? note.description : "";
    if (content.length > 45) {
        return content.slice(0, 45) + "...";
    } else {
        return content;
    }
};

// Checkbox Component
const Checkbox = ({ noteId, initialChecked, updateNote }) => {
    const [checked, setChecked] = useState(initialChecked);

    const handleCheckboxClick = (e) => {
        e.stopPropagation(); // Prevent event propagation to the parent
        const newCheckedState = !checked;
        setChecked(newCheckedState); // Update state immediately
        updateNote(noteId, newCheckedState); // Notify parent
    };

    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxClick}
        />
    );
};

const ListItem = ({ note, updateNote }) => {
    return (
        <div className="notes-list-item">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={`/note/${note._id}`} style={{ textDecoration: "none", flex: 1 }}>
                    <h3>{getTitle(note)}</h3>
                </Link>
                <Checkbox
                    noteId={note._id}
                    initialChecked={note.status}
                    updateNote={updateNote}
                />
            </div>
            <Link to={`/note/${note._id}`} style={{ textDecoration: "none" }}>
                <p>
                    <span>{getTime(note)}</span>
                    {getContent(note)}
                </p>
            </Link>
        </div>
    );
};

export default ListItem;
