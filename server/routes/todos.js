const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const Todo = require('../models/Todo');
const User = require('../models/User');

router.use(authentication);

// Create Todo
router.post('/createTodo', async (req, res) => {
    const { ownerName, title, description, isCompleted } = req.body;

    if(!title || !description || isCompleted === null || ownerName === null) return res.status(400).send();

    const owner = await User.findOne({ username: ownerName }).exec();

    const existingTodo = await Todo.findOne({ owner: owner._id, title: title }).exec();

    if(existingTodo) return res.status(409).send();

    try {
        const todo = new Todo({
            owner: owner._id,
            title, 
            description,
            isCompleted
        })

        todo.save();
        res.status(200).send();

    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(409).end();
    }
});

// Get Todos
router.post('/getTodos', async (req, res) => {

    const { ownerName } = req.body;
    const owner = await User.findOne({ username: ownerName }).exec();

    try {
        const todos = await Todo.find({ owner: owner._id  }).exec();
        res.status(200).send(todos);
    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(404).end();
    }

})


// Delete Todo
router.delete('/deleteTodo', async (req, res) => {

    const { title, ownerName } = req.body;
    const owner = await User.findOne({ username: ownerName }).exec();

    if(!title) return res.status(400).send();

    try {
        const todo = await Todo.findOneAndDelete({ owner: owner._id, title: title }).exec();
        if (!todo) return res.status(404).send();
        res.status(200).send();
    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).end();
    }

})

// Update Todo status
router.patch('/changeStatus', async (req, res) => {
    const { ownerName, title } = req.body;
    const owner = await User.findOne({ username: ownerName }).exec();

    if(!title) return res.status(400).send();

    try {
        
        const todo = await Todo.findOne({ owner: owner._id, title: title }).exec();
        todo.isCompleted = !todo.isCompleted;
        todo.save();

        res.status(200).send();

    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).end();
    }

})


module.exports = router;