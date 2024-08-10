// all post:    https://openapi.programming-hero.com/api/retro-forum/posts
// latest post: https://openapi.programming-hero.com/api/retro-forum/latest-posts 

// all-post-container




const loadAllPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const allPost = data.posts;
    displayAllPost(allPost)
};
loadAllPost();

const displayAllPost = (allPost) => {
    console.log(allPost);
    const allPostContainer = document.getElementById('all-post-container');
    // console.log(allPostContainer);
    // allPostContainer.textContent = '';

    allPost.forEach(post => {
        console.log(post);
        // console.log(post.isActive);

        const postCard = document.createElement('div');
        postCard.classList = `flex items-start bg-gray-100 p-4 rounded-lg m-1`;
        postCard.innerHTML = `
            <div class="flex-shrink-0 mt-1">
                <div class="avatar">
                    <div class="w-16 rounded-3xl">
                        <img src="${post.image}" />
                    </div>
                    <span class="absolute top-0 right-0 h-4 w-4 ${post.isActive ? 'bg-green-600': 'bg-red-600'} rounded-full border-2 border-white"></span>
                </div>
            </div>
            <div class="w-full ml-4">
                <div class="text-sm text-gray-600 font-medium">
                    # ${post.category} <span class="ml-3">Author: ${post.author['name']}</span>
                </div>
                <h2 class="text-lg font-bold text-gray-800 mt-1">${post.title}</h2>
                <p class="text-gray-600 mt-1">${post.description}</p>
                <div
                    class="flex justify-between text-gray-500 mt-4 border-t-2 border-gray-300 border-dashed pt-3">
                    <div class="flex items-center space-x-4">
                        <span class="flex items-center justify-center text-sm">
                            <i class="fa-solid fa-comment-alt"></i>&nbsp; ${post.comment_count}
                        </span>
                        <span class="flex items-center justify-center text-sm">
                            <i class="fa-solid fa-eye"></i>&nbsp; ${post.view_count.toLocaleString()}
                        </span>
                        <span class="flex items-center justify-center text-sm">
                            <i class="fa-solid fa-clock"></i>&nbsp; ${post.posted_time} min
                        </span> 
                    </div>
                    <div class="flex items-center space-x-4">
                        <span
                            class="flex items-center justify-center text-sm h-6 w-6 bg-green-500 rounded-xl">
                            <i class="fa-solid fa-envelope-open text-gray-100"></i>
                        </span>
                    </div>
                </div>
            </div>
        `;

        allPostContainer.appendChild(postCard);
    });

};































