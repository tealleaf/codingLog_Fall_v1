$(document).ready(function(){

  // $('form').on('submit', function(event){

  //     console.log(event);
  //     var item = $('form input');
  //     var todo = {item: item.val()};

  //     $.ajax({
  //       type: 'POST',
  //       url: '/todo',
  //       data: todo, //passingn this to backend.
  //       success: function(data){
  //         //do something with the data via front-end framework
  //         let stringData = JSON.stringify(data);
  //         console.log(`I worked! Here is the data: ${stringData}`);
  //         // location.reload();
  //       }

        
  //     });

  //     return false;
      
  // });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
        }
      });
  });

  $('#testButton').on('click', ()=>{
    console.log("I've been clicked!");

    $.ajax({
      type: 'POST',
      url: '/',
      success: function(data){
        console.log(typeof(data.stuff1));

        listStuff(data.stuff1);
        //do something with the data via front-end framework
      }
    });

  });

function listStuff(stuffList) {
  console.log('appending!!!');
  $("#listOutput").append(`<p>${stuffList}</p>`);
};

/* Le test in le Laboratory */

$('#getRequestBtn').on('click', ()=>{
  alert(`I've been clicked!`);

  // $.ajax({
  //   type: 'POST',
  //   url: "php/query.php",
  //   data: {
  //     //username_register: username_register
  //   },
  //   beforeSend: function(){ //loading bar
  //     // $('#register_notification').empty().append(`
  //     //   <div class="progress">
  //     //     <div class="indeterminate"></div>
  //     //   </div>`);
  //   },
  //   complete: function(){
  //     // $('#register_notification').remove();
  //     // $('#username_validation').text("Completed but no success.");
  //     //Y U IN THE WAY COMPLETE, I CAN'T GET SUCCESS TO WORK WITH SOMETHING HERE
  //   },
  //   success: function(data) {
      
  //     //var register_status = JSON.stringify(data);
      
  //   },
  //   timeout: 2000,
  //   error: function(data){
  //     // $('#register_notification').empty().text("I'm sorry, but there seems to have been an error. Please try again later");
  //   }
  // }); //end AJAX

});



});

/* AJAX REFERENCE */
// $.ajax({
//   type: 'POST',
//   url: "php/query.php",
//   data: {
//     //username_register: username_register
//   },
//   beforeSend: function(){ //loading bar
//     // $('#register_notification').empty().append(`
//     //   <div class="progress">
//     //     <div class="indeterminate"></div>
//     //   </div>`);
//   },
//   complete: function(){
//     // $('#register_notification').remove();
//     // $('#username_validation').text("Completed but no success.");
//     //Y U IN THE WAY COMPLETE, I CAN'T GET SUCCESS TO WORK WITH SOMETHING HERE
//   },
//   success: function(data) {
    
//     //var register_status = JSON.stringify(data);
    
//   },
//   timeout: 2000,
//   error: function(data){
//     // $('#register_notification').empty().text("I'm sorry, but there seems to have been an error. Please try again later");
//   }
// }); //end AJAX

