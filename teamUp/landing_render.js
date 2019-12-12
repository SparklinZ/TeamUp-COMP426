$(document).ready(async () => {
    if (localStorage.getItem("jwt")) {
        handleRenderGroupPage();
    } else {
        $('#homePage').append(renderHomePage());
    }
    $('#content').on("click", "#login", handleRenderLogin);
    $('#signup').on("click", handleRenderSignUp);
    $('#navBar').on("click", "#wall", handleRenderWall);
    $('#navBar').on("click", "#home", handleRenderHome);
    $('#navBar').on("click", "#groupsBtn", handleRenderGroupPage);
    $('#navBar').on("click", "#studentsBtn", handleRenderStudentPage);
    $('#content').on("click", "#noAccount", handleRenderSignUp);
    $('#content').on("click", "#signup", handleRenderSignUp);
    $('#content').on("click", "#signupButton", handleSignup);
    $('#loggedIn').on("click", "#logout", handleLogout);
    $('#content').on("click", "#editOwnCard", handleEditOwnCard);
    $('#content').on("click", "#canelEditingOwnCard", handleCancelEditOwnCard);
    $('#content').on("click", "#submitPostButton", handleSubmitPostPress);
    $('#content').on("click", "#createGroupButton", handleSubmitGroup);
    $('#content').on("click", "#deleteGroup", handleDeleteGroup);
    $('#content').on("click", "#joinGroupButton", handleJoinGroup);
    $('#content').on("click", "#addToDoButton", handleSubmitToDo);
    $('#content').on("click", ".deleteToDoButton", handleDeleteToDo);
    $('#content').on("click", "#doneEditingOwnCard", handleDoneEditOwnCard);

    //$('#content').on("click", "#editGroup", handleEditGroup);





})



// rendering home page
function renderHomePage() {
    return `<!-- logo -->
        <img class="word-logo" src="icon/TeamUP-word-logo_inverse-color.png">

        <!-- Tagline -->
        <div class="landing-text">
            "TEAMWORK MAKES THE DREAM WORK" - Form your dream team with TEAMUP today!
        </div>
        <br>
        <br>
        <!-- Login buttons -->
        <div class="container">
            <div class="btn-toolbar">
                <button class="btn btn-dark btn-lg center-block mr-5 w-25" id="login">Student Login</button>
                <button class="btn btn-info btn-lg center-block ml-5 w-25" id="signup">Sign Up</button>
            </div>
        </div>`
}

function handleRenderHome(event) {
    if (event) {
        event.preventDefault();
    }
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $("#video").show();
    $('#groupPage').empty();
    $('#signUpFormPage').empty();
    $('#homePage').append(renderHomePage());
    $('video')[0].onended = function () {
        this.load();
        this.play();
    };
}

// render login page
function renderLoginPage() {
    return `<div class="loginbox">
    <img src="icon/teamupicon.png" class="avatar">
    <h1>Login Here</h1>
    <br>
    <form id ="login-form">
        <p>Username</p>
        <input type="text" name="name" placeholder="Enter Username" required autofocus>
        <p>Password</p>
        <input type="password" name="pass" placeholder="Enter Password" required>

        <div class="field">
            <div class="control">
                <button class="btn-dark btn-xs" type="submit">Login</button>
                <button class="btn btn-link" id="noAccount">Don't have an account?</a>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <p id="message"></p>
            </div>
        </div>
    </form>
</div>`
}


function handleRenderLogin(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#groupPage').empty();
    $('#signUpFormPage').empty();
    $('#loginPage').append(renderLoginPage());

    const $form = $('#login-form');


    $form.submit(function (e) {
        e.preventDefault();
        // retrieve data from login form
        const data = $form.serializeArray().reduce((accumulator, x) => {
            accumulator[x.name] = x.value;
            return accumulator;
        }, {});
        // call login function
        logInRequest(data);
    });
}


async function logInRequest(data) {
    const $message = $('#message');
    $message.html('');
    await $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data,
    }).then((res) => {
        $message.html(`<span class="has-text-success">Success! You are now logged in.</span>`);
        // Store the jwt token from the response to use it later on for authorization 
        setToken('jwt', res.jwt);
        setToken('name', res.name);
        handleRenderGroupPage();
        // Call the rerenderFunction (to be written) to show GroupPage including a logoff button in navbar
        //rerender();
        /* This is just parked here. To access the stored token use this line 
        let jwt = localStorage.getItem('jwt'); 
        and put it then into an authorization bearer header*/

        // TO DO: put replace/ rerender call here (e.g. wall page with log out user button)
        // window.location.replace("http://localhost:3000/index.html")
        // console.log(res.jwt);
    }).catch(() => {
        R
        $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    });
    return
}

