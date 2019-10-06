const express = require('express');
const Posts = require('./db.js');

const router = express.Router();

router.get('/', (req, res) => {
    // try {
    //     console.log('query: ', req.query);
    //     const posts = await Posts.find(req.query);
    // }
    // catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         error: "The posts information could not be retrieved."
    //     })
    // }
    Posts.find(req.query)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving the hubs',
            });
        })
})

router.get('/:id', (req, res) => {
    console.log('req.params: ', req.params);
    const { id } = req.params;
    Posts.findById(id)
        .then(post => {
            console.log('post: ', post);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The posts information could not be retrieved." 
            })
        })
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    Posts.findPostComments(id)
    .then(post => {
        // console.log('post coments: ', post);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "The posts information could not be retrieved." 
        })
    })
})

//post
router.post('/', (req, res) => {
    console.log('req.body: ', req.body);
    // const { title, contents } = req.body;
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            });
        });
})

// added
// {
// 	"text": "NEWNEWNEW", // required
// 	"post_id": "1" // required
// }
router.post('/:id/comments', (req, res) => {
    console.log(req.body)
    Posts.insertComment(req.body)
        .then(post => {
            console.log('post: ', post);
            if (post) {
                res.status(201).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }   
        })
        .catch(err => {
            res.status(500).json({
                message: "The post with the specified ID does not exist." 
            })
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Posts.remove(id)
        .then(deledted => {
            if (deledted) {
                res.status(200).json(deledted);
            } else {
                res.status(400).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updated = req.body;
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    Posts.update(id, updated)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
})

module.exports = router;