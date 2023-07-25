
// // function cropperBox() {
// //   console.log('ready function');
// //   // Get the value that determines how many border lines to draw
// //   let value = 1 // This can be changed);

// //   // Get the original crop box data
// //   let original_box_left = cropper.cropper('getCropBoxData').left;
// //   let original_box_top = cropper.cropper('getCropBoxData').top;
// //   let original_box_width = cropper.cropper('getCropBoxData').width;
// //   let original_box_height = cropper.cropper('getCropBoxData').height;

// //   // Calculate the width and height of each border line
// //   let border_width = original_box_width / value;
// //   let border_height = original_box_height / value;

// //   console.log(`border_width: ${border_width} border_height: ${border_height}`)

// //   // Loop through the value and create multiple crop boxes horizontally
// //   for (let i = 0; i < value; i++) {
// //     // Loop through the value and create multiple crop boxes vertically
// //     for (let j = 0; j < value; j++) {
// //       // Create a new crop box with smaller size and offset
// //       let new_box = {
// //         left: original_box_left + i * border_width,
// //         top: original_box_top + j * border_height,
// //         width: border_width,
// //         height: border_height
// //       };

// //       // Set the new crop box data
// //       cropper.cropper('setCropBoxData', new_box);

// //       // Move the new crop box to the center of the image
// //       cropper.cropper('moveTo', image_width / 2, image_height / 2);
// //     }
// //   }

// // }


// console.log('deffer.js loaded');

// let userValue = parseFloat(document.getElementById('dataWidthCM').userValue);


// function drawGridLines() {
//   let userValue = userValue;
//   let premiumPackage = 80;

//   let calcValue = Math.round(userValue / premiumPackage);
//   let original_box_left = cropper.cropper('getCropBoxData').left;
//   let original_box_width = cropper.cropper('getCropBoxData').width;

//   let gridline = Math.round(original_box_width / calcValue);
//   console.log('calcValue', calcValue, gridline);
//   let f = 0;
//   for (let i = 0; i < calcValue; i++) {


//     $(document.getElementsByClassName('cropper-view-box')).append(`<span class="cropper-dashed dashed-v" style="left:${f}px;width:${gridline}px"></span>`);

//     f = f + gridline;

//   }

// }

