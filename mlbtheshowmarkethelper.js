$("#addButton").click(
	function () {

		var name = document.getElementById("name").value;
		var buy = Number(document.getElementById("buy").value);
		var sell = Number(document.getElementById("sell").value);
		var margin = Number(document.getElementById("margin").value);
		var taxes = document.getElementById("includeTax").checked;
		var buyOrder = document.getElementById("buyOrder").checked;
		var sellOrder = document.getElementById("sellOrder").checked;

		var tableRowId = "rowFor" + name.replace(/\s+/g, "");
		var midPoint;
		var markup;
		var discount;
		var targetBuy;
		var targetSell;
		var newTableRow;

		if (buyOrder === true && sellOrder === true) { //Calculate a spread between the highest buy and lowest sell order.

			if (name === "") {
				alert("Name is required.");
				return;
			}

			if (typeof (buy) != "number") {
				alert("Buy is required and must be a number.");
				return;
			}

			if (typeof (sell) != "number") {
				alert("Sell is required and must be a number.");
				return;
			}

			if (typeof (margin) != "number") {
				alert("Margin is required and must be a number.");
				return;
			}

			if (taxes === true)
				margin = margin + 10;

			midPoint = sell - ((sell - buy) / 2);
			markup = 1 + (margin / 200);
			discount = 1 - (margin / 200);
			targetBuy = Math.round(midPoint * discount);
			targetSell = Math.round(midPoint * markup);

			newTableRow = "<tr id='" + tableRowId + "'>" +
				"<td>" + name + "</td>" +
				"<td>" + targetBuy + "</td>" +
				"<td>" + targetSell + "</td>" +
				"<td class=\"btn btn-primary\" onclick=\"$(\'#" + tableRowId + "\').remove();\">Remove</td>";

			$("#listOfTransactions").append(newTableRow);
		}
		else if (buyOrder === true) { //Calculate a buy order with the margin. Ignore taxes.

			if (name === "") {
				alert("Name is required.");
				return;
			}

			if (typeof (buy) != "number") {
				alert("Buy is required and must be a number.");
				return;
			}

			if (typeof (margin) != "number") {
				alert("Margin is required and must be a number.");
				return;
			}

			markup = 1 + (margin / 100);
			targetBuy = Math.round(buy * markup);
			targetSell = "";

			newTableRow = "<tr id='" + tableRowId + "'>" +
				"<td>" + name + "</td>" +
				"<td>" + targetBuy + "</td>" +
				"<td>" + targetSell + "</td>" +
				"<td class=\"btn btn-primary\" onclick=\"$(\'#" + tableRowId + "\').remove();\">Remove</td>";

			$("#listOfTransactions").append(newTableRow);
		}
		else if (sellOrder === true) { //Calculate a sell order with the margin. Include taxes.

			if (name === "") {
				alert("Name is required.");
				return;
			}

			if (typeof (sell) != "number") {
				alert("Sell is required and must be a number.");
				return;
			}

			if (typeof (margin) != "number") {
				alert("Margin is required and must be a number.");
				return;
			}

			discount = 1 - (margin / 100);
			targetBuy = "";
			targetSell = Math.round(sell * discount);

			newTableRow = "<tr id='" + tableRowId + "'>" +
				"<td>" + name + "</td>" +
				"<td>" + targetBuy + "</td>" +
				"<td>" + targetSell + "</td>" +
				"<td class=\"btn btn-primary\" onclick=\"$(\'#" + tableRowId + "\').remove();\">Remove</td>";

			$("#listOfTransactions").append(newTableRow);
		}
	}
);