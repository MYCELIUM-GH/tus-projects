const redditUrl = 'https://www.reddit.com/user/terrorizesur/m/ironhills/top.json?limit=10&t=day';

function createPostElement(postData) 
{
    const postElement = document.createElement('div');
    postElement.classList.add('reddit-post');

    const title = postData.title;
    const permalink = postData.permalink;
    const date = postData.created_utc ? new Date(postData.created_utc * 1000) : new Date();
    const timeAgo = (() => 
    {
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        const weeks = Math.floor(days / 7);
        if (weeks < 4) return `${weeks}w ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        const years = Math.floor(days / 365);
        return `${years}y ago`;
    })();

    const ups = postData.ups;
    const comments = postData.num_comments;

    postElement.innerHTML = 
    `
        <a href="https://www.reddit.com${permalink}" target="_blank">
            <h3>${title}</h3>
        </a>
        <p>${timeAgo}&nbsp;&nbsp;•&nbsp;&nbsp;${ups} upvotes&nbsp;&nbsp;•&nbsp;&nbsp;${comments} comments</p>
    `;
    return postElement;
}

function displayRedditPosts(data) 
{
    const container = document.querySelector('.reddit.posts'); 

    data.data.children.forEach(post => 
    {
        const postElement = createPostElement(post.data);
        container.appendChild(postElement);
    });
}

fetch(redditUrl)
    .then(response => { return response.json(); })
    .then(data => { displayRedditPosts(data); })
    .catch(() => 
    {
        const container = document.querySelector('.reddit.posts');
        if (container) 
        {
             container.innerHTML += '<p style="text-align:center;">Nothing to show;p</p>';
        }
    });