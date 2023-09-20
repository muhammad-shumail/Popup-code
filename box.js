function drawBox(wall_width, wall_height, image_width, image_height) {
  // image_width = 1024;
  // image_height = 682;
  let image_aspect_ratio = image_width / image_height;

  // wall_width = 173;
  // wall_height = 108;
  let wall_aspect_ratio = wall_width / wall_height;

  if (wall_aspect_ratio <= image_aspect_ratio) {
    // subtract width
    let s = (wall_aspect_ratio * image_height) - image_width;
    // wall_width = image_width - s;
    let start_x = Math.abs(s / 2);
    let start_y = 0;
    let width_of_box = image_width + s;
    let height_of_box = image_height;
    console.log(wall_width, wall_height, [start_x, start_y, width_of_box, height_of_box]);
    return [start_x, start_y, width_of_box, height_of_box];
  }
  // subtract height
  let s = (image_width / wall_aspect_ratio) - image_height;
  let start_x = 0;
  let start_y = Math.abs(s / 2);
  let width_of_box = image_width;
  let height_of_box = image_height + s;
  console.log(wall_width, wall_height, [start_x, start_y, width_of_box, height_of_box]);
  return [start_x, start_y, width_of_box, height_of_box];

}

// let checked = $('#rollGuides').prop('checked');

function drawGridLines(wall_width, rollValue) {
  let userValue = wall_width;
  let premiumPackage = rollValue;

  console.log('userValue', userValue);
  console.log('premiumPackage', premiumPackage);

  let calcValue = Math.round(userValue / premiumPackage);
  let original_box_width = cropper.cropper('getCropBoxData').width;

  let gridline = Math.round(original_box_width / calcValue);
  console.log('calcValue', calcValue, gridline);
  let lines = 0;

  // Remove all the existing grid lines
  $('.line-data').empty();

  // Create the grid lines based on the new value
  console.log("calcValue = ", calcValue)

  if (calcValue <= 1) {
    for (let i = 0; i < calcValue; i++) {
      $('.line-data').append(`<span class="cropper-dashed dashed-v" style="left:${lines}px;width:${gridline}px"></span>`);
      lines = lines + gridline;
    }

    // Check if the checkbox value is true
    if ($('#rollGuides').prop('checked')) {
      // Show the grid lines
      $('.line-data').show();
    } else {
      // Hide the grid lines
      $('.line-data').hide();
    }
  }

  else {
    for (let i = 0; i < calcValue - 1; i++) {
      $('.line-data').append(`<span class="cropper-dashed dashed-v" style="left:${lines}px;width:${gridline}px"></span>`);
      lines = lines + gridline;
    }

    // Check if the checkbox value is true
    if ($('#rollGuides').prop('checked')) {
      // Show the grid lines
      $('.line-data').show();
    } else {
      // Hide the grid lines
      $('.line-data').hide();
    }
  }


}

// Attach an event handler to the checkbox to update the grid lines when it changes
$(document).on('change', '#rollGuides, input[name="roll"]', function () {
  // Get the wall width value
  let wall_width = parseFloat(document.getElementById('dataWidthCM').value);
  let rollValue = parseInt($('input[name="roll"]:checked').val());
  // Update the grid lines with the wall width value
  drawGridLines(wall_width, rollValue);
});



