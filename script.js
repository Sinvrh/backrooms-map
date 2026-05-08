document.addEventListener('DOMContentLoaded', function() {
    const classColors = {
    "0": "#DBC864",
    "1": "#E7B60C",
    "2": "#DC8C00",
    "3": "#EA5500",
    "4": "#ED1501",
    "5": "#B00707",
    "X": "#696969"
};
    
    const cy = cytoscape({
        container: document.getElementById('cy'),
        elements: backroomsData,


        style:[
            {
                selector: 'node',
                style: {
                    'shape': 'rectangle',
                    'width': '100px',
                    'height': '60px', // Landscape card format
                    'background-image': function(node) {
                        return node.data('img') ? node.data('img') : 'https://files.catbox.moe/bka08y.png';
                    },
                    'background-fit': 'cover',
                    'background-image-opacity': 1,
                    'border-width': 3,
                    'border-color': '#333',
                    'label': 'data(label)',
                    'color': '#fff',
                    'text-valign': 'bottom',
                    'text-margin-y': 10,
                    'font-family': 'monospace',
                    'font-size': '10px',
                    'text-outline-width': 2,
                    'text-outline-color': '#000'
                }
            },
            {
                selector: 'node[type = "placeholder"]',
                style: {
                    'display': 'none'
                }
            },
            // Survival Class colors
            { selector: 'node[class = "0"]', style: { 'background-color': '#DBC864' } },
            { selector: 'node[class = "1"]', style: { 'background-color': '#E7B60C' } },
            { selector: 'node[class = "2"]', style: { 'background-color': '#DC8C00' } },
            { selector: 'node[class = "3"]', style: { 'background-color': '#EA5500' } },
            { selector: 'node[class = "4"]', style: { 'background-color': '#ED1501' } },
            { selector: 'node[class = "5"]', style: { 'background-color': '#B00707' } },
            { selector: 'node[class = "X"]', style: { 'background-color': '#696969' }},
            
            {
                selector: 'edge',
                style: {
                    'width': 1.5,
                    'line-color': '#bbb',
                    'target-arrow-color': '#bbb',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'arrow-scale': 1
                }
            },


            {
                selector: '.faded',
                style: {
                    'opacity': 0.15,
                    'text-opacity': 0.1, // Not zero so it's not totally invisible
                    'events': 'no' // Makes it so faded stuff can't be clicked
                }
            },
            {
                selector: 'node.highlighted',
                style: {
                    'border-width': 4,
                    'border-color': function(node) {
                        return classColors[node.data('class')] || '#fff';
                    },
                    'width': '110px',
                    'height': '70px',
                    'z-index': 999
                }
            },


            {
                selector: 'edge.highlighted',
                style: {
                    'width': 6, // Thick enough to see, not thick enough to be a flashbang
                    'line-color': '#FFD700', 
                    'target-arrow-color': '#FFD700',
                    'target-arrow-shape': 'triangle',
                    'arrow-scale': 1.5, // Reasonable arrow size
                    'line-style': 'solid',
                    'opacity': 1,
                    'z-index': 998
                }
            }
        ],


        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 100,
            roots: '#frontrooms', // The tree map starts here, at this level. Well, place
            spacingFactor: 1.75
        }
    });


    window.cy = cy; // Buttons can now talk to the global map variables


    // Now complete with click and tap logic (plus highlights)!
    cy.on('tap', 'node', function(evt) {
        const node = evt.target;
        const data = node.data();
        const bgImage = document.getElementById('bg-image-layer');
        const info = additionalInfo[data.id] || {};

        const sideMenu = document.getElementById('side-menu');


        // Update the basic info
        document.getElementById('level-name').innerText = data.label;
        document.getElementById('level-epithet').innerText = data.epithet ? `"${data.epithet}"` : "N/A";
        document.getElementById('level-class').innerText = 'CLASS ' + data.class;
        document.getElementById('level-description').innerText = data.type.toUpperCase();
        document.getElementById('level-summary').innerText = levelBlurbs[data.id] || "NO SUMMARY AVAILABLE.";
        
        // Update the reactive border + remove any old classes from before
        sideMenu.className = ''; 
        sideMenu.classList.add('class-' + data.class);


        // Update the link
        const link = document.getElementById('wiki-link');
        const authorElement = document.getElementById('level-author');
        const noSelect = document.getElementById('no-selection');
        noSelect.style.display = 'none';

        if (info.url) {
            link.href = info.url;
            link.innerText = "View Backrooms wiki page";
            link.style.textDecoration = "underline";
            link.parentElement.style.display = 'list-item';

        } else {
            link.parentElement.style.display = 'none';
            noSelect.style.display = 'block';
            link.innerText = "No level link found";
            link.href = "#";
            link.style.textDecoration = "none";
        }

        authorElement.innerText = "Author(s): " + (info.author || "Unknown");


        // Quick fade logic...
        const imgUrl = data.img ? data.img : 'https://files.catbox.moe/bka08y.png';
        
        // Fade out current image
        bgImage.classList.remove('active');


        // Wait for a split second (250ms), swap, then fade back in
        setTimeout(() => {
            bgImage.style.backgroundImage = `url(${imgUrl})`;
            bgImage.classList.add('active');
        }, 250); 


        // Highlight logic
        const neighborhoodHighlight = node.closedNeighborhood(); // This is the node + the connected lines and stuff
        cy.elements().addClass('faded').removeClass('highlighted'); // Dims everything
        neighborhoodHighlight.removeClass('faded').addClass('highlighted'); // Lights things up
    });


    // Resets the map when clicking on the background and reverts background
    cy.on('tap', function(evt) {
        if (evt.target === cy) {
            const bgImage = document.getElementById('bg-image-layer');
            const sideMenu = document.getElementById('side-menu');
            
            // Map Reset
            cy.elements().removeClass('faded').removeClass('highlighted');
            document.querySelectorAll('#control-panel button').forEach(btn => btn.classList.remove('active'));

            // Sidebar Reset
            document.getElementById('level-name').innerText = "---";
            document.getElementById('level-epithet').innerText = "---";
            document.getElementById('level-class').innerText = "---";
            document.getElementById('level-description').innerText = "---";
            document.getElementById('level-summary').innerText = "Select a level to view the level's basic summary info...";
            document.getElementById('level-author').innerText = "Author(s): ---";
            
            // Fix for the link showing "---" instead of the wiki text
            const link = document.getElementById('wiki-link');
            const noSelect = document.getElementById('no-selection');
            link.innerText = "---";
            link.href = "#";
            link.style.textDecoration = "none"; // Optional: remove underline when it's just dashes
            link.parentElement.style.display = 'list-item';
            noSelect.style.display = 'none';

            // Reset the sidebar border color
            sideMenu.className = ''; 

            // Background Reset
            bgImage.classList.remove('active');
        }
    });


    // Search bar / search database logic
    document.getElementById('level-search').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            cy.elements().removeClass('faded');
            return;
        }

        const target = cy.nodes().filter(n => 
            n.data('type') !== 'placeholder' && (
            n.data('label').toLowerCase().includes(query) || 
            (n.data('epithet') && n.data('epithet').toLowerCase().includes(query))
        )
    );

        if (target.length > 0) {
            cy.elements().addClass('faded');
            target.removeClass('faded');
            // This will zoom the camera to a specific level
            cy.animate({
                center: { eles: target },
                zoom: 1.2
            }, {
                duration: 600
            });
        }
    });
});


