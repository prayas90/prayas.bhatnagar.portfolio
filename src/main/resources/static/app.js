// Content is shared by the static website and the Spring Boot profile endpoint.
// Use DOM text nodes so profile edits cannot inject executable HTML.
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function experienceRow(job) {
  const row = element('article', 'experience-row');
  const meta = element('div', 'experience-meta');
  meta.append(element('p', 'company', job.company), element('p', 'date', job.period));
  if (job.current) meta.append(element('span', 'current', 'Current'));
  const content = element('div', 'experience-content');
  content.append(element('h3', '', job.role), element('p', 'context', job.context));
  const list = element('ul', 'bullets');
  for (const line of job.highlights) list.append(element('li', '', line));
  const tags = element('div', 'tags');
  for (const tag of job.tags) tags.append(element('span', 'tag', tag));
  content.append(list, tags);
  row.append(meta, content);
  return row;
}

async function loadProfile() {
  const response = await fetch('profile.json');
  if (!response.ok) throw new Error('Profile could not be loaded');
  const profile = await response.json();
  const experience = document.querySelector('#experience-list');
  experience.replaceChildren(...profile.experience.filter(job => !job.earlier).map(experienceRow));
  const earlier = element('details', 'earlier');
  earlier.append(element('summary', '', 'Earlier experience · 2013–2019'));
  earlier.append(...profile.experience.filter(job => job.earlier).map(experienceRow));
  experience.append(earlier);

  document.querySelector('#skills-list').replaceChildren(...profile.skills.map((skill, index) => {
    const group = element('article', 'skill-group');
    group.append(element('span', 'skill-number', `0${index + 1}`), element('h3', '', skill.title));
    const lines = element('p');
    skill.items.forEach((item, index) => {
      if (index) lines.append(document.createElement('br'));
      lines.append(document.createTextNode(item));
    });
    group.append(lines);
    return group;
  }));
  document.querySelector('#certifications').replaceChildren(...profile.certifications.map(item => element('li', '', item)));
  document.querySelector('#recognition').replaceChildren(...profile.recognition.map(item => element('li', '', `${item.award} · ${item.company}`)));
}

loadProfile().catch(() => {
  const message = element('p', '', 'The detailed profile could not load. ');
  const link = element('a', 'text-link', 'Read the full resume ↗');
  link.href = 'resume.pdf';
  message.append(link);
  document.querySelector('#experience-list').replaceChildren(message);
});