// render sign up page
function renderSignUpPage() {
    return `
    <br>
    <form  class="form-horizontal" role="form" id="signupForm" >
        <div class="form-row">
            <div class="col form-group">
                <label>First name </label>   
                <input type="text" class="form-control" name="firstName">
            </div> <!-- form-group end.// -->
            <div class="col form-group">
                <label>Last name</label>
                    <input type="text" class="form-control" name="lastName">
            </div> <!-- form-group end.// -->
        </div>
        <div class="form-row">
            <div class = "col form-group">
            
                <label>Gender</label>
                <select id="inputGender" class="form-control" name="gender">
                <option> Choose...</option>
                <option>Female</option>
                <option>Male</option>
                </select>
            </div> <!-- form-group end.// -->

            
            <div class="col form-group">
                <label>Username</label>
                    <input type="text" class="form-control" name="name">
            </div> <!-- form-group end.// -->
        </div> <!-- form-row end.// -->

   
        
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Major</label>
                <input type="text" class="form-control" name="major">
            </div> <!-- form-group end.// -->
            <div class="form-group col-md-6">
                <label>Year</label>
                <select id="inputYear" class="form-control" name="year">
                <option> Choose...</option>
                <option>Freshman</option>
                <option>Sophomore</option>
                <option selected="">Junior</option>
                <option>Senior</option>
                <option>Grad School</option>
                </select>
            </div> <!-- form-group end.// -->
        </div> <!-- form-row.// -->

        <div class="form-group">
            <label for="bio">Description/Bio</label>
                <textarea class="form-control" rows="2" id="bio" type= "textarea" name="bio"></textarea>
            <small class="form-text text-muted">Be creative, be yourself ;)</small>
        </div>

        <div class="form-group">
        <label for="bio">Relevant skills</label>
            <textarea class="form-control" rows="2" id="skills" type= "textarea" name="skills"></textarea>
        <small class="form-text text-muted">Don't be shy to showcase yourself.</small>
        </div>

        <div class="form-group">
        <label>Email address</label>
            <input type="email" class="form-control" name="email">
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
            <label>Create password</label>
            <input class="form-control" type="password" name="pass">
        </div> <!-- form-group end.// -->  
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" id="signupButton">Sign up</button>
        </div> <!-- form-group// -->      
        <small class="text-muted">By clicking the 'Sign Up' button, you confirm that you accept our <br> Terms of use and Privacy Policy.</small>                                          
        <div class="field">
            <div class="control">
                <p id="message"></p>
            </div>
        </div>    
    </form>`
}

function handleRenderSignUp(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#groupPage').empty();
    $('#signUpFormPage').append(renderSignUpPage());

}

async function handleSignup(event) {
    event.preventDefault();

    let form = event.currentTarget.closest("#signupForm");
    let data = $(form).serializeArray().reduce((acc, x) => {
        acc[x.name] = x.value;
        return acc;
    }, {});
    // let $message = $('#message');
    // console.log(formData);
    $.ajax({
        url: 'http://localhost:3000/account/create',
        type: 'POST',
        data,
        // xhrFields: {
        //     withCredentials: true,
        // },
    }).then(async function () {
        await logInRequest(data)
        await userDataCreate(data);
        
    }
    ).catch((err) => console.log(err));



    // try {
    //     await $.ajax({
    //         url: 'http://localhost:3000/account/create',
    //         type: 'POST',
    //         data,
    //         // xhrFields: {
    //         //     withCredentials: true,
    //         // },
    //     });

    // } catch (error) {
    //     console.log(error)
    //     $message.html('<span class="has-text-danger">Something went wrong and you were not signed up.</span>');
    // }


}

async function userDataUpdate(data){
    await axios
        .post(`http://localhost:3000/private/users/${localStorage.getItem('name')}/year`, {
            data: data.year            
        },
            { headers: { Authorization: `Bearer ${getToken()}` } },
        )
        .then(res => console.log(res))


    await axios
        .post(`http://localhost:3000/private/users/${localStorage.getItem('name')}/bio`, {
            data: data.bio,
                '': data.major,
                'skills': data.skills,
        },
            { headers: { Authorization: `Bearer ${getToken()}` } },
        )
        .then(res => console.log(res))


    await axios
        .post(`http://localhost:3000/private/users/${localStorage.getItem('name')}/major`, {
            data: 
                data.major,            
        },
            { headers: { Authorization: `Bearer ${getToken()}` } },
        )
        .then(res => console.log(res))


    await axios
        .post(`http://localhost:3000/private/users/${localStorage.getItem('name')}/skills`, {
            data:  data.skills,      
        },
            { headers: { Authorization: `Bearer ${getToken()}` } },
        )
        .then(res => console.log(res))
}

