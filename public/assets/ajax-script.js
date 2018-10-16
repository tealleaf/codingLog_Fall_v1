$(document).ready(function(){

  /* POST METHOD */
  $('#post-test-form').on('submit', function(event){

      //prevent refresh of submit event
      event.preventDefault();

      //Extract form input values
      let goal_input = $("input[name*='goal_input']");
      let time_coded_input = $("input[name*='time_coded_input']");

      console.log(`This is item: ${goal_input.val()} and ${time_coded_input.val()}`);

      let logged_items = 
      {
        goal: goal_input.val(),
        timeCoded: time_coded_input.val(),
        date: new Date()
      };

      $.ajax({
        type: 'POST',
        url: '/',
        data: logged_items, //passingn this to backend.
        success: function(data){
          //do something with the data via front-end framework
          let stringData = JSON.stringify(data);
          alert(`${stringData}`);
        }
      });
  });

  //if Save is hit, reads if it's valid data, if so save and restore buttons, if not error and keeps form current state
  /* PUT METHOD */
  //would be nice to check if there is any changes to make before updating.
  $(`[id^="save-entry-"]`).on('click', (event) => { //selects any element with the id
    
    //grabs id of button or row ID
    let button_id = event.target.id.substring(11);

    console.log(button_id);

    let goal_input_update = $(`#goal-textbox-input-${button_id}`).val();
    let timeCoded_input_update = $(`#timeCoded-textbox-input-${button_id}`).val();

    console.log(timeCoded_input_update);

    let update_changes = 
    {
      id: button_id,
      goal: goal_input_update,
      timeCoded: timeCoded_input_update,
      date: new Date()
    };

    $.ajax({
      type: 'PUT',
      url: '/',
      data: update_changes, //passingn this to backend.
      success: function(data){
        //do something with the data via front-end framework
        let stringData = JSON.stringify(data);
        alert(`${stringData}`);
      }
    });

  });

}); //end doc ready





/* DELETE METHOD */
/* Delete button */
$(document).on('click', '[id^="delete-entry-"]', (event) =>{
    console.log('WHO AM I');
    console.log(event.target.id); //I wonder why this.id didn't work? Or attr('id')?

    console.log('This is after regex: ' + event.target.id.substring(13));
    let delete_item = 
    {
      id: event.target.id.substring(13) //grabs id number or substring of whole id
    }

    $.ajax({
      type: 'DELETE',
      url: '/',
      data: delete_item,
      success: function(data){
        alert(data);
      }
    });
});

/* PUT METHOD on edit click*/
/* edit button */
$(document).on('click', '[id^="edit-entry-"]', (event) => {
    console.log('WHO AM I');
    console.log(event.target.id.substring(11)); //I wonder why this.id didn't work? Or attr('id')?

    let button_id = event.target.id.substring(11);
    // UI EVENTS //
    //selects current row with this id and change its color, while defaulting other active rows (that can be done later)
    $(`#row-${button_id}`).toggleClass('.active-row'); //add greyness

    //removes Edit icon NOTE: Can't empty because... well, after the element is removed, then what? Parent/child, parent can't be removed without child
    $(`#edit-entry-${button_id}`).toggle(); //removes delete icon

    $( `#edit-entry-${button_id}` ).toggle();

    $( `#delete-area-${button_id}` ).toggle();
    $( `#save-button-${button_id}` ).toggle();

    $( `#timeCoded-box-value-${button_id}` ).toggle();
    $( `#goal-box-value-${button_id}` ).toggle();
    $( `#goal-entry-${button_id}` ).toggle();
    $( `#timeCoded-entry-${button_id}` ).toggle();

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

