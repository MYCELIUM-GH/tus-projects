const noteInput = document.getElementById('note-input');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');
const statusMessage = document.getElementById('status-message');
const noteDisplay = document.getElementById('note-display');
const STORAGE_KEY = 'saved_notes';

function formatCreatedAt(ts) 
{
    return ts ? new Date(ts).toLocaleString() : 'Unknown date';
}

function loadNotes() 
{
    const raw = localStorage.getItem(STORAGE_KEY);
    let notes = [];

    if (raw) 
    {
        try 
        {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) notes = parsed;
        }
        catch (e) { notes = []; }
    }

    if (notes.length === 0) 
    {
        noteDisplay.innerHTML = '<p>Nothing to show;p</p>';
        return;
    }

    const listHtml = notes.slice().reverse().map(note =>
        `<article class="note"><p>${formatCreatedAt(note.createdAt)}</p><pre>${note.text}</pre></article>`
    ).join('');

    noteDisplay.innerHTML = `<p>${notes.length} saved note(s)</p>${listHtml}`;
}

function saveNote() 
{
    const currentNote = noteInput.value;

    if (currentNote.trim() === '') 
    {
        statusMessage.textContent = 'Nothing to save';
        return;
    }

    const newNote = { id: Date.now(), text: currentNote, createdAt: Date.now() };

    let notes = [];
    const existingRaw = localStorage.getItem(STORAGE_KEY);

    if (existingRaw) 
    {
        try 
        {
            const parsed = JSON.parse(existingRaw);
            if (Array.isArray(parsed)) notes = parsed;
        } 
        catch (e) { notes = []; }
    }

    notes.push(newNote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    loadNotes();

    statusMessage.textContent = 'Note saved successfully at ' + new Date().toLocaleTimeString() + '!';
    setTimeout(() => { statusMessage.textContent = ''; }, 3000);
    noteInput.value = '';
}

function clearNote() 
{
    localStorage.removeItem(STORAGE_KEY);
    noteInput.value = '';
    noteDisplay.innerHTML = '<p>Nothing to show;p</p>';
    statusMessage.textContent = 'All notes cleared';
    setTimeout(() => { statusMessage.textContent = ''; }, 3000);
}

saveButton.addEventListener('click', saveNote);
clearButton.addEventListener('click', clearNote);
window.onload = loadNotes;