function updateCropper() {
  let wall_width = parseFloat(document.getElementById('dataWidthCM').value);
  let wall_height = parseFloat(document.getElementById('dataHeightCM').value);
  // let image_width = document.getElementById('image').naturalWidth;
  // let image_height = document.getElementById('image').naturalHeight;

  // let image_width = parseInt(document.getElementById('image').cropper.canvas.style.width.replace('px', ''))
  // let image_height = parseInt(document.getElementById('image').cropper.canvas.style.height.replace('px', ''))
  let image_width = parseInt(document.getElementsByClassName('cropper-bg')[0].style.width.replace('px', ''))
  let image_height = parseInt(document.getElementsByClassName('cropper-bg')[0].style.height.replace('px', ''))
  console.log(wall_width, wall_height, image_width, image_height);

  let box = drawBox(wall_width, wall_height, image_width, image_height);

  cropper.cropper('setCropBoxData', {
    left: box[0],
    top: box[1],
    width: box[2],
    height: box[3]
  });

  drawGridLines(wall_width);
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

// cropper bootstrap modal reintializing
$('#wallpaperModal').on('shown.bs.modal', function () {
  cropper.cropper('destroy');
  cropper = $('#image').cropper({
    aspectRatio: box[2] / box[3],
    crop: function (event) {
      // console.log(event.detail.x);}
    }
  });
});



// Attach onchange event to input fields
document.getElementById('dataWidthCM').addEventListener('change', updateCropper);
document.getElementById('dataHeightCM').addEventListener('change', updateCropper);



// document.getElementById('dataWidthCM').addEventListener('change', drawGridLines);





$(document).ready(function () {

  let rollValue = 53;
  let productPrice = 12.99;
  let widthValue = $('#dataWidthCM').val();
  let heightValue = $('#dataHeightCM').val();
  let setProductPrice = $('#price').text(String(productPrice));
  let selectedPackage = null;

  const wallpaperMaterials = [
    {
      id: 'ErurtPro',
      name: 'Variovlies (ErurtPro®)',
      minWidth: 40,
      maxWidth: 1000,
      minHeight: 40,
      maxHeight: 1000,
      price: 19.95
    },
    {
      id: 'AirtexPro',
      name: 'Seamless (AirtexPro®)',
      minWidth: 40,
      maxWidth: 20000,
      minHeight: 40,
      maxHeight: 494,
      price: 26.95
    },
    {
      id: 'MultitexPro',
      name: 'Seamless (MultitexPro®)',
      minWidth: 40,
      maxWidth: 291,
      minHeight: 40,
      maxHeight: 1200,
      price: 30.95
    }
  ];

  function validateInput(width_min, width_max, height_min, height_max) {
    let width = parseFloat($('#dataWidthCM').val()) || 0;
    let height = parseFloat($('#dataHeightCM').val()) || 0;

    // $('input[name="width"]').val(width);
    // $('input[name="length"]').val(height);
    // Check if the values are below the minimum or above the maximum

    // $('input[name="package"]:first').prop('checked', true);
    $('input[name="width"]').val(width);
    $('input[name="length"]').val(height);


    if (width < width_min || width > width_max || height < height_min || height > height_max) {
      // Show a nice message to the user
      const errorMessage = `The value is not allowed. Please enter a value between <span class="fw-bold">${width_min}</span> and <span class="fw-bold">${width_max}</span> cm for width, and between <span class="fw-bold">${height_min}</span> and <span class="fw-bold">${height_max}</span> cm for height.`;
      $('#message').html(errorMessage).addClass('text-danger').show();
    } else {
      $('#message').hide();
    }
  }

  // Set the selectedPackage when a wallpaper is checked
  $(document).on("change", "input[name='wallpaper']", function () {
    $("input[name='wallpaper']").not(this).prop("checked", false);
    var value = $(this).val();
    selectedPackage = wallpaperMaterials.find(item => item.id === value);
    const packageIndex = wallpaperMaterials.indexOf(selectedPackage);

    console.log(`default package index is ${packageIndex}`);

    // Select the radio button with the index and set it to checked
    $(`input[name="package"]:eq(${packageIndex})`).prop('checked', true);

    // Trigger the change event
    $('input[name="package"]').trigger('change');
    updateTotalPrice();
  });

  // defaul package is the first one
  $(`input[name="package"]:eq(0)`).prop('checked', true);


  $(document).on("change", "input[name='roll']", function () {
    $("input[name='roll']").not(this).prop("checked", false);
    var value = $(this).val();
    rollValue = value;
    if (rollValue == 53) {
      $('#roll-message').html('(53cm per roll)');
    } else if (rollValue == 70) {
      $('#roll-message').html('(70cm per roll)');
    }
    updateTotalPrice();
  });

  function calculateTotalPrice(width, height) {
    // If selectedPackage is not defined, default to the first material in the array
    if (!selectedPackage) {
      selectedPackage = wallpaperMaterials[0];
    }

    // Calculate the total price based on the given width, height, and selectedPackage's price
    const totalPrice = (width * height) * 0.0001 * selectedPackage.price;

    // Convert the totalPrice to a string with two decimal places
    return totalPrice.toFixed(2);
  }


  function updateTotalPrice() {
    const width = parseFloat($('#dataWidthCM').val()) || 0;
    const height = parseFloat($('#dataHeightCM').val()) || 0;
    const selectedPackageId = $('input[name="wallpaper"]:checked').val();
    const selectedPackageInfo = wallpaperMaterials.find(item => item.id === selectedPackageId);

    if (selectedPackageInfo) {
      validateInput(selectedPackageInfo.minWidth, selectedPackageInfo.maxWidth, selectedPackageInfo.minHeight, selectedPackageInfo.maxHeight);
    }

    const totalPrice = calculateTotalPrice(width, height);
    $('#price').text(totalPrice);

  }

  // Initialize total price by calling updateTotalPrice on page load
  // updateTotalPrice();

  $('#dataWidthCM, #dataHeightCM').on('change', updateTotalPrice);


  // $('single_add_to_cart_button').on('click', function () {

  // });


  $('.personaliseer-wrapper').html('<a href="#test" target="_self" class="button primary personaliseer-knop" data-mdb-toggle="modal" data-mdb-target="#wallpaperModal"><span>Personaliseer</span></a>')

});

function add_me_tocart() {
  $('input[name="package"]').trigger('change');
  const form = jQuery('form.cart');
  form.find('.single_add_to_cart_button').trigger('click');
}