document.addEventListener("DOMContentLoaded", (event) => {
    const blogsContainer = document.querySelector(".blogs-container");
    const newBlogForm = document.querySelector(".new-blog-form");
    const homeButton = document.querySelector(".home");
    const logOutButton = document.querySelector(".log-out")

    const blogsUrl = "http://localhost:3000/blogs/";
    const userBlogsUrl = "http://localhost:3000/user_blogs/";

    accessPage();

    function accessPage(){
        if (!localStorage.getItem("token")){
            window.location.href = "/"
        }
           
    }

    homeButton.addEventListener("click", () => window.location.href = "/");
    logOutButton.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    })

    fetch(blogsUrl)
        .then(response => response.json())
        .then(blogs => displayBlogs(blogs["blogs"]));

    function displayBlogs(blogs) {
        
        blogs.forEach(blog => {
            console.log(blog["users"])
            const divCard = document.createElement("div")
            const blogTitle = document.createElement("h3");
            const blogAuthor = document.createElement("h3")
            const blogContent = document.createElement("p");

            divCard.className = "card"
            blogTitle.textContent = blog.title;
            blogContent.textContent = blog.text_content;
            blogAuthor.textContent = `Author: ${blog["users"][0].username}`
                    
            divCard.append(blogTitle, blogAuthor, blogContent)
            blogsContainer.appendChild(divCard)
        })
    }

    newBlogForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newBlogTitle = formData.get("title");
        const newBlogContent = formData.get("text_content");
        const newBlog = {
            title: newBlogTitle,
            text_content: newBlogContent
        }

        fetch(blogsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBlog)
        })
            .then(response => response.json())
            .then(blog => {
                const newUSerBlog = {
                    user_id: localStorage.getItem("user_id"),
                    blog_id: blog["blog"].id
                }
                fetch(userBlogsUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(newUSerBlog)
                })
                    .then(response => response.json())
                    .then(userBlog => {
                        console.log(userBlog)
                        location.reload();
                    })
            })
    })

})