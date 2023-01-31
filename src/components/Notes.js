import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const navigate = useNavigate();

  const context = useContext(noteContext)
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
    }
    else{
      navigate("/login")


    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  }
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const handleclick=(e)=>{
    // console.log('updating a note',note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert("Updated Successfully","success")


  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='form1'>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" >Tag</label>
                  <input type="text" className="form-control" id="etitle" name='etag' value={note.etag} onChange={onChange}/>
                </div><div className="mb-3">
                  <label htmlFor="title" className="form-label" >Title</label>
                  <input type="textarea" className="form-control" value={note.etitle} id="etitle" name='etitle' onChange={onChange}  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  {/* <input type="textarea" className="form-control" id="desc" name='description'  onChange={onChange}/> */}
                  <textarea name="edescription" className="form-control" value={note.edescription} id="edesc" cols="30" rows="4" onChange={onChange} style={{ resize: 'none' }} ></textarea>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-2">
        <h1 className='my-3'>Your Notes</h1>
        {notes.length===0 && <h3>No notes to display</h3>}
        {notes.map((note, index) => {
          return <Noteitem key={index} note={note} updateNote={updateNote} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes