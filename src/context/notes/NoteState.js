import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "6192a2617186232e9ef218dc",
          "user": "618f65981df0dd9d2d16dfbb",
          "title": "My Title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2021-11-15T18:09:37.812Z",
          "__v": 0
        },
        {
          "_id": "61966c9aa963ed7430634434",
          "user": "618f65981df0dd9d2d16dfbb",
          "title": "My Title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2021-11-18T15:09:14.451Z",
          "__v": 0
        },
        {
          "_id": "6197bb3dd4fb10912e8c99da",
          "user": "618f65981df0dd9d2d16dfbb",
          "title": "My Title",
          "description": "please wake up early1",
          "tag": "personal",
          "date": "2021-11-19T14:57:01.810Z",
          "__v": 0
        },
        {
          "_id": "6197bb46d4fb10912e8c99dc",
          "user": "618f65981df0dd9d2d16dfbb",
          "title": "My Title",
          "description": "please wake up early2",
          "tag": "personal",
          "date": "2021-11-19T14:57:10.042Z",
          "__v": 0
        },
        {
          "_id": "6197bb5cd4fb10912e8c99e0",
          "user": "618f65981df0dd9d2d16dfbb",
          "title": "My Title",
          "description": "please wake up early6",
          "tag": "personal",
          "date": "2021-11-19T14:57:32.980Z",
          "__v": 0
        },
        {
          "_id": "6197d1c1a7a7518ff151f731",
          "user": "618f65981df0dd9d2d16dfbb",
          "title": "My Title",
          "description": "please wake up early7",
          "tag": "personal",
          "date": "2021-11-19T16:33:05.139Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
  
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;