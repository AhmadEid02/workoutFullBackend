const Workout = require('../modal/workoutModal')
const { default: mongoose } = require('mongoose')

const getOneWorkout= async (req, res) => {
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("no such workout")
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json("no such workout")
    }
    res.status(200).json(workout)
}
const getAllWorkout=async (req, res) => {
    const user_id = req.user._id

    const workout = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workout)
}
const createWorkout= async (req, res) => {
    const { title, load, reps } = req.body
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load ,user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}
const updateWorkout=async (req, res) => {
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("no such workout")
    }
    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    if (!workout) {
        return res.status(404).json("no such workout")
    }
    res.status(200).json(workout)
}
const deleteWorkout= async (req, res) => { 
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("no such workout")
    }
    const workout = await Workout.findByIdAndDelete({_id:id})
    if (!workout) {
        return res.status(404).json("no such workout")
    }
    res.status(200).json(workout)
}
module.exports={
    deleteWorkout,
    updateWorkout,
    createWorkout,
    getOneWorkout,
    getAllWorkout
}