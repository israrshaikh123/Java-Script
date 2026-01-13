
const chaptersDiv = document.getElementById('chapters');

fetch('https://vedicscriptures.github.io/chapters')
  .then(res => res.json())
  .then(data => {
    data.forEach(ch => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>Chapter ${ch.chapter_number}</h3>
        <p><strong>${ch.name}</strong></p>
        <p>${ch.chapter_summary}</p>
      `;
      card.onclick = () => {
        window.location.href = `verses.html?ch=${ch.chapter_number}&count=${ch.verses_count}`;
      };
      chaptersDiv.appendChild(card);
    });
  });
