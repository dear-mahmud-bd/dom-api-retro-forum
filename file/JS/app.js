
let readCount = 0;



// Search Field...
const searchField = document.getElementById('search-field');
const handleSearch = () => {
    const searchText = searchField.value;
    loadAllPost(searchText);
    searchField.value = '';
};
searchField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        handleSearch();
    }
});




// Load All Post / category wise...
const loadAllPost = async (category='') => {
    document.getElementById('all-post-loading-spinner').classList.remove('hidden');
    document.getElementById('all-post-container').classList.add('hidden');

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data = await res.json();
    const allPost = data.posts;

    setTimeout(() => {    
        document.getElementById('all-post-container').classList.remove('hidden');
        displayAllPost(allPost, category);
        document.getElementById('all-post-loading-spinner').classList.add('hidden');
    }, 2000);
};
loadAllPost();

const displayAllPost = (allPost, category) => {
    // console.log(category);
    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.textContent = '';
    if(allPost.length==0){
        const notFound = document.createElement('div');
        notFound.classList = `text-center my-20 `;
        notFound.innerHTML = `
            <h1 class="text-3xl font-extrabold text-red-600">Oops!!</h1>
            <p class="text-3xl font-bold mx-auto md:mx-[20%]">
                Search Result '${category}' Not Found 
            </p>
        `;
        allPostContainer.appendChild(notFound);
    }

    allPost.forEach(post => {
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
                        <span onclick="handleMarkAsRead('${post.title.replace(/'/g, "\\'")}', ${post.view_count})"
                            class="flex items-center justify-center text-sm h-6 w-6 bg-green-500 rounded-xl cursor-pointer">
                            <i class="fa-solid fa-envelope-open text-gray-100"></i>
                        </span>
                    </div>
                </div>
            </div>
        `;

        allPostContainer.appendChild(postCard);
    });
};

const handleMarkAsRead = (title, view_count) =>{
    const markRead = document.getElementById('mark-as-read-list');
    const createList = document.createElement('li');
    createList.classList = `flex items-center justify-between text-sm bg-white rounded-lg p-2`;
    createList.innerHTML = `
        <span>${title}</span>
        <span class="flex items-center justify-center text-gray-500">
            <i class="fa-solid fa-eye"></i><span class="ml-1"> ${view_count.toLocaleString()}</span>
        </span>
    `;
    markRead.appendChild(createList);
    readCount++;
    setReadCount();
};

const setReadCount = () =>{
    const readCountTag = document.getElementById('read-count');
    readCountTag.textContent = readCount;
};




// Latest Post Part...
const loadLatestPost = async () =>{
    document.getElementById('latest-post-loading-spinner').classList.remove('hidden');
    document.getElementById('latest-post-container').classList.add('hidden');

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const allPost = data;
    
    setTimeout(() => {
        document.getElementById('latest-post-container').classList.remove('hidden');
        displayLatestPost(allPost);
        document.getElementById('latest-post-loading-spinner').classList.add('hidden');
    }, 2000);
};
loadLatestPost();

const displayLatestPost = (allPost) =>{
    const latestPostContainer = document.getElementById('latest-post-container');
    latestPostContainer.textContent = '';
    allPost.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList = `card bg-white border rounded-lg overflow-hidden`;
        postCard.innerHTML = `
            <img class="m-4 h-48 w-auto rounded-lg" src="${post.cover_image}" alt="">          
            <div class="p-4">
                <div class="flex items-center text-sm text-gray-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ${post.author['posted_date']? post.author['posted_date']: 'No publish date'}
                </div>
                <h2 class="text-lg font-semibold mb-2">${post.title}</h2>
                <p class="text-gray-600 mb-4">${post.description}</p>
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gray-300 mr-3">
                        <img class="rounded-full" src="${post.profile_image}" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold">${post.author['name']}</p>
                        <p class="text-xs text-gray-500">${post.author['designation'] ? post.author['designation']: 'Unknown'}</p>
                    </div>
                </div>
            </div>
        `;
        latestPostContainer.appendChild(postCard);
    });
};
 
