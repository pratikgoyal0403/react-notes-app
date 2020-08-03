import React, { useState, useEffect } from "react";
import Controls from "./components/controls/controls";
import Topics from "./components/topics/topics";
import "./app.css";

const App = () => {
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState(allNotes);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    const oldNotes = JSON.parse(localStorage.getItem("mynotes")) || [];
    setNotes(oldNotes);
    setAllNotes(oldNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("mynotes", JSON.stringify(allNotes));
    setNotes(allNotes);
  }, [allNotes]);

  const submitNotesHandler = () => {
    if (heading.trim() === "" || body.trim() === "") {
      return;
    }
    const note = {
      id: Date.now().toString(),
      heading,
      body,
    };
    allNotes.push(note);
    setAllNotes([...allNotes]);
    setHeading("");
    setBody("");
  };

  const selectNoteHandler = (note) => {
    setActiveNote(note);
    setHeading(note.heading);
    setBody(note.body);
  };

  const saveChangesHandler = (id) => {
    const index = notes.findIndex((note) => note.id === id);
    allNotes[index].heading = heading;
    allNotes[index].body = body;
    setAllNotes(allNotes);
    localStorage.setItem("mynotes", JSON.stringify(allNotes));
  };

  const searchHandler = (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      return setNotes(allNotes);
    }
    const filteredArr = allNotes.filter((note) => note.heading.includes(value));
    setNotes(filteredArr);
  };

  const deleteNoteHandler = (id)=>{
    const updatedArr = allNotes.filter(note => note.id !== id);
    setAllNotes(updatedArr);
    setNotes(updatedArr);
    setHeading('');
    setBody('');
  }

  return (
    <div className="wrapper">
      <h1>NOTES APP</h1>
      <main className="playground">
        <aside className="left-pane">
          <section className="input-section">
            <Controls submit={submitNotesHandler} change={searchHandler} />
          </section>
          <section className="topics-section">
            {notes.map
              ? notes.map((note) => (
                  <Topics
                    key={note.id}
                    id={note.id}
                    heading={note.heading}
                    select={() => selectNoteHandler(note)}
                    activeNote={activeNote}
                    save={() => saveChangesHandler(note.id)}
                    delete={()=> deleteNoteHandler(note.id)}
                  />
                ))
              : null}
          </section>
          <section className="topics"></section>
        </aside>
        <aside className="right-pane">
          <h2
            className="notes-heading"
            contentEditable
            onBlur={(e) => setHeading(e.target.innerText)}
            suppressContentEditableWarning={true}
          >
            {heading}
          </h2>
          <hr />
          <p
            className="notes-body"
            contentEditable
            onBlur={(event) => setBody(event.target.innerText)}
            suppressContentEditableWarning={true}
          >
            {body}
          </p>
        </aside>
      </main>
    </div>
  );
};

export default App;
