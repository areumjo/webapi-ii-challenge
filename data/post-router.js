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
        console.log('post coments: ', post);
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


module.exports = router;