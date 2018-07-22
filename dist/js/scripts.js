// variables
const email  = 'stevenzimmer@gmail.com';
const getUrl = 'http://quip-todos.herokuapp.com/get_todos?email=' + email;
const addUrl = 'http://quip-todos.herokuapp.com/add_todo';
const completedUrl 	= 'http://quip-todos.herokuapp.com/mark_completed';


const createCheckBox = (resp) => {
	const inputWrapper = `
		<div data-id="${resp.id}" class="input-checkbox-wrapper input-wrapper display-flex display-flex-align-center">
			<div class="input-checkbox display-flex display-flex-align-center display-flex-justify-center">
				<div class="input-checkbox-checkmark">
					<span>&#10004;</span>
				</div>
			</div>
			<div class="input-checkbox-label">
				<p>${resp.text}</p>
			</div>
		</div>`;

	$(inputWrapper).insertAfter('#inputTextFirst');
}

// function to RETRIEVE to do list items
const todoGet = () => {
	$.ajax({
		type: 'GET',
		url: getUrl,
		async: false,
		success: function (data) {

			$.each(data, function(index, response ) {

				if (!response.completed) {
					createCheckBox(response);
				}

			});
		}
	});
}

todoGet();


// function to ADD to do list items
const todoAdd = () => {

	$('#inputButton').on('click', function(e) {

		let data = {
			text: $('#inputText').val(),
			email: email,
		}

		$.ajax({
			type: "post",
			url: addUrl,
			data: data,
			success: function(response) {
				createCheckBox(response);
				$('#inputText').val('');
			}
		});
	});
}

todoAdd();

// function to CHECK OFF to do list items
const todoComplete = () => {

	$(document).on('click', '.input-checkbox-wrapper', function(e) {
		e.preventDefault();
		$(this).toggleClass('checked');

		let completed = false;

		if ( $(this).hasClass('checked') ) {
			completed = true;
		}


		$.ajax({
			type: 'post',
			url: completedUrl,
			data: {
				email: email,
				id: $(this).data('id'),
				completed: completed
			}
		});

	});
}

todoComplete();

