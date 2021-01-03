var firebaseConfig = {
  apiKey: "AIzaSyDN2nKCD1WAt2GCuBr0kHO2CSzzbLS9GTs",
  authDomain: "quizshooter-1a420.firebaseapp.com",
  databaseURL: "https://quizshooter-1a420-default-rtdb.firebaseio.com",
  projectId: "quizshooter-1a420",
  storageBucket: "quizshooter-1a420.appspot.com",
  messagingSenderId: "318275595539",
  appId: "1:318275595539:web:eafdbb4bdb131dd85f7ee6",
  measurementId: "G-45Q4K7GFZZ"
};

var init = firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var question = [];
var answer = [];
var correctAnswer = [];

database.ref('question').on('value', function(snapshot) {
  snapshot.forEach(function(child){
    question.push(child.val());
  });
});

database.ref('answer').on('value', function(snapshot) {
  snapshot.forEach(function(child){
    let temp = [];
    child.forEach(function(child){
      temp.push(child.val());
    });
    answer.push(temp);
  });
});

database.ref('correctAnswer').on('value', function(snapshot) {
  snapshot.forEach(function(child){
    correctAnswer.push(child.val());
  });
});