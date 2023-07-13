$(document).ready(function () { 
    $.ajax({ 
    url: "https://jsonplaceholder.typicode.com/posts", 
    method: "GET", 
    success: function (posts) { 
    let result = ``;
    posts.forEach(function (post, index) { 
    result += `<div class="card mb-3"> 
    <div class="card-header"> 
    <h1>${index + 1}. ${post.title}</h1> 
    </div> 
    <div class="card-body"> 
    <p>${post.body}</p> 
    </div> 
    </div>`;
    });
    
    $("#container").html(result);
    } 
   });
   });