async function userDataCreate(data) {
    let $message = $('#message');
    await axios
        .post(`http://localhost:3000/private/users/${data.name.toLowerCase().split('.')}`, {
            data: {
                'username': data.name,
                'firstname': data.firstName,
                'lastname': data.lastName,
                'email': data.email,
                'gender': data.gender,
                'year': data.year,
                'bio': data.bio,
                'major': data.major,
                'skills': data.skills,
                'ownsGroup': false,
                'hasGroup': false,
                'inGroup': ""
            }
        },
            { headers: { Authorization: `Bearer ${getToken()}` } },
        )
        .then(res => console.log(res))
        .catch(err => {
            console.log(err);
            $message.html('<span class="has-text-danger">Something went wrong when store the info.</span>');
        }
        );
    await axios
        .post(`http://localhost:3000/user/todos/${Date.now()}`, {
            data: { 
                "toDo": "Proposal due October 12th"
            }    
        },
            { headers: { Authorization: `Bearer ${getToken()}` } },
        )
}

// render wall of comments
function renderWall() {
    return `<div class="panel">
    <div class="panel-heading">
        <h3 class="panel-title" id="joke"></h3>
    </div>
    <br>
    <div class="panel-body">
        <form class="form-group tweetForm" id="tweetForm">
            <div class="field">
                <div class="control">
                    <textarea class="form-control" placeholder="Share with us what's on your mind right now?" rows="2"
                        name="data" id="postBox"></textarea>
                    <br>
                </div>
            </div>
            <div class="field">
                <div class="control">
                <button class="btn-dark btn" id="submitPostButton">Post</button>
                </div>
            </div>
        </form>

        <div class="clearfix"></div>
        <hr class="margin-bottom-10">

        <br>
        <ul class="list-unstyled" id="tweetStream">
            <!-- tweets will be rendered here dynamically, see handleRenderWall -->
        </ul>
        <span class="text-info">COMP426 Exclusive</span>
    </div>
</div>`
}

function renderWallPost(post, i) {
    // time difference is not working right now due change in i. Please keep code below for later though.
    // let timeDiff = diff_minutes(Date.now(), new Date(i));    ---  ${timeDiff}
    return `
    <li class="media" id="${i}">
        <img class="mr-3 rounded resizeImg" src="icon/avatar.png" alt="Avatar">
        <div class="media-body">
            <h5 class="mt-0 mb-1">Anonymous <small></small></h5>
            ${post.text}
        </div>
    </li><br>`
}


// delete the post from backend - this is currently not implemented, but might be later on
async function deleteWallPost(i) {
    const result = await axios({
        method: 'delete',
        url: 'http://localhost:3000/public/delete/i',
    });
    return result;
}


// callback function to render Wall
async function handleRenderWall(event) {
    if (event) {
        event.preventDefault();
    }
    $('#loginPage').empty();
    $('#signUpFormPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#groupPage').empty();
    $('#studentPage').empty();
    $('#wallPage').append(renderWall());


    // integration to fetch joke from 3rd party API
    const result = await axios({
        method: 'get',
        url: "http://api.icndb.com/jokes/random?limitTo=[nerdy]"
    })
    $('#joke').append("Just for the giggles: " + result.data.value.joke);

    // call getWallPosts function and forward result to renderPost function
    const posts = await getWallPosts();
    console.log(posts);
    for (var i in posts) {
        $('#tweetStream').prepend(renderWallPost(posts[i], i));
    }
}

// axios call to post something on the wall
async function postWallPost(text) {
    const result = await axios({
        method: 'post',
        url: `http://localhost:3000/public/wallposts/${Date.now()}`,
        data: {
            data: {
                text: text,
            }
        },
    });
    return result;
}

// submit handler for posting something on the wall
async function handleSubmitPostPress(event) {
    // get input from textarea to post it 
    const $tweetRoot = $('#tweetStream');
    let $postBox = $('#postBox');
    const $form = $('#tweetForm');
    $form.submit(async function (e) {
        e.preventDefault();
        const dataFromForm = $form.serializeArray().reduce((accumulator, x) => {
            accumulator[x.name] = x.value;
            return accumulator;

        }, {});
        // call post function
        const response = await postWallPost(dataFromForm.data);
        // rerender whole wallpage
        return handleRenderWall();

        /*
        For now, adding only the posted post doesn't work due to a bug, hence, we reload the whole wall for now. Please keep below code for later.

        let id = response.data.result.path.split(".")[1]; 
        $postBox.replaceWith(`<textarea class="form-control" placeholder="Share with us what's on your mind right now?" rows="2"
        name="data" id="postBox"></textarea>`);
        const posted = await getWallPost(id);   
        return $tweetRoot.prepend(renderWallPost(posted, id));*/
    });

}

