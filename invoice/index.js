let total = [0];
let currency = "GBP";
function changeCurrency(element) {
	currency = element.value;
	document.getElementById("total-currency").innerHTML = `Total (${currency})`;
	document.getElementById("total-due-currency").innerHTML = `${currency}`;
	total.forEach((item, index) => {
		document.getElementById(
			`item-total-currency-list-${index}`
		).innerHTML = `${currency}`;
		//document.getElementById(`item-total-list-${index}`).value = `${item}`;
	});
}
function calculateTotal(list_element) {
	let id = list_element.id.split("-")[list_element.id.split("-").length - 1];
	let itemTotal = 0;
	let quantity = document.getElementById("quantity-list-" + id).value;
	let rate = document.getElementById("rate-list-" + id).value;
	if (quantity != "" && rate != "") {
		itemTotal = quantity * rate;
		document.getElementById("item-total-list-" + id).value = itemTotal;
	}
	total[id] = itemTotal;
	let subtotal = total.reduce((a, b) => a + b, 0);
	document.getElementById("sub-total").innerText = subtotal;
	document.getElementById("vat").innerText = (subtotal * 0.2).toFixed(2);
	document.getElementById("total").innerText = (subtotal * 1.2).toFixed(2);
	document.getElementById("total-due-amount").innerText = (
		subtotal * 1.2
	).toFixed(2);
}
function addNewElement() {
	let newElement = document.createElement("div");
	newElement.className = "row m-2";
	newElement.innerHTML =
		`
		<div class="col-5 p-1">
			<textarea
				class="form-control rounded-0 rounded-top border border-secondary"
				id="items-list-` +
		total.length +
		`"
				rows="3"
				style="resize: none"
			></textarea>
			<div
				class="btn-toolbar"
				role="toolbar"
				aria-label="Toolbar with button groups"
			>
				<div
					class="btn-group me-2 w-50"
					role="group"
					aria-label="First group"
				>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
						onclick="copyToClipboard(this)"
						id="item-list-copy-0"
					>
						<i class="bi bi-clipboard"></i>
					</button>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
					>
						<i class="bi bi-calendar"></i>
					</button>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
					>
						<i class="bi bi-link-45deg"></i>
					</button>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
					>
						<i class="bi bi-tag"></i>
					</button>
				</div>
				<div
					class="btn-group ms-auto"
					style="width: 35%"
					role="group"
					aria-label="Second group"
				>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
					>
						<i class="bi bi-receipt"></i>
					</button>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
					>
						<i class="bi bi-cart2"></i>
					</button>
					<button
						type="button"
						class="btn btn-light rounded-0 rounded-bottom border border-secondary"
					>
						<i class="bi bi-archive"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="col-2 p-1">
			<input
				type="text"
				class="form-control"
				onchange="calculateTotal(this)"
				id="quantity-list-` +
		total.length +
		`"
			/>
		</div>
		<div class="col-2 p-1">
			<input
				type="text"
				class="form-control"
				id="rate-list-` +
		total.length +
		`"
				onchange="calculateTotal(this)"
			/>
			<select
				class="form-select form-select-sm w-75 mt-1 ms-auto"
				aria-label="Default select example"
				>

					<option value="pc">pc</option>
			</select>
		</div>
		<div class="col-3 p-1">
			<div class="input-group mb-auto">
				<span
					class="input-group-text bg-white border-end-0"
					id="item-total-currency-list-` +
		total.length +
		`"
					>` +
		currency +
		`</span
				>
				<input
					type="text"
					class="form-control border-start-0"
					id="item-total-list-` +
		total.length +
		`"
				/>
			</div>
		</div>
		`;
	document.getElementById("items-list").appendChild(newElement);
	document.getElementById("items-list-" + total.length).focus();
}

function copyToClipboard(element) {
	// Copy text from textarea to clipboard
	let row_id = element.id.split("-").slice(-1)[0];
	var text = document.getElementById("items-list-" + row_id).value;
	console.log(text);
	navigator.clipboard.writeText(text).then(
		function (err) {
			console.error("Could not copy text: ", err);
		},
		function () {
			console.log("Copying to clipboard was successful!");
		}
	);
}