// Control panel toggles
function toggleType(type) {
    const cy = window.cy;
    const buttons = document.querySelectorAll('#control-panel button');
    const clickedButton = event.target; // Grabs the button clicked


    // Handle button highlights
    if (clickedButton.classList.contains('active')) {
        // If clicking an already active button, turn it off and reset map
        clickedButton.classList.remove('active');
        cy.elements().removeClass('faded').removeClass('highlighted');
        return;
    }


    // Remove active state from all buttons first
    buttons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');


    // Map Logic
    cy.elements().removeClass('faded').removeClass('highlighted');


    if (type === 'dead-end') {
        const deadEnds = cy.nodes().filter(n => n.outdegree() === 0 && n.data('type') !== 'origin');
        cy.elements().addClass('faded');
        deadEnds.removeClass('faded').addClass('highlighted');
    }
    
    if (type === 'one-way') {
        const edges = cy.edges();
        cy.elements().addClass('faded');
        edges.forEach(edge => {
            const source = edge.source().id();
            const target = edge.target().id();
            const reciprocal = cy.edges(`edge[source="${target}"][target="${source}"]`);
            if (reciprocal.length === 0) {
                edge.removeClass('faded').addClass('highlighted');
                edge.connectedNodes().removeClass('faded');
            }
        });
    }


    if (type === 'two-way') {
        const edges = cy.edges();
        cy.elements().addClass('faded');
        edges.forEach(edge => {
            const source = edge.source().id();
            const target = edge.target().id();
            const reciprocal = cy.edges(`edge[source="${target}"][target="${source}"]`);
            if (reciprocal.length > 0) {
                edge.removeClass('faded').addClass('highlighted');
                edge.connectedNodes().removeClass('faded');
            }
        });
    }
}