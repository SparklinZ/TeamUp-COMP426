$(document).ready(async () => {
    $('#homePage').append(renderHomePage());
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
    $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data,
    }).then((res) => {
        $message.html(`<span class="has-text-success">Success! You are now logged in.</span>`);
        // Store the jwt token from the response to use it later on for authorization 
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('name', res.name);
        handleRenderGroupPage();
        // Call the rerenderFunction (to be written) to show GroupPage including a logoff button in navbar
        //rerender();
        /* This is just parked here. To access the stored token use this line 
        let jwt = localStorage.getItem('jwt'); 
        and put it then into an authorization bearer header*/

        // TO DO: put replace/ rerender call here (e.g. wall page with log out user button)
        // window.location.replace("http://localhost:3000/index.html")
    }).catch(() => {
        $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    });
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
    let $message = $('#message');
    // console.log(formData);
    // $.ajax({
    //     url: 'http://localhost:3000/account/create',
    //     type: 'POST',
    //     data,
    //     // xhrFields: {
    //     //     withCredentials: true,
    //     // },
    // }).then((res) => {
    //     logInRequest(data);
    //     accountDataCreate(data);
    // }).catch((res) => {
    //     $message.html('<span class="has-text-danger">Something went wrong and you were not signed up.</span>');
    // });

    try {
         await $.ajax({
        url: 'http://localhost:3000/account/create',
        type: 'POST',
        data,
        // xhrFields: {
        //     withCredentials: true,
        // },
    }) ;
        logInRequest(data);
        accountDataCreate(data);
    } catch (error) {
        console.log(error)
        $message.html('<span class="has-text-danger">Something went wrong and you were not signed up.</span>');
    } 

}

async function accountDataCreate(data) {
    let $message = $('#message');
    axios
        .post(`http://localhost:3000/private/users/${data.name.toLowerCase().split('.')}`, {
            data: {
                'firstname': data.firstName,
                'lastname': data.lastName,
                'email': data.email,
                'gender': data.gender,
                'year': data.year,
                'bio': data.bio,
                'major': data.major,
                'skills': data.skills,
            }
        },
            { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } },
        )
        .then(res => console.log(res))
        .catch(err => {
            console.log(err);
            $message.html('<span class="has-text-danger">Something went wrong when store the info.</span>');
        }
        ).then();
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
    console.log(result.data.result);
    return result.data.result;
};



// render group page
function renderGroupPage() {
    $("#welcome").html(`Welcome,<a onclick="handleRenderUserPage()">${localStorage.getItem('name')}</a>!`);
    $("#groupPage").append(`<div class="background"></div>
    <div class="container"> 
        <p class="text">Team up with someone today!</p>
        <!-- create group form -->
        <form  class="form-horizontal" role="form" id="createGroupForm" >    
            <div class="form-row">
                <div class="col form-group">
                    <label>Group Name</label>   
                    <input type="text" class="form-control" name="groupName">
                </div> <!-- form-group end.// -->
            
            <div class = "col form-group">
                    <label>Maximum Capacity</label>
                    <select id="inputGender" class="form-control" name="maxCapacity">
                    <option> Choose...</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </select>
                </div> <!-- form-group end.// -->
            </div>

            <div class="form-row">
                <div class="form-group">
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="createGroupButton">Create Group</button>
                </div> <!-- form-group// -->       
            </div>
        </form>



        <!-- group cards to be inserted dynamically -->
        <div id="groups"> </div>`)

    $("#groups").append(renderGroupCard());

}

// group card
function renderGroupCard(group) {
    return `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h1 class="card-title bold">Hello World</h1>
  <p class="card-text" style="text-align:center;">Max Capacity 3</p>
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">Bolin Zhu</li>
  <li class="list-group-item">Molly Zhong</li>
  <li class="list-group-item">Max Barth</li>
</ul>
<div class="card-body">
  <button href="#" class="btn btn-primary btn-lg btn-block" id="joinGroupButton">Join</button>
</div>
</div>
      </div>`
}

// render student page
async function getUserData(name){
    try {
    const res = await $.ajax({
        url: `http://localhost:3000/private/users/${name}`,
        type: 'GET',
        headers:{ Authorization: `Bearer ${getToken()}` }
    })
        return res.result;

    } catch(error){
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

                    <li class="list-group-item">Proposal due October 12th <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</button></li>
                    
                    <li class="list-group-item">Mockup due October 31st <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>

                    <li class="list-group-item">15% Video due December 10th <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>

                    <li class="list-group-item">15% Presentation/Expo due December 12th<button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>

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

function renderOwnStudentCard(student) {
    //console.log(student);
    //console.log(student.bio);
    return `<div class="col" id="ownCard">
    <div class="card" style="width: 20rem; margin-top:1rem">
        <div class="card-body">
        <h5 class="card-title lead"> <img class="mr-3 rounded resizeImg" src="icon/avatar.png" alt="Avatar"> My Profile </h5>
        <p class="card-text" id = "ownBio">${student.bio}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Gender: <i class="fa fa-mars fa-lg"></i></li>
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
        $('#userPage').prepend(renderOwnEditStudentCard(result));
     } catch (error) {
         console.log(error);
         result = error;
     }  
    
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
        <h5 class="card-title lead"><img class="mr-3 rounded resizeImg" src="icon/avatar.png" alt="Avatar"> My Profile </h5>
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
    for (var student in students) {
        //console.log("student in loop");
        //console.log(student);
        if (counter === 0) {
            $("#students").append(`<div class="row">${renderStudentCard(students[student])}</div>`);
            counter = counter + 1;
            //console.log(0);
        }
        else {
            if (counter === 1) {
                $(".row").append(renderStudentCard(students[student]));
                counter = counter + 1;
                //console.log(1);
            } else {
                if (counter === 2) {
                    $(".row").append(renderStudentCard(students[student]));
                    counter = 0;
                    //console.log(2);
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
                <a href="#" class="card-link">Email</a>
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
function handleRenderGroupPage(res) {
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
    $('#groupPage').append(renderGroupPage(res));


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

function handleRenderUserPage() {
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

const setToken = (jwtToken) => {
    token = jwtToken;
    localStorage.setItem('jwt', token);
}