// call to get wallposts
async function getWallPosts() {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/public/wallposts',
    });
    return result.data.result;
};


// call to get specific wallpost
async function getWallPost(id) {
    const result = await axios({
        method: 'get',
        url: `http://localhost:3000/public/wallposts/${id}`,
    });
    //console.log(result.data.result);
    return result.data.result;
};



// render group page
function renderGroupPage(groups) {
    //console.log("Aufruf der RenderGroupPageMethode");
    //console.log(groups);
    $("#welcome").html(`Welcome,<a onclick="handleRenderUserPage()">${localStorage.getItem('name')}</a>!`);
    $("#groupPage").append(`<div class="background"></div>
    <div class="container"> 
        <p class="text">Team up with someone today!</p>
        
        <!-- Form to create a group-->
        <form  class="form-horizontal" role="form" id="createGroupForm" >    
            <div class="form-row">
                <div class="col form-group">
                    <label>Group Name</label>   
                    <input type="text" class="form-control" name="groupName" placeholder="Group Name">
                </div>
                <div class = "col form-group">
                    <label>Maximum Capacity</label>
                    <select id="inputGender" class="form-control" name="maxCapacity">
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="createGroupButton">Create Group</button>
                </div>       
            </div>
            <div class="field">
                <div class="control">
                    <p id="errorMessage"></p>
                </div>
            </div>
        </form>



        <!-- group cards will be inserted below dynamically -->
        <div id="groups"> 
        
        </div>`)


    let counter = 0;
    let row_counter = 1000;
    for (var i in groups) {
        if (counter === 0) {
            $("#groups").append(`<div class="row" id="${row_counter}">${renderGroupCard(groups[i], i)}</div>`);
            counter++;
            //console.log(0);
        }
        else {
            if (counter === 1) {
                let key = "#" + row_counter;
                $(key).append(renderGroupCard(groups[i], i));
                counter++;
                //console.log(1);
            } else {
                if (counter === 2) {
                    let key = "#" + row_counter;
                    $(key).append(renderGroupCard(groups[i], i));
                    counter = 0;
                    row_counter = row_counter + 1;
                    //console.log(2);
                }
            }

        }
    }
}


// group card
function renderGroupCard(group, i) {
    let groupMembers = "";
    let buttons = "";
    //console.log("Aufruf der RenderGroupCardMethode");
    //console.log(group);
    for (let i = 0; i < group.groupMembers.length; i++) {
        groupMembers = groupMembers.concat(`<li class="list-group-item">${group.groupMembers[i]}</li>`);
    }
    if (group.groupOwner === localStorage.getItem("name")) {
        buttons = `<div class="btn-group float-right" role="group" aria-label="Second group">
                    <button type="button" class="btn btn-danger" id="deleteGroup">Delete</button>
                    </div>
                    <div class="btn-group float-right" role="group" id="buttonGroup">
                    <button type="button" class="btn btn-primary mr-2" id="editGroup">Edit</button>
                    </div>
                    `
    } else {
        buttons = `<button type="button" class="btn btn-primary btn-lg btn-block" id="joinGroupButton">Join</button>`
    }


    return `<div class="card" style="width: 18rem;" id="${i}">
                <div class="card-body">
                    <h1 class="card-title bold">${group.groupName}</h1>
                    <p class="card-text" style="text-align:center;">Max Capacity: ${group.groupCapacity}</p>
                </div>
                <ul class="list-group list-group-flush">
                    ${groupMembers}
                </ul>
                <div class="card-body">
                    ${buttons} 
                </div>
            </div>`
}

