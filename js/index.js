
const form =document.querySelector("#github-form")
const userList = document.querySelector("#user-list")
const reposlist= document.querySelector("#repos-list")

function formReset(){
    document.getElementById("github-form").reset();
}

// display users
const users = function(e){
    e.preventDefault()
    const user = document.getElementById("search").value
    fetch(`https://api.github.com/search/users?q=${user}`,{Accept: "application/vnd.github.v3+json"}).then(res => res.json()).then(data =>{
        console.log(data.items);
        data.items.map(user=>{
            const markup = `<li><p id="align">Username: ${user.login}</p> 
            <img src="${user.avatar_url}" alt="${user.login}" id="img">
            <p><a href="${user.html_url}">Go to Profile</a></p>
            </li>`
            userList.insertAdjacentHTML("afterbegin", markup)

            // display user repos on click of user container
            const userLi = userList.querySelector("li")
            userLi.addEventListener("click", ()=> displayRepos(user.login))

        })
       
        
    }).catch(err =>{
        alert(err.message)
    })

    formReset();

}

form.addEventListener("submit", users)


// display user repos
const displayRepos = function(user){

    fetch(`https://api.github.com/users/${user}/repos`).then(res => res.json()).then(data => {
        console.log(data);
        data.map(repo=>{
            const markup = `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`
            userList.innerHTML = ""
            reposlist.insertAdjacentHTML("afterbegin", markup)

        })
    })
   
}