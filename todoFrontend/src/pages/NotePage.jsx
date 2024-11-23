import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { API_URL } from "../constant";
const NotePage = ({ match }) => {
    const noteId = match.params.id;
    const [note, setNote] = useState({ title: "", description: "", status: false });
    const history = useHistory(); // Correct usage of useHistory

    useEffect(() => {
        getNote();
    }, [noteId]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title cannot be blank"),
        }),
        onSubmit: async (values) => {
            if (noteId !== "new") {
                await updateNote(values);
            } else {
                await createNote(values);
            }
            history.push("/"); // Navigate back to home after submission
        },
    });

    const getNote = async () => {
        if (noteId === "new") return;
        try {
            const response = await fetch(API_URL + `todos/${noteId}/`);
            const data = await response.json();
            setNote(data);
            formik.setValues({ title: data.title, description: data.description });
        } catch (error) {
            console.error("Failed to fetch the note:", error);
        }
    };

    const createNote = async (values) => {
        try {
            await fetch(API_URL + `todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        } catch (error) {
            console.error("Failed to create the note:", error);
        }
    };

    const updateNote = async (values) => {
        console.error('fdksf')
        try {
            await fetch(API_URL + `todos/${noteId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        } catch (error) {
            console.error("Failed to update the note:", error);
        }
    };

    const deleteNote = async () => {
        try {
            await fetch(API_URL + `todos/${noteId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            history.push("/");
        } catch (error) {
            console.error("Failed to delete the note:", error);
        }
    };

    return (
        <div className="note">
            <form >
                <div className="note-header">
                    <h3>
                        <div onClick={formik.handleSubmit}>&larr;</div>
                    </h3>
                    <div >
                    <input
                        name="title"
                        placeholder="Title"
                        style={{display:'block'}}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.title && formik.errors.title ? "input-error" : ""}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="error">{formik.errors.title}</div>
                    )}
                    </div>
                    {noteId !== "new" ? (
                        <button type="button" onClick={deleteNote}>
                            Delete
                        </button>
                    ) : (
                        <button onClick={formik.handleSubmit}>Done</button>
                    )}
                </div>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                ></textarea>
            </form>
        </div>
    );
};

export default NotePage;
