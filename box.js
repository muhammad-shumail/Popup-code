function drawBox(wall_width, wall_height, image_width, image_height) {
  // image_width = 1024;
  // image_height = 682;
  let image_aspect_ratio = image_width / image_height;

  // wall_width = 173;
  // wall_height = 108;
  let wall_aspect_ratio = wall_width / wall_height;

  if (wall_aspect_ratio <= image_aspect_ratio) {
    // subtract width
    let s = wall_aspect_ratio * image_height - image_width;
    // wall_width = image_width - s;
    let start_x = Math.abs(s / 2);
    let start_y = 0;
    let width_of_box = image_width + s;
    let height_of_box = image_height;
    console.log(wall_width, wall_height, [start_x, start_y, width_of_box, height_of_box]);
    return [start_x, start_y, width_of_box, height_of_box];
  } else {
    // subtract height
    let s = image_width / wall_aspect_ratio - image_height;
    let start_x = 0;
    let start_y = Math.abs(s / 2);
    let width_of_box = image_width;
    let height_of_box = image_height + s;
    console.log(wall_width, wall_height, [start_x, start_y, width_of_box, height_of_box]);
    return [start_x, start_y, width_of_box, height_of_box];
  }
}

function updateCropper() {
  let wall_width = parseFloat(document.getElementById('dataWidthCM').value);
  let wall_height = parseFloat(document.getElementById('dataHeightCM').value);
  // let image_width = document.getElementById('image').naturalWidth;
  // let image_height = document.getElementById('image').naturalHeight;


  let image_width = parseInt(document.getElementById('image').cropper.canvas.style.width.replace('px', ''))
  let image_height = parseInt(document.getElementById('image').cropper.canvas.style.height.replace('px', ''))
  console.log(wall_width, wall_height, image_width, image_height);

  let box = drawBox(wall_width, wall_height, image_width, image_height);
  cropper.cropper('setCropBoxData', {
    left: box[0],
    top: box[1],
    width: box[2],
    height: box[3]
  });
}

// Initialize the cropper with default values
let wall_width = parseFloat(document.getElementById('dataWidthCM').value);
let wall_height = parseFloat(document.getElementById('dataHeightCM').value);
let image_width = document.getElementById('image').naturalWidth;
let image_height = document.getElementById('image').naturalHeight;

let box = drawBox(wall_width, wall_height, image_width, image_height);
let cropper = $('#image').cropper({
  aspectRatio: box[2] / box[3],
  crop: function (event) {
    // console.log(event.detail.x);
    // console.log(event.detail.y);
    // console.log(event.detail.width);
    // console.log(event.detail.height);
    // console.log(event.detail.rotate);
    // console.log(event.detail.scaleX);
    // console.log(event.detail.scaleY);
  }
});

// Attach onchange event to input fields
document.getElementById('dataWidthCM').addEventListener('change', updateCropper);
document.getElementById('dataHeightCM').addEventListener('change', updateCropper);