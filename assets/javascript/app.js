  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBzZ67a25ASUh-SF-r6yF7aYWhMZ03KBIU",
    authDomain: "traintime-6a9c4.firebaseapp.com",
    databaseURL: "https://traintime-6a9c4.firebaseio.com",
    projectId: "traintime-6a9c4",
    storageBucket: "",
    messagingSenderId: "722175774177"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firtTrainTime = "";
  var frequency = "";
  //capture value from input form
  $("#submit").click(function(event){
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#trainTime").val().trim();
    frequency = $("#trainFrequency").val().trim();
  //push to database
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    })
  });

  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val())
    console.log(snapshot.val().trainName)
    console.log(snapshot.val().destination)
    console.log(snapshot.val().firstTrainTime)
    console.log(snapshot.val().frequency)

    var newTrainRow = $("<tr>")
    var trainNameCell = $("<td>").text(snapshot.val().trainName)
    var destinationCell = $("<td>").text(snapshot.val().destination)
    var frequencyCell = $("<td>").text(snapshot.val().frequency)
    var firstTrainTimeCell = $("<td>").text(snapshot.val().firstTrainTime)
    var nextTrainTimeCell = $("<td>").text("do the math")
    var minutesAwsyCell = $("<td>").text("do the math")

    newTrainRow.append(trainNameCell, destinationCell, frequencyCell, nextTrainTimeCell, minutesAwsyCell); //add Next Train Time and Minutes Away
    $(".table tbody").append(newTrainRow);
  });


