const express = require("express")
const noteRouter = express.Router()
const { NoteModel } = require("../model/note.model")

noteRouter.get("/", async (req, res) => {
    try {
        const notes=await NoteModel.find()
        res.status(200).send(notes)

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRouter.post("/create", async (req, res) => {
    const payload = req.body
    const new_note = new NoteModel(payload)
    await new_note.save()
    res.send({ "msg": "Note Created" })
})


noteRouter.patch("/update/:noteId", async (req, res) => {
    const payload=req.body
    const noteId=req.params.noteId
    try{
        await NoteModel.findByIdAndUpdate({_id:noteId},payload)
        res.status(200).send({"msg":"note updated succesfuly"})

    }catch(error){
        res.status(400).send({"msg":error.message})

    }
})

noteRouter.delete("/delete/:noteId", async (req, res) => {
    const payload=req.body
    const noteId=req.params.noteId
    try{
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.status(200).send({"msg":"note deleted succesfuly"})

    }catch(error){
        res.status(400).send({"msg":error.message})

    }
})


module.exports = {
    noteRouter
}