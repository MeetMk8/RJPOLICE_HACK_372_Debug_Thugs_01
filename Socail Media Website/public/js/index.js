complaintpost()
reviewpost()
// var userData={}
function complaintpost(){
    const api="http://localhost:8000/complaint";

    fetch(api).then(response=>{
        if(!response.ok){
            throw new Error("not ok");
        }
        return response.json();
    }).then(userData=>{
        console.log(userData);
       for(var i=0;i<userData.length;i++){
        display(userData[i])
       }
    }).catch(error=>{
        console.log(error)
    })

console.log("hello")
function display(userData){
    
    let post=`
    <div class="post">
    
        <div class="post_main">
           
            <div class="userdata">
                
                <p class="u-name">${userData["id"]}</p>
                    
                    <p><img class="locationimg" src="/img/location-sign-svgrepo-com.svg">${userData["district"]}</p>
                    <p><img class="locationimg" src="/img/location-sign-svgrepo-com.svg">${userData["subdistrict"]}</p>
            
            </div>
        </div>
    
    <div class="description_section">
       <h1>Description:</h1>
       <p>${userData["description"]} </p>
    </div>
    
    <div class="comment">

        
<button class="clickbtn"><img width="30" height="30" src="https://img.icons8.com/office/16/speech-bubble--v1.png" 
 alt="speech-bubble--v1"/></button>


 <div class="comment-box" style="display :none">
 <input type="text" class="commentinput" id="cmttext" placeholder="Enter Your Comment!"> <button class="commentsend btn commbtn">send</button>
 <div class="commentcontainer" id="getcomment"></div>
 
</div>         </div>
    
    
    `
    console.log(userData)
    $("#complaintpost").append(post);
    console.log("hello")
    console.log(userData["image"])
}

}


function reviewpost(){
    
const api2="http://localhost:8000/review";

fetch(api2).then(response=>{
    if(!response.ok){
        throw new Error("not ok");
    }
    return response.json();
}).then(userData=>{
    console.log(userData);
   for(var i=0;i<userData.length;i++){
    display(userData[i])
   }
}).catch(error=>{
    console.log(error)
})
var value=0;
function display(userData){
let post=`    <div class="post">

<div class="post_main">
    <div class="userdata">
            <p class="u-name">${userData["id"]}</p>                   
            <p><img class="locationimg" src="/img/location-sign-svgrepo-com.svg">pratham</p>
            <p><img class="locationimg" src="/img/location-sign-svgrepo-com.svg">${userData["subdistrict"]}</p>
    
    </div>
</div>

<div class="description_section">
<h1>Description:</h1>
<p>${userData["description"]}   </p>
</div>

<div class="comment">
    
<button class="clickbtn"><img width="30" height="30" src="https://img.icons8.com/office/16/speech-bubble--v1.png" 
 alt="speech-bubble--v1"/></button>

<div class="comment-box" style="display :none">
    <input type="text" class="commentinput" id="cmttext" placeholder="Enter Your Comment!"> <button class="commentsend btn commbtn">send</button>
    <div class="commentcontainer" id="getcomment"></div>
    
</div>  
</div>       

</div>

`

$("#reviewpost").append(post);
}
}

function switchTab(currtabId,selecttab) {
    // Hide all tabs
    var curr=document.getElementById(currtabId)
    console.log(curr)
    curr.classList.remove("active-tab")
    
    var sele=document.getElementById(selecttab)
    console.log(sele)
    sele.classList.add("active-tab")
  
    
}
// switchTab('reviewpost')


// comment box


 
$(document).on('click', '.clickbtn', function() {
    // Toggle the display of the next sibling (comment box)
    $(this).next('.comment-box').toggle();
});
$(document).on('click', '.commbtn', function() {
    // Get the textarea value
    var commentText = $(this).prev('input').val();
 console.log("hello")
    // Append the comment message to the corresponding comment-messages div
    $(this).siblings('.commentcontainer').append('<p>' + commentText + '</p>');

    // Clear the textarea
    $(this).prev('input').val('');
});


// login form
$(document).ready(function() {
    // Show login form on button click
    $('#showLoginForm').click(function() {
        $('#loginForm').show();
    });

    // Hide login form on document click outside the form
    $(document).mouseup(function(e) {
        var form = $('#loginForm');
        if (!form.is(e.target) && form.has(e.target).length === 0) {
            form.hide();
        }
    });
});

//user pass login
async function attemptLogin() {
    var api="http://localhost:8000/login"
    fetch(api).then(response=>{
        if(!response.ok){
            throw new Error("not ok");
        }
        return response.json();
    }).then(userData=>{
        console.log(userData);
        if((userData[0]["username"]==$("loginUsername").val() )&& (userData[0]["password"]==$("loginPassword").val()))
        {
         var user=`<div class="details-div">
         <p id="userlofinname">${userData[0]["username"]}</p>
         <div class="location">
             <p id="userdistrict">${userData[0]["district"]}</p>
         <p id="usersubdistrict">${userData[0]["subdistrict"]}</p>
         </div>
     </div>`   
     $(".userdetails").append(user);
        }else{
            alert("user not match")
        }
        
    }).catch(error=>{
        console.log(error)
    })
}