// render student page
async function getUserData(name) {
    try {
        const res = await $.ajax({
            url: `http://localhost:3000/private/users/${name}`,
            type: 'GET',
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        return res.result;

    } catch (error) {
        let result = 'code has-error';
        return result;
    }
}


async function renderUserPage() {

    $("#userPage").append(`<div class="background"></div>
    <div class="container">
    <p class="text">Team up with someone today!</p>
        <div class="row" id="userPageBody">
            <div class= "col" >
                <div class = "card"  style="width: 40rem; margin-top:1rem">
                        <div id="myDIV" class="header">
                            <h2>My To Do List</h2>
                            <br>
                            <form id="toDo-form">
                            <input type="text" name="toDo" id="myInput" placeholder="To do...">
                            <button type="button" id="addToDoButton">Add</button>
                            </form>  
                </div>

                <ul class="list-group list-group-flush" id="toDoList">
                    
                <!-- to be inserted dynamically -->
                <!-- maybe a functino called renderToDoList()-->
                <!--<li class="list-group-item">Proposal due October 12th <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</button></li>
                    
                <li class="list-group-item">Mockup due October 31st <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>
            
                <li class="list-group-item">15% Video due December 10th <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>
            
                <li class="list-group-item">15% Presentation/Expo due December 12th<button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>-->


                </ul>

                <!-- student cards to be inserted dynamically here -->
            </div>
            </div>
            
       </div> 
    </div>`);

    try {
        const result = await getUserData(localStorage.getItem("name"))
        $("#userPageBody").prepend(renderOwnStudentCard(result));
    } catch (error) {
        console.log(error);
        result = error;
    }





    //$("#students").append(renderOwnEditStudentCard());

    // async function to get all the students and render student cards individually using renderStudentCard(student)

    // getName() should return name of the logged in user
    //let ownName = getName();

    // Using ownName, locate informmation for the logged in user

    //reach row puts three students
    // insert 3 into each time `<div class="row"></div>`
}
function avatarIcoByGender(gender){
    if(gender==="Female"){
        return "icon/avatar-f.png"
    }
    else {
        return "icon/avatar-m.png"
    }
}
function renderOwnStudentCard(student) {
    return `<div class="col" id="ownCard">
    <div class="card" style="width: 20rem; margin-top:1rem">
        <div class="card-body">
        <h5 class="card-title lead"> <img class="mr-3 rounded resizeImg" src=${avatarIcoByGender(student.gender)} alt="Avatar"> My Profile </h5>
        <p class="card-text" id = "ownBio">${student.bio}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Gender: ${student.gender}</li>
            <li class="list-group-item">Year: ${student.year}</li>
            <li class="list-group-item">Major:${student.major}</li>
            <li class="list-group-item">Relevant Skills: ${student.skills}</li>
        </ul>
        <div class="card-body">
            <button type="button" class="btn btn-primary btn-lg btn-block" id="editOwnCard">Edit</button>
        </div>
    </div>
</div>`
}


async function handleEditOwnCard(event) {

    $("#ownCard").remove();
    try {
        const result = await getUserData(localStorage.getItem("name"));
        console.log(result);
        $('#userPageBody').prepend(renderOwnEditStudentCard(result));
    } catch (error) {
        console.log(error);
        result = error;
    }
}


async function handleDoneEditOwnCard(event) {
    event.preventDefault();
    let form = event.currentTarget.closest("#ownCard");
    let data = $(form).serializeArray().reduce((acc, x) => {
        acc[x.name] = x.value;
        return acc;
    }, {});
    
    try {
        await userDataUpdate(data) 
        $("#ownCard").remove();
        handleRenderUserPage(event);
    } catch (error) {
        console.log(error);
        result = error;
    }


    
    // $("#ownCard").remove();
    // try {
    //     const result = await getUserData(localStorage.getItem("name"));
    //     console.log(result);
    //     $('#userPageBody').prepend(renderOwnEditStudentCard(result));
    // } catch (error) {
    //     console.log(error);
    //     result = error;
    // }
    // handleRenderUserPage(event);
}

async function handleCancelEditOwnCard(event) {
    $("#ownCard").remove();
    handleRenderUserPage(event);
}

function renderOwnEditStudentCard(student) {
    // need logged in user information to pre fill all the values
    // eg. <input class="input" type="text" value="${hero.firstSeen}" name="firstSeen">
    console.log(student);
    return `<form class="col-sm" id="ownCard">
    <div class="card" style="width: 20rem;">
        <div class="card-body">
        <h5 class="card-title lead"><img class="mr-3 rounded resizeImg" src=${avatarIcoByGender(student.gender)} alt="Avatar"> My Profile </h5>
        </div>
        <ul class="list-group list-group-flush">        
            <li class="list-group-item">Gender: ${student.gender}</li>
            <br>

            <div class="control">
                <div class="col form-group">
                <label>Bio</label>
            <textarea class="form-control" rows="2" name="bio">${student.bio}</textarea>
            </div>
            </div>

        <div class="control">
            <div class="col form-group">
            <label>Year</label>   
            <input type="text" class="form-control" name="year" value="${student.year}">
        </div> 
        </div<<!-- form-group end.// -->
            
        <div class="control">
        <div class="col form-group">
        <label>Major</label>   
        <input type="text" class="form-control" name="major" value="${student.major}">
    </div> 
    </div><!-- form-group end.// -->
    
    <div class="control">
        <div class="col form-group">
        <label>Relevant skills</label>   
        <input type="text" class="form-control" name="skills" value="${student.skills}">
    </div> 
    </div><!-- form-group end.// -->
        </ul>
        <div class="card-body">
            <div class="btn-group float-right" role="group" id="buttonGroup">
                <button type="button" class="btn btn-primary mr-2" id="doneEditingOwnCard">Done</button>
                <button type="button" class="btn btn-danger mr-2" id="canelEditingOwnCard">Cancel</button>
            </div>
        </div>
    </div>
</form>`
}

async function renderStudentPage(students) {
    $("#studentPage").append(`<div class="background"></div>
    <div class="container">
    <p class="text">Team up with someone today!</p>
        
    <div id="students">

    </div>

    </div>`)
    let counter = 0;
    let row_counter = 1;
    console.log(students);
    for (var student in students) {
        if (counter === 0) {
            $("#students").append(`<div class="row" id="${row_counter}"}>${renderStudentCard(students[student])}</div>`);
            counter = counter + 1;
        }
        else {
            if (counter === 1) {
                let key = "#" + row_counter;
                $(key).append(renderStudentCard(students[student]));
                counter = counter + 1;
            } else {
                if (counter === 2) {
                    let key = "#" + row_counter;
                    $(key).append(renderStudentCard(students[student]));
                    row_counter = row_counter + 1;
                    counter = 0;
                }
            }

        }


    }

    //

    //$("#students").append(renderOwnEditStudentCard());

    // async function to get all the students and render student cards individually using renderStudentCard(student)

    // getName() should return name of the logged in user
    //let ownName = getName();

    // Using ownName, locate informmation for the logged in user

    //reach row puts three students
    // insert 3 into each time `<div class="row"></div>`
}

function renderStudentCard(student) {
    console.log(student);
    if (student.gender === 'Male') {
        return `<div class="col-sm">
        <div class="card" style="width: 20rem;">
            <div class="card-body">
            <h5 class="card-title lead"> <img class="mr-3 rounded resizeImg" src="icon/avatar-m.png" alt="Avatar"> ${student.firstname} ${student.lastname}</h5>
            <p class="card-text">${student.bio}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Gender: ${student.gender}</li>
                <li class="list-group-item">Year: ${student.year}</li>
                <li class="list-group-item">Major: ${student.major}</li>
                <li class="list-group-item">Relevant Skills: ${student.skills}</li>
            </ul>
            <div class="card-body">
                <a href="mailto:${student.email}" class="card-link">Email</a>
            </div>
        </div>
    </div>`
    }
    else {
        return `<div class="col-sm">
        <div class="card" style="width: 20rem;">
            <div class="card-body">
            <h5 class="card-title lead"> <img class="mr-3 rounded resizeImg" src="icon/avatar-f.png" alt="Avatar"> ${student.firstname} ${student.lastname}</h5>
            <p class="card-text">${student.bio}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Gender: ${student.gender}</li>
                <li class="list-group-item">Year: ${student.year}</li>
                <li class="list-group-item">Major: ${student.major}</li>
                <li class="list-group-item">Relevant Skills: ${student.skills}</li>
            </ul>
            <div class="card-body">
                <a href="mailto:${student.email}" class="card-link">Email</a>
            </div>
        </div>
    </div>`
    }
}

// function that is called once user is logged on to render new group page
async function handleRenderGroupPage(res) {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#signUpFormPage').empty();
    $('#studentPage').empty();
    $('#video').hide();
    $('#homeDiv').hide();
    $('#loggedIn').show();
    $('#groupsDiv').show();
    $('#studentsDiv').show();
    $('#studentsDiv').show();
    $('#groupPage').empty();
    $("#userPage").empty();


    const groups = await getGroups();
    renderGroupPage(groups);

    // call getWallPosts function and forward result to renderPost function




    /*
    // call getGroups function and forward result to renderGroupPage function
    const groups = await getGroups();
    console.log(groups);
    renderGroupPage(groups);  

    // TO DO: we need to add an update call for users route that adds groupNumber, isGroupOwner, hasGroup

    //$('#groupPage').append(renderGroupPage(res));
*/


}

// function that is called once user clicks students in navbar
async function handleRenderStudentPage() {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#signUpFormPage').empty();
    $('#groupPage').empty();
    $('#video').hide();
    $('#homeDiv').hide();
    $('#loggedIn').show();
    $('#groupsDiv').show();
    $('#studentsDiv').show();
    $('#studentPage').empty();
    $('#userPage').empty();

    //$('#studentPage').append(renderStudentPage());
    const students = await getStudents();
    // call getWallPosts function and forward result to renderPost function
    renderStudentPage(students);
    //console.log(students);
    /*for (var i in posts) {
        $('#tweetStream').prepend(renderWallPost(posts[i], i));
    }*/


}

async function getStudents() {
    const result = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: 'http://localhost:3000/private/users',
    });
    //console.log(result);
    //console.log(result.data.result);
    return result.data.result;
};

