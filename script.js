// Logo Upload Logic
function loadLogo(event) {
    const preview = document.getElementById('logo-preview');
    preview.innerHTML = '';
    const img = document.createElement('img');
    img.src = URL.createObjectURL(event.target.files[0]);
    img.className = 'max-h-full max-w-full object-contain';
    preview.appendChild(img);
}

// Dynamic Rows Logic
function addRow() {
    const table = document.getElementById('items-table');
    const rowCount = table.rows.length + 1;
    const row = table.insertRow();
    row.className = "border-b";
    row.innerHTML = `
        <td class="p-3">${rowCount}</td>
        <td class="p-3" contenteditable="true">[Item Name]</td>
        <td class="p-3" contenteditable="true">[Code]</td>
        <td class="p-3 text-center" contenteditable="true">0</td>
        <td class="p-3" contenteditable="true">Pcs</td>
    `;
}

// Signature Pad Logic
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let writing = false;

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left,
        y: (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top
    };
}

function start(e) { 
    writing = true; 
    ctx.beginPath(); 
    const pos = getPos(e);
    ctx.moveTo(pos.x, pos.y);
    // Prevent scrolling when drawing on touch devices
    if(e.type === 'touchstart') e.preventDefault();
}

function move(e) {
    if (!writing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#00008b';
    ctx.stroke();
    if(e.type === 'touchmove') e.preventDefault();
}

function stop() { 
    writing = false; 
}

// Event Listeners
canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', move);
window.addEventListener('mouseup', stop);

canvas.addEventListener('touchstart', start, {passive: false});
canvas.addEventListener('touchmove', move, {passive: false});
canvas.addEventListener('touchend', stop);

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
