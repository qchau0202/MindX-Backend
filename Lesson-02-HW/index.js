import express from "express"
const app = express()
const PORT = 8000
import { posts } from "./data.js"

// ! Middleware
app.use(express.json())

// todo Query method ( use this to get the post with )
app.get('/', (req, res) => { 
    const getTitle = req.query.title
    if (getTitle) {
        const filter = posts.filter(post => post.title.includes(getTitle))
        return res.status(200).json({
            method: "This is GET method",
            posts: filter,
        });
    } else {
        return res.status(200).json({
            method: "This is GET method",
            posts: posts,
        })
    }
})
// todo Delete method
app.delete('/', (req, res) => {
    const title = req.query.title; // Get the title from the query parameters

    if (title) {
        const temp = posts.filter(post => post.title !== title);

        if (temp.length < posts.length) {
            // Return all except the one which was taken in
            return res.status(200).json({
                method: "This is DELETE method",
                message: `Post with title "${title}" is no longer appears.`,
                posts: temp
            });
        } else {
            // Return all, if the title was not in the posts
            return res.status(404).json({
                method: "This is DELETE method",
                message: `Post with title "${title}" is not found.`,
                posts: posts
            });
        }
    } else {
        // If no title, return all
        return res.status(200).json({
            method: "This is DELETE method",
            posts: posts
        });
    }
});


app.listen(PORT, () => {
    console.log(`Sever is running on port: ${PORT}`)
})