async function handleRenderUserPage() {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#signUpFormPage').empty();
    $('#groupPage').empty();
    $('#video').hide();
    $('#homeDiv').hide();
    $('#loggedIn').show();
    $('#groupsDiv').show();
    $('#studentsDiv').show();
    $('#userPage').empty();
    $('#studentPage').empty();
    $('#userPage').append(renderUserPage());

    const toDos = await getToDos();
    renderToDoList(toDos);

}

// function that is called after click on logout button
function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    $('#loggedIn').hide();
    $('#groupsDiv').hide();
    $('#studentsDiv').hide();
    $('#studentPage').empty();
    $('#userPage').empty();
    $('#homeDiv').show();
    handleRenderHome();
}


// helper function to calc the time difference
function diff_minutes(datenow, tweetTS) {
    let diff = (datenow - tweetTS) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


async function getStatus() {
    try {
        const result = await axios({
            method: 'get',
            headers: { Authorization: `Bearer ${getToken()}` },
            url: 'http://localhost:3000/account/status',
        });
        return result.data;
    } catch (error) {
        return false;
    }
};

const getToken = () => {
    let token = localStorage.getItem('jwt');
    return token;
}

const setToken = (key, value) => {
    localStorage.setItem(key, value);
}


async function handleSubmitGroup(event) {
    event.preventDefault();
    // get input from textarea to post it 
    let studentGroupData = await hasGroup();
    if (studentGroupData.data.result.hasGroup === false) {
        const $form = $('#createGroupForm');
        const dataFromForm = $form.serializeArray().reduce((accumulator, x) => {
            accumulator[x.name] = x.value;
            return accumulator;
        }, {});

        // call postGroup function
        const postGroupResult = await postGroup(dataFromForm);
        let newGroupId = postGroupResult.data.result.path.split(".")[1]
        setToken("ownsGroup", newGroupId);

        updateStudentsGroupInfo("hasGroup", true);
        updateStudentsGroupInfo("ownsGroup", true);
        updateStudentsGroupInfo("inGroup", newGroupId);
        // rerender whole wallpage for now
        return handleRenderGroupPage();
    } else {
        if (studentGroupData.data.result.ownsGroup === true) {
            $("#errorMessage").empty();
            $("#errorMessage").append(`<span class="text-danger">You already own group ${studentGroupData.data.result.inGroup}.</span>`)
        } else {
            $("#errorMessage").empty();
            $("#errorMessage").append(`<span class="text-danger">You are already member of group ${studentGroupData.data.result.inGroup}.</span>`)
        }

    }
}

async function handleDeleteGroup(event) {
    event.preventDefault();
    let studentGroupData = await hasGroup();
    let groupCard = event.currentTarget.closest(".card");
    let groupID = $(groupCard).attr('id');
    // call postGroup function
    const postGroupResult = await deleteGroup(groupID);
    updateStudentsGroupInfo("hasGroup", false);
    updateStudentsGroupInfo("inGroup", "");
    updateStudentsGroupInfo("ownsGroup", false);

    localStorage.removeItem("ownsGroup");
    // rerender whole groupPage for now
    return handleRenderGroupPage();
}



async function getGroups() {
    const result = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: 'http://localhost:3000/private/groups',
    });
    //console.log("Results from getGroups Call");
    //console.log(result);
    //console.log(result.data.result);
    return result.data.result;
};


