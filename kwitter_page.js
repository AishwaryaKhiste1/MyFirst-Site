//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyB_cSTLnrEN_8iyHQlIgBBghoFfWBFfHuA",
      authDomain: "class-94-c25e5.firebaseapp.com",
      databaseURL: "https://class-94-c25e5-default-rtdb.firebaseio.com",
      projectId: "class-94-c25e5",
      storageBucket: "class-94-c25e5.appspot.com",
      messagingSenderId: "287070725480",
      appId: "1:287070725480:web:c7bb9c08905760b2a0a2dd"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

    function send(){
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                like:0
          });
          document.getElementById("msg").value="";
    }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
//name_with_tag = "<h4>"+ name +"<img src = 'tick.png' class='user_tick'></h4>";
//message_with_tag = "<h4 class='message_h4'>"+message + "</h4>";
//like_button = "<button class= 'btn btn-warning' value="+like+"id="+firebase_message_id+ " onclick='updatelike(this.id)'>";
//span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+like + "</span></button><hr>";

//row = name_with_tag + message_with_tag + like_button + span_with_tag;
row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updatelike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";       
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
      function updatelike(message_id){
            console.log("clicked on like-button-"+message_id);
            button_id = message_id;
            likes = document.getElementById(button_id).value;
            update_likes = Number(likes)+ 1;
            console.log(update_likes);

            firebase.database().ref(room_name).child(message_id).update({
                  like : update_likes,
            });
      }

getData();

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location.replace("kwitter.html");
}
