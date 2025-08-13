const data = {
  events: JSON.parse(localStorage.getItem('events') || '[]'),
  projects: JSON.parse(localStorage.getItem('projects') || '[]'),
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  shots: JSON.parse(localStorage.getItem('shots') || '[]'),
  story: JSON.parse(localStorage.getItem('story') || '[]')
};

function saveData() {
  localStorage.setItem('events', JSON.stringify(data.events));
  localStorage.setItem('projects', JSON.stringify(data.projects));
  localStorage.setItem('tasks', JSON.stringify(data.tasks));
  localStorage.setItem('shots', JSON.stringify(data.shots));
  localStorage.setItem('story', JSON.stringify(data.story));
}

document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.section).classList.add('active');
  });
});

// Events
const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('event-list');

eventForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  data.events.push({ title, date });
  saveData();
  renderEvents();
  eventForm.reset();
});

function renderEvents() {
  eventList.innerHTML = '';
  data.events.sort((a, b) => a.date.localeCompare(b.date));
  data.events.forEach((ev, idx) => {
    const li = document.createElement('li');
    li.textContent = `${ev.date} - ${ev.title}`;
    li.addEventListener('click', () => {
      data.events.splice(idx, 1);
      saveData();
      renderEvents();
    });
    eventList.appendChild(li);
  });
}

// Projects
const projectForm = document.getElementById('project-form');
const projectList = document.getElementById('project-list');

projectForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('project-name').value;
  const deadline = document.getElementById('project-deadline').value;
  const client = document.getElementById('project-client').value;
  const desc = document.getElementById('project-desc').value;
  data.projects.push({ name, deadline, client, desc });
  saveData();
  renderProjects();
  projectForm.reset();
});

function renderProjects() {
  projectList.innerHTML = '';
  data.projects.sort((a, b) => a.deadline.localeCompare(b.deadline));
  data.projects.forEach((pr, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${pr.name}</strong> (do ${pr.deadline})<br/>Klient: ${pr.client}<br/>${pr.desc}`;
    li.addEventListener('click', () => {
      data.projects.splice(idx, 1);
      saveData();
      renderProjects();
    });
    projectList.appendChild(li);
  });
}

// Tasks
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = document.getElementById('task-text').value;
  data.tasks.push({ text, done: false });
  saveData();
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = '';
  data.tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = task.done;
    cb.addEventListener('change', () => {
      task.done = cb.checked;
      saveData();
    });
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(cb);
    li.appendChild(span);
    li.addEventListener('contextmenu', e => {
      e.preventDefault();
      data.tasks.splice(idx, 1);
      saveData();
      renderTasks();
    });
    taskList.appendChild(li);
  });
}

// Shots
const shotForm = document.getElementById('shot-form');
const shotList = document.getElementById('shot-list');

shotForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('shot-name').value;
  const desc = document.getElementById('shot-desc').value;
  data.shots.push({ name, desc });
  saveData();
  renderShots();
  shotForm.reset();
});

function renderShots() {
  shotList.innerHTML = '';
  data.shots.forEach((shot, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${shot.name}</strong> - ${shot.desc}`;
    li.addEventListener('click', () => {
      data.shots.splice(idx, 1);
      saveData();
      renderShots();
    });
    shotList.appendChild(li);
  });
}

// Storyboard
const storyForm = document.getElementById('story-form');
const storyList = document.getElementById('story-list');

storyForm.addEventListener('submit', e => {
  e.preventDefault();
  const file = document.getElementById('story-image').files[0];
  const desc = document.getElementById('story-desc').value;
  const camera = document.getElementById('story-camera').value;
  const reader = new FileReader();
  reader.onload = () => {
    data.story.push({ image: reader.result, desc, camera });
    saveData();
    renderStory();
    storyForm.reset();
  };
  reader.readAsDataURL(file);
});

function renderStory() {
  storyList.innerHTML = '';
  data.story.forEach((panel, idx) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = panel.image;
    const caption = document.createElement('p');
    caption.textContent = `${panel.desc} | ${panel.camera}`;
    div.appendChild(img);
    div.appendChild(caption);
    div.addEventListener('click', () => {
      data.story.splice(idx, 1);
      saveData();
      renderStory();
    });
    storyList.appendChild(div);
  });
}

renderEvents();
renderProjects();
renderTasks();
renderShots();
renderStory();