async function postGroup(data) {
    const result = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/private/groups/${Date.now()}`,
        data: {
            data: {
                groupName: data.groupName,
                groupMembers: [localStorage.getItem('name')],
                groupOwner: localStorage.getItem('name'),
                groupCapacity: data.maxCapacity
            }
        },
    });
    //console.log("Result from postGroup Call");
    //console.log(result);
    return result;
}


async function deleteGroup(id) {
    const result = await axios({
        method: 'delete',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/private/groups/${id}`,
    });
    return result;
};


async function updateGroupMembers(data, id) {
    const result = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/private/groups/${id}/groupMembers`,
        data: {
            data: [data],
            type: "merge"
        }
    });
    //console.log("Result from updatingGroupMembers Call");
    //console.log(result);
    return result;
}


async function handleJoinGroup(event) {
    event.preventDefault();
    let studentGroupData = await hasGroup();

    if (studentGroupData.data.result.hasGroup === false) {
        let groupCard = event.currentTarget.closest(".card");
        let groupID = $(groupCard).attr('id');

        const groupDetails = await getGroup(groupID);

        // check whether group has already reached its maximum capacity of members
        if (groupDetails.data.result.groupMembers.length < parseInt(groupDetails.data.result.groupCapacity)) {
            // call update GroupMembers function
            const postGroupResult = await updateGroupMembers(localStorage.getItem("name"), groupID);
            updateStudentsGroupInfo("hasGroup", true);
            updateStudentsGroupInfo("inGroup", groupID);

            // <button type="button" class="btn btn-primary btn-lg btn-block" id="joinGroupButton">Join</button>
            // rerender whole groupPage for now, maybe single call + replacewith 
            return handleRenderGroupPage();
        } else {
            $("#errorMessage").empty();
            $("#errorMessage").append(`<span class="text-danger">This group has already reached its maximum capacity.</span>`)
        }


    } else {
        if (studentGroupData.data.result.ownsGroup === true) {
            $("#errorMessage").empty();
            $("#errorMessage").append(`<span class="text-danger">You already own group ${studentGroupData.data.result.inGroup}.</span>`)
        } else {
            $("#errorMessage").empty();
            $("#errorMessage").append(`<span class="text-danger">You are already member of group ${studentGroupData.data.result.inGroup}.</span>`)
        }


    }
}


// use this function to determine whether student has group
async function hasGroup() {
    const result = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/private/users/${localStorage.getItem("name")}`,
    });
    //console.log("Results from HasGroup Call");
    //console.log(result);
    return result;
};


