const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');



//Route-1 Get All the Notes using : GET  "/api/auth/getuser"  Login Required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes)
   } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");

   }
})

//Route-2  Add a new Notes using : POST  "/api/auth/getuser"  Login Required

router.post('/addnote', fetchuser, [
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),], async (req, res) => {
      try {
         const { title, description, tag } = req.body;
         // if there are errors, return bad request and error 

         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }
         const note = new Note({
            title, description, tag, user: req.user.id
         })
         const savedNote = await note.save()
         res.json(savedNote)
      } catch (error) {
         console.log(error.message);
         res.status(500).send("some error occured");
      }
   }
)


//Route-3  Update an existing  Notes using : PUT  "/api/notes/updatenote"  Login Required
router.put('/updatenote/:id', fetchuser, async (req,res) => {
   const {title, description, tag} = req.body;
   // create a newNote object
   const newNote = {};
   if(title){newNote.title = title};
   if(description){newNote.description = description}
   if(tag){newNote.tag = tag}

   // Find the note to be updated and update it
   let note = await Note.findById(req.params.id);
   if(!note){return res.status(404).send("Note Found")}

   if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
   }

   note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
   res.json({note});
   
})


//Route-4  Delete a existing  Notes using : DELETE   "/api/notes/deletenote"  Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) =>{
 try {
    // find the note to be delete  and delete it
    let note = await Note.findById(req.params.id);
    if(!note) {return res.status(404).send("Not Found")}

    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id){
       return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"success": "Note Deleted",note: note});
    
 } catch (error) {
   console.log(error.message);
   res.status(500).send("some error occured");
 }
   
})


module.exports = router