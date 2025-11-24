function createPostElement(postData) 
{
    const postElement = document.createElement('div');
    postElement.classList.add('reddit-post');

    const title = postData.title;
    const permalink = postData.permalink;
    const ups = postData.ups;
    const comments = postData.num_comments;

    postElement.innerHTML = 
    `
        <a href="https://www.reddit.com${permalink}" target="_blank">
            <h3>${title}</h3>
        </a>
        <p>upvotes: ${ups} | comments: ${comments}</p>
    `;
    return postElement;
}

function displayRedditPosts(data) 
{
    const container = document.querySelector('.reddit.r-selfhosted'); 
    
    if (data.data && data.data.children) 
    {
        data.data.children.forEach(post => 
        {
            const postElement = createPostElement(post.data);
            container.appendChild(postElement);
        });
    } 
    else 
    {
        container.innerHTML += '<p>No posts found or data structure is unexpected.</p>';
    }
}

const redditUrl = 'https://www.reddit.com/r/selfhosted/top.json?limit=5&t=day';

fetch(redditUrl)
    .then(response => 
    {
        if (!response.ok) 
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => 
    {
        displayRedditPosts(data);
    })
    .catch(error => 
    {
        console.error("Error fetching Reddit posts:", error);
        // Ensure the container exists before trying to update its content
        const container = document.querySelector('.reddit.r-selfhosted');
        if (container) 
        {
             container.innerHTML += '<p>Could not load Reddit posts due to a network error.</p>';
        }
    });