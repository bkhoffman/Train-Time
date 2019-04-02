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
  var firstTrainTime = "";
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
    //clears out input fields after submit
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
  });

  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val())
    console.log(snapshot.val().trainName)
    console.log(snapshot.val().destination)
    console.log("first train time: ", snapshot.val().firstTrainTime)
    console.log("frequency of train: ", snapshot.val().frequency)

    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("firstTime Converted: ", firstTimeConverted);

    var currentTime = moment(); //returns time object, need to format
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);
    var tRemainder = timeDiff % frequency;
    console.log("time remainder: ", tRemainder);
    var minUntilTrain = frequency - tRemainder;
    console.log("mins till next train: ", minUntilTrain);
    var nextTrain = moment().add(minUntilTrain, "minutes").format("LT");
    console.log("Next train time: ", nextTrain);

    var newTrainRow = $("<tr>")
    var trainNameCell = $("<td>").text(snapshot.val().trainName)
    var destinationCell = $("<td>").text(snapshot.val().destination)
    var frequencyCell = $("<td class = numCol>").text(snapshot.val().frequency)
    var nextTrainTimeCell = $("<td class = numCol>").text(nextTrain)
    var minutesAwayCell = $("<td class = numCol>").text(minUntilTrain)

    newTrainRow.append(trainNameCell, destinationCell, frequencyCell, nextTrainTimeCell, minutesAwayCell); //add Next Train Time and Minutes Away
    $(".table tbody").append(newTrainRow);
  });


