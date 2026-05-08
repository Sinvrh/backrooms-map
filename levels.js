// Backrooms Level Data
// This contains all nodes and connections for the map
// Key: "id" is the tag, "label" is what is displayed, "class" is the survival difficulty
// and "type" is the second tag that is used on the backend. Class: X means pending/unknown
// Note for later: add urls in after everything's done

const backroomsData = [
    // THE FRONTROOMS
    { data: { id: 'frontrooms', label: 'The Frontrooms', class: '0', type: 'origin', img: 'https://files.catbox.moe/9iftck.jpg' } },
    { data: { source: 'frontrooms', target: 'level0' } }, // Frontrooms goes to Level 0... etc.

    // LEVEL 0: THRESHOLD
    { data: { id: 'level0', label: 'Level 0', epithet: 'Threshold', class: '1', type: 'numbered', img: 'https://files.catbox.moe/i3xgk9.jpg' } },
    { data: { source: 'level0', target: 'redrooms' } },
    { data: { source: 'level0', target: 'manilaroom' } },
    { data: { source: 'level0', target: 'torment' } },
    { data: { source: 'level0', target: 'level0-1' } },
    { data: { source: 'level0', target: 'level0-2' } },
    { data: { source: 'level0', target: 'level0-3' } },
    { data: { source: 'level0', target: 'level0-7' } },
    { data: { source: 'level0', target: 'level1' } },

    // RED ROOMS
    { data: { id: 'redrooms', label: 'Red Rooms', class: '3', type: 'unnumbered', img: 'https://files.catbox.moe/mmdnvz.png' } },

    // THE MANILA ROOM
    { data: { id: 'manilaroom', label: 'The Manila Room', class: '0', type: 'unnumbered', img: 'https://files.catbox.moe/d1owh3.jpg' } },
    { data: { source: 'manilaroom', target: 'level0' } },

    // THE TORMENT
    { data: { id: 'torment', label: 'The Torment', class: 'X', type: 'unnumbered', img: 'https://files.catbox.moe/l8ixp3.jpg' } },

    // LEVEL 0.1: ZENITH STATION
    { data: { id: 'level0-1', label: 'Level 0.1', epithet: 'Zenith Station', class: '0', type: 'numbered', img: 'https://files.catbox.moe/jkzzb9.jpg' } },
    { data: { source: 'level0-1', target: 'level0' } },
    { data: { source: 'level0-1', target: 'level1' } },

    // LEVEL 0.2: REMODELED MESS
    { data: { id: 'level0-2', label: 'Level 0.2', epithet: 'Remodeled Mess', class: '3', type: 'numbered', img: 'https://files.catbox.moe/b1wujf.jpg' } },
    { data: { source: 'level0-2', target: 'level0' } },

    // LEVEL 0.3: THE ICY ROOMS
    { data: { id: 'level0-3', label: 'Level 0.3', epithet: 'The Icy Rooms', class: '3', type: 'numbered', img: 'https://files.catbox.moe/bka08y.png' } },
    { data: { source: 'level0-3', target: 'level0' } },

    // LEVEL 0.7: THE REMINISCENCE DISTRICT
    { data: { id: 'level0-7', label: 'Level 0.7', epithet: 'The Reminiscence District', class: '2', type: 'numbered', img: 'https://files.catbox.moe/mus3rb.png' } },
    { data: { source: 'level0-7', target: 'level0' } },

    // LEVEL 1: Habitable Zone
    { data: { id: 'level1', label: 'Level 1', epithet: 'Habitable Zone', class: '1', type: 'numbered', img: 'https://files.catbox.moe/o9pg7s.png' } },
    { data: { source: 'level1', target: 'basealpha' } },
    { data: { source: 'level1', target: 'tradersvault' } },
    { data: { source: 'level1', target: 'level1-1' } },
    { data: { source: 'level1', target: 'level1-2' } },
    { data: { source: 'level1', target: 'level1-3' } },
    { data: { source: 'level1', target: 'level1-5' } },
    { data: { source: 'level1', target: 'level2' } },
    { data: { source: 'level1', target: 'level3-5' } },
    { data: { source: 'level1', target: 'level19' } },
    { data: { source: 'level1', target: 'level22' } },
    { data: { source: 'level1', target: 'level24' } },
    { data: { source: 'level1', target: 'level38' } },
    { data: { source: 'level1', target: 'level128' } },
    { data: { source: 'level1', target: 'level154' } },
    { data: { source: 'level1', target: 'level159' } },
    { data: { source: 'level1', target: 'level201' } },
    { data: { source: 'level1', target: 'level218' } },
    { data: { source: 'level1', target: 'level305' } },
    { data: { source: 'level1', target: 'level389' } },
    { data: { source: 'level1', target: 'level710' } },
    { data: { source: 'level1', target: 'level800' } },
    { data: { source: 'level1', target: 'level817' } },
    { data: { source: 'level1', target: 'level998' } },
    { data: { source: 'level1', target: 'level998-2' } },

    // Placeholders for levels that do not have its own section yet (so the map doesn't break)
    { data: { id: 'basealpha', label: 'Base Alpha', class: '0', type: 'placeholder', img: 'https://files.catbox.moe/9cwam8.png' } },
    { data: { id: 'tradersvault', label: 'Trader\'s Vault', class: '1', type: 'placeholder', img: 'https://files.catbox.moe/8euzka.png' } },
    { data: { id: 'level1-1', label: 'Level 1.1', type: 'placeholder', img: '' } },
    { data: { id: 'level1-2', label: 'Level 1.2', type: 'placeholder', img: '' } },
    { data: { id: 'level1-3', label: 'Level 1.3', type: 'placeholder', img: '' } },
    { data: { id: 'level1-5', label: 'Level 1.5', type: 'placeholder', img: '' } },
    { data: { id: 'level2', label: 'Level 2', epithet: 'Abandoned Utility Halls', class: '3', type: 'placeholder', img: 'https://files.catbox.moe/f91b86.jpg' } },
    { data: { id: 'level3-5', label: 'Level 3.5', type: 'placeholder', img: '' } },
    { data: { id: 'level19', label: 'Level 19', type: 'placeholder', img: '' } },
    { data: { id: 'level22', label: 'Level 22', type: 'placeholder', img: '' } },
    { data: { id: 'level24', label: 'Level 24', type: 'placeholder', img: '' } },
    { data: { id: 'level38', label: 'Level 38', type: 'placeholder', img: '' } },
    { data: { id: 'level128', label: 'Level 128', type: 'placeholder', img: '' } },
    { data: { id: 'level154', label: 'Level 154', type: 'placeholder', img: '' } },
    { data: { id: 'level159', label: 'Level 159', type: 'placeholder', img: '' } },
    { data: { id: 'level201', label: 'Level 201', type: 'placeholder', img: '' } },
    { data: { id: 'level218', label: 'Level 218', type: 'placeholder', img: '' } },
    { data: { id: 'level305', label: 'Level 305', type: 'placeholder', img: '' } },
    { data: { id: 'level389', label: 'Level 389', type: 'placeholder', img: '' } },
    { data: { id: 'level710', label: 'Level 710', type: 'placeholder', img: '' } },
    { data: { id: 'level800', label: 'Level 800', type: 'placeholder', img: '' } },
    { data: { id: 'level817', label: 'Level 817', type: 'placeholder', img: '' } },
    { data: { id: 'level710', label: 'Level 710', type: 'placeholder', img: '' } },
    { data: { id: 'level800', label: 'Level 800', type: 'placeholder', img: '' } },
    { data: { id: 'level817', label: 'Level 817', type: 'placeholder', img: '' } },
    { data: { id: 'level998', label: 'Level 998', type: 'placeholder', img: '' } },
    { data: { id: 'level998-2', label: 'Level 998.2', type: 'placeholder', img: '' } },
];