// use this function to change students group information
async function updateStudentsGroupInfo(attr, data) {
    const result = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/private/users/${localStorage.getItem("name")}/${attr}`,
        data: {
            data: data
        }
    });
    //console.log("Result from studentInfo Call");
    //console.log(result);
    return result;
}


async function getToDos() {
    const result = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: 'http://localhost:3000/user/todos',
    });
    console.log("Results from getToDos Call");
    //console.log(result);
    return result;
};



async function renderToDoList(toDos) {
    console.log(toDos);

    let key = "";
    let list = "";
    for (var toDo in toDos.data.result) {
        key = toDo;
        console.log(key);
        list = list.concat(`<li class="list-group-item" id="${key}">${toDos.data.result[toDo].toDo}<button type="button" class="btn btn-primary btn-lg pull-right deleteToDoButton" id="deleteToDoButton">Delete</button></li>`);
    }
    return $("#toDoList").append(list);
}


async function postToDo(data) {
    const result = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/user/todos/${Date.now()}`,
        data: {
            data: data
        }
    });
    console.log("Results from getToDos Call");
    console.log(result);
    return result;
};



// <input type="text" name="toDo" id="myInput" placeholder="To do...">

async function handleSubmitToDo(event) {
    event.preventDefault();

    const $form = $('#toDo-form');
    const dataFromForm = $form.serializeArray().reduce((accumulator, x) => {
        accumulator[x.name] = x.value;
        return accumulator;
    }, {});

    // call postGroup function
    const postToDoResult = await postToDo(dataFromForm);
    //let newGroupId = postGroupResult.data.result.path.split(".")[1]

    // rerender whole wallpage for now
    return handleRenderUserPage();

}



async function handleDeleteToDo(event) {
    event.preventDefault();
    let toDoCard = event.currentTarget.closest(".list-group-item");
    let toDoID = $(toDoCard).attr('id');
    // call postGroup function
    const deleteResult = await deleteToDo(toDoID);
    // rerender whole groupPage for now
    return handleRenderUserPage();
}

async function deleteToDo(id) {
    const result = await axios({
        method: 'delete',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/user/todos/${id}`,
    });
    console.log(result);
    return result;
};



async function getGroup(id) {
    const result = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `http://localhost:3000/private/groups/${id}`,
    });
    console.log("Result from getGroup Call");
    console.log(result);
    //console.log(result.data.result);
    return result;
};


/* This is used for backend exploration
async function getGroupsDummy() {
    const result = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${getToken()}` },
        url: 'http://localhost:3000/private/users',
        params: { username: "bolin"}
    });
    //console.log("Results from getGroups Call");
    console.log(result);
    //console.log(result.data.result);
    return result.data.result;
};*/