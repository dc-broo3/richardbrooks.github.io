/*
	Mind maps (Science, Publications and Talks): clicking a bubble shows its topic
	panel and hides the others. Panels stay visible if JavaScript is unavailable.
*/

Array.prototype.forEach.call(document.querySelectorAll('#main .mindmap'), function(map) {

	var nodes = Array.prototype.slice.call(map.querySelectorAll('.node')),
		topics = nodes.map(function(node) {
			return document.getElementById(node.getAttribute('aria-controls'));
		});

	function show(index) {

		nodes.forEach(function(node, i) {
			var open = (i === index);

			node.setAttribute('aria-expanded', open ? 'true' : 'false');
			topics[i].hidden = !open;
		});

		if (index > -1)
			topics[index].scrollIntoView({ behavior: 'smooth', block: 'start' });

	}

	show(-1);

	nodes.forEach(function(node, i) {
		node.addEventListener('click', function() {
			show(node.getAttribute('aria-expanded') === 'true' ? -1 : i);
		});
	});

	topics.forEach(function(topic) {
		topic.querySelector('.back-to-map').addEventListener('click', function() {
			map.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	});

});
