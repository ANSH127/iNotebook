import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    
  const context = useContext(noteContext)
  const {addNote}=context;
  const [note, setNote] = useState({title:"",description:"",tag:"Personal"})
  const handleclick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    props.showAlert("Added Successfully","success")
    document.getElementById("myform").reset()



  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  return (
    
    <div className="container my-3 mx-2">
      <h1 className='mb-4'>Add a Note</h1>
      <form className='form1' id='myform'>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="title" name='tag' onChange={onChange} defaultValue='Personal'/>
        </div><div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="textarea" className="form-control" id="title" name='title' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          {/* <input type="textarea" className="form-control" id="desc" name='description'  onChange={onChange}/> */}
        <textarea name="description" className="form-control" id="desc" cols="30" rows="4" onChange={onChange} style={{resize:'none'}} ></textarea>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
      </div>
  )
}

export default AddNote