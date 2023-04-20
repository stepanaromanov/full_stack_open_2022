const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum 
}

const favoriteBlog = (blogs) => {
    const arr = []
    blogs.forEach(blog => {
        arr.push(blog.likes)
    })
    const max = Math.max.apply(null, arr)
    const blogObj = blogs.find(
        blog => blog.likes === max)
    return Object.assign({}, {author: blogObj.author, 
                              likes: blogObj.likes, 
                              title: blogObj.title})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
