
// add to cart
function add_me_tocart() {
  const form = jQuery('form.cart');
  form.find('.single_add_to_cart_button').trigger('click');
}

//  Set the width and height
$('input[name="width"]').val(300);
$('input[name="length"]').val(300);

// first second third select the package
$('input[name="package"]:first').prop('checked', true);

// Trigger the change event to update the price
jQuery('input[name="package"]').trigger('change');