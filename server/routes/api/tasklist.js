const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadTasksCollection();
    res.send(await posts.find({}).toArray());
});
// Add Post
router.post('/', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});
// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send({});
});
async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://chantha:1234@cluster0.n9tvb.mongodb.net/my_tasklist?retryWrites=true&w=majority', {
            useNewUrlParser: true
        }
    );
    return client.db('my_tasklist').collection('mytasks');
}
module.exports = router;