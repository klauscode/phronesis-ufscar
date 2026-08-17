/**
 * UFSCar ClassStudio 2026/02 - Vibrant Dashboard Calendar Logic
 */

import { COURSES, COURSE_METADATA, DAYS_OF_WEEK, LOCATIONS } from './data.js';
import { downloadICSFile, detectScheduleConflicts } from './calendar.js';

// Safe Storage Helpers
function safeGet(key, fallback = '') {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) || fallback : fallback;
  } catch (e) {
    return fallback;
  }
}

function safeSet(key, val) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, val);
  } catch (e) {}
}

// Application State
const state = {
  activeView: 'matrix', // 'matrix' | 'bento' | 'planner' | 'rooms' | 'faculty'
  activePerfil: 'all',  // 'all' | 2 | 4 | 6 | 8
  selectedTurno: null,  // null | 'Manhã' | 'Tarde'
  selectedCarater: null,// null | 'Obrigatória' | 'Optativa'
  searchQuery: '',
  enrolledIds: new Set(),
  theme: safeGet('class_studio_theme', (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'))
};

// Initialize enrolled
try {
  const saved = JSON.parse(safeGet('academic_schedule_enrolled_courses', '[]'));
  if (Array.isArray(saved)) {
    state.enrolledIds = new Set(saved);
  }
} catch (e) {
  state.enrolledIds = new Set();
}

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  setupEvents();
  render();
});

/**
 * Theme Engine
 */
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  safeSet('class_studio_theme', theme);

  const btn = document.getElementById('btn-theme-switcher');
  if (btn) {
    btn.innerHTML = theme === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

/**
 * Filter Engine
 */
function getFilteredCourses() {
  return COURSES.filter(c => {
    // Perfil
    if (state.activePerfil !== 'all' && c.perfil !== state.activePerfil) {
      return false;
    }
    // Turno
    if (state.selectedTurno && c.turno !== state.selectedTurno) {
      return false;
    }
    // Carater
    if (state.selectedCarater && c.carater !== state.selectedCarater) {
      return false;
    }
    // Search
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      const codeM = c.code.toLowerCase().includes(q);
      const nameM = c.name.toLowerCase().includes(q);
      const shortM = (c.shortName || '').toLowerCase().includes(q);
      const profM = c.professores.some(p => p.toLowerCase().includes(q));
      const roomM = c.sala.toLowerCase().includes(q) || c.at.toLowerCase().includes(q);

      if (!codeM && !nameM && !shortM && !profM && !roomM) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Setup Event Handlers
 */
function setupEvents() {
  // Theme Switcher
  const btnTheme = document.getElementById('btn-theme-switcher');
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  // Perfil Buttons (Sidebar)
  document.querySelectorAll('.perfil-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.perfil-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-perfil');
      state.activePerfil = val === 'all' ? 'all' : parseInt(val, 10);
      render();
    });
  });

  // View Mode Tabs
  document.querySelectorAll('.view-mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.view-mode-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeView = tab.getAttribute('data-view');
      render();
    });
  });

  // Shift / Nature Badges in Sidebar
  document.querySelectorAll('.filter-badge-toggle').forEach(badge => {
    badge.addEventListener('click', () => {
      if (badge.hasAttribute('data-turno')) {
        const turno = badge.getAttribute('data-turno');
        state.selectedTurno = state.selectedTurno === turno ? null : turno;
        badge.classList.toggle('active', state.selectedTurno === turno);
      } else if (badge.hasAttribute('data-carater')) {
        const carater = badge.getAttribute('data-carater');
        state.selectedCarater = state.selectedCarater === carater ? null : carater;
        badge.classList.toggle('active', state.selectedCarater === carater);
      }
      render();
    });
  });

  // Global Search Input
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      render();
    });
  }

  // Keyboard shortcut '/'
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    } else if (e.key === 'Escape') {
      closeInspector();
    }
  });

  // Planner Drawer Trigger
  const btnOpenPlanner = document.getElementById('btn-open-planner-drawer');
  if (btnOpenPlanner) {
    btnOpenPlanner.addEventListener('click', () => {
      const plannerTab = document.querySelector('[data-view="planner"]');
      if (plannerTab) plannerTab.click();
    });
  }

  // Export Full ICS
  const btnExportAllIcs = document.getElementById('btn-export-full-ics');
  if (btnExportAllIcs) {
    btnExportAllIcs.addEventListener('click', () => {
      downloadICSFile(COURSES, "ClassStudio_UFSCar_2026_02.ics");
      showToast("Grade completa exportada para (.ics)!");
    });
  }

  // Print
  const btnPrint = document.getElementById('btn-print-studio');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  // Inspector Close
  const backdrop = document.getElementById('inspector-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeInspector();
    });
  }
}

/**
 * Main Render Engine
 */
function render() {
  updateSidebarGauges();

  const canvas = document.getElementById('dynamic-workspace-canvas');
  if (!canvas) return;

  const courses = getFilteredCourses();

  const counter = document.getElementById('active-matches-counter');
  if (counter) counter.textContent = `${courses.length} disciplinas`;

  switch (state.activeView) {
    case 'matrix':
      canvas.innerHTML = renderMatrixCanvasHTML(courses);
      break;
    case 'bento':
      canvas.innerHTML = renderBentoGridHTML(courses);
      break;
    case 'planner':
      canvas.innerHTML = renderPlannerStudioHTML();
      break;
    case 'rooms':
      canvas.innerHTML = renderRoomsRadarHTML(courses);
      break;
    case 'faculty':
      canvas.innerHTML = renderFacultyHTML(courses);
      break;
    default:
      canvas.innerHTML = renderMatrixCanvasHTML(courses);
  }

  attachCardEvents();
}

/**
 * Update Sidebar Circular Progress & Badges
 */
function updateSidebarGauges() {
  const enrolledCourses = COURSES.filter(c => state.enrolledIds.has(c.id));
  const totalHours = enrolledCourses.reduce((acc, c) => acc + (c.duracaoHoras || 4), 0);

  // SVG Gauge (Target ~ 20h per term)
  const svgProgress = document.getElementById('workload-svg-progress');
  const hoursVal = document.getElementById('gauge-hours-val');
  const subtext = document.getElementById('gauge-subtext');

  if (hoursVal) hoursVal.textContent = `${totalHours}h`;
  if (subtext) subtext.textContent = `${enrolledCourses.length} aulas no seu plano`;

  if (svgProgress) {
    const percentage = Math.min(100, Math.round((totalHours / 24) * 100));
    svgProgress.setAttribute('stroke-dasharray', `${percentage}, 100`);
  }

  const topbarBadge = document.getElementById('topbar-plan-badge');
  if (topbarBadge) topbarBadge.textContent = enrolledCourses.length;
}

/**
 * VIEW 1: Radiant Weekly Matrix Canvas
 */
function renderMatrixCanvasHTML(courses) {
  if (courses.length === 0) {
    return renderEmptyStateHTML();
  }

  return `
    <div class="matrix-canvas-wrapper">
      <div class="matrix-canvas">
        <!-- Header -->
        <div class="canvas-header-cell" style="background:transparent; color:var(--text-muted); font-size:0.75rem; justify-content:center;">
          HORÁRIO
        </div>
        ${DAYS_OF_WEEK.map(d => `
          <div class="canvas-header-cell">
            <span class="header-day-name">${d.label}</span>
            <span class="header-day-sub">${d.datePreview}</span>
          </div>
        `).join('')}

        <!-- MORNING (08:00 - 12:00) -->
        <div class="canvas-time-cell">
          <span style="font-size:0.85rem; color:var(--text-primary);">08:00</span>
          <span>12:00</span>
          <span class="canvas-time-tag">Manhã</span>
        </div>
        ${DAYS_OF_WEEK.map(d => {
          const morning = courses.filter(c => c.diaKey === d.key && c.turno === 'Manhã');
          return `
            <div class="canvas-day-slot">
              ${morning.map(c => renderEventCardHTML(c)).join('')}
            </div>
          `;
        }).join('')}

        <!-- BREAK (12:00 - 14:00) -->
        <div class="canvas-time-cell" style="min-height:40px; padding:0.25rem;">12h–14h</div>
        ${DAYS_OF_WEEK.map(() => `
          <div class="canvas-day-slot break-row">
            <span>Intervalo Almoço</span>
          </div>
        `).join('')}

        <!-- AFTERNOON (14:00 - 18:00) -->
        <div class="canvas-time-cell">
          <span style="font-size:0.85rem; color:var(--text-primary);">14:00</span>
          <span>18:00</span>
          <span class="canvas-time-tag">Tarde</span>
        </div>
        ${DAYS_OF_WEEK.map(d => {
          const afternoon = courses.filter(c => c.diaKey === d.key && c.turno === 'Tarde');
          return `
            <div class="canvas-day-slot">
              ${afternoon.map(c => renderEventCardHTML(c)).join('')}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderEventCardHTML(course) {
  const isEnrolled = state.enrolledIds.has(course.id);
  const perfilClass = `p${course.perfil}-card`;
  const chipClass = `chip-p${course.perfil}`;

  return `
    <article class="event-card ${perfilClass}" data-course-id="${course.id}" tabindex="0">
      <div class="event-card-top">
        <span class="event-code">${course.code}</span>
        <span class="event-perfil-chip ${chipClass}">P${course.perfil}</span>
      </div>

      <h3 class="event-title" title="${course.name}">
        ${course.shortName || course.name}
      </h3>

      <div class="event-teacher" title="${course.professores.join(', ')}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>${course.professores[0]}</span>
      </div>

      <div class="event-footer">
        <span class="event-room-tag">${course.at} • ${course.sala}</span>
        <button class="event-btn-enroll ${isEnrolled ? 'is-enrolled' : ''}" data-enroll-id="${course.id}">
          ${isEnrolled ? '✓ Plano' : '+ Adicionar'}
        </button>
      </div>
    </article>
  `;
}

/**
 * VIEW 2: Bento Perfil Overview
 */
function renderBentoGridHTML(courses) {
  return `
    <div class="bento-grid-container">
      ${COURSE_METADATA.perfis.map(p => {
        const pCourses = courses.filter(c => c.perfil === p.id);
        const totalHours = pCourses.reduce((acc, c) => acc + (c.duracaoHoras || 4), 0);

        return `
          <div class="bento-perfil-card">
            <div class="bento-header">
              <div class="bento-title-group">
                <div class="bento-perfil-badge badge-p${p.id}-grad">P${p.id}</div>
                <div>
                  <h2 style="font-size:1.15rem; font-weight:800;">${p.name}</h2>
                  <span style="font-size:0.75rem; color:var(--text-muted);">${p.badge}</span>
                </div>
              </div>
              <span class="pill-badge-count">${pCourses.length} aulas (${totalHours}h)</span>
            </div>

            <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.45;">
              ${p.description}
            </p>

            <div class="bento-courses-list">
              ${pCourses.map(c => `
                <div class="event-card p${c.perfil}-card" data-course-id="${c.id}" style="background:var(--bg-subtle);">
                  <div class="event-card-top">
                    <span class="event-code">${c.code}</span>
                    <span class="event-room-tag">${c.dia} (${c.horario})</span>
                  </div>
                  <strong style="font-size:0.88rem; color:var(--text-primary);">${c.shortName || c.name}</strong>
                  <div class="event-footer">
                    <span style="font-size:0.75rem; color:var(--text-secondary);">${c.at} • ${c.sala}</span>
                    <button class="event-btn-enroll ${state.enrolledIds.has(c.id) ? 'is-enrolled' : ''}" data-enroll-id="${c.id}">
                      ${state.enrolledIds.has(c.id) ? '✓ Inscrito' : '+ Salvar'}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * VIEW 3: Meu Planner & Conflict Radar
 */
function renderPlannerStudioHTML() {
  const enrolled = COURSES.filter(c => state.enrolledIds.has(c.id));
  const conflicts = detectScheduleConflicts(enrolled);
  const totalHours = enrolled.reduce((acc, c) => acc + (c.duracaoHoras || 4), 0);

  return `
    <div class="builder-studio-container">
      <!-- Planner Hero Bar -->
      <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 style="font-size:1.3rem; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
            <span>⚡ Meu Horário Personalizado</span>
          </h2>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.2rem;">
            Monte sua grade semestral e exporte diretamente para o Google Calendar ou Apple Calendar.
          </p>
        </div>

        <div style="display:flex; align-items:center; gap:0.75rem;">
          <button class="btn-studio" id="btn-clear-studio-plan" ${enrolled.length === 0 ? 'disabled' : ''}>Limpar</button>
          <button class="btn-studio btn-studio-primary" id="btn-download-studio-ics" ${enrolled.length === 0 ? 'disabled' : ''}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Exportar Calendário (.ICS)
          </button>
        </div>
      </div>

      ${conflicts.length > 0 ? `
        <div class="conflict-radar-banner">
          <span style="font-size:1.4rem;">⚠️</span>
          <div>
            <strong style="display:block; font-size:0.92rem;">Atenção: Existem disciplinas com sobreposição no mesmo horário!</strong>
            <div style="display:flex; flex-direction:column; gap:0.25rem; font-size:0.82rem; margin-top:0.35rem;">
              ${conflicts.map(cf => `
                <div>• <strong>${cf.dia} (${cf.overlapPeriod})</strong>: ${cf.courseA.shortName} ⚔️ ${cf.courseB.shortName}</div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      ${enrolled.length === 0 ? `
        <div style="text-align:center; padding: 4rem 1.5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="font-size:3rem; margin-bottom:0.75rem;">🎓</div>
          <h3 style="font-size:1.25rem; font-weight:800;">Nenhuma aula no seu plano</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.25rem;">Navegue pela Grade Semanal e clique em "+ Adicionar" para montar sua rotina.</p>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <h3 style="font-size:1.1rem; font-weight:700;">Grade Visual do Seu Semestre (${totalHours}h semanais)</h3>
          ${renderMatrixCanvasHTML(enrolled)}
        </div>
      `}
    </div>
  `;
}

/**
 * VIEW 4: Rooms & Occupancy Radar
 */
function renderRoomsRadarHTML(courses) {
  return `
    <div style="display:flex; flex-direction:column; gap:1.5rem;">
      ${LOCATIONS.map(loc => `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem;">
            <h2 style="font-size:1.2rem; font-weight:800; display:flex; align-items:center; gap:0.5rem;">
              <span>📍 ${loc.at}</span>
              <span style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">(${loc.name})</span>
            </h2>
            <span class="pill-badge-count">${loc.salas.length} salas</span>
          </div>

          <div class="rooms-radar-grid">
            ${loc.salas.map(sala => {
              const rCourses = courses.filter(c => c.at === loc.at && c.sala === sala);
              return `
                <div class="room-radar-card">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="font-family:var(--font-mono); font-size:0.95rem; color:var(--text-primary);">${sala}</strong>
                    <span class="pill-badge-count">${rCourses.length} aula(s)</span>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${rCourses.length === 0 ? `
                      <span style="font-size:0.78rem; color:var(--text-muted); font-style:italic;">Disponível / Sem aulas</span>
                    ` : rCourses.map(c => `
                      <div class="event-card p${c.perfil}-card" data-course-id="${c.id}" style="padding:0.65rem 0.75rem;">
                        <strong style="font-size:0.82rem; color:var(--text-primary);">${c.shortName || c.name}</strong>
                        <span style="font-size:0.72rem; color:var(--text-secondary);">${c.dia} • ${c.horario} (P${c.perfil})</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * VIEW 5: Faculty Directory
 */
function renderFacultyHTML(courses) {
  const map = new Map();
  COURSES.forEach(c => {
    c.professores.forEach(p => {
      if (!map.has(p)) map.set(p, []);
      map.get(p).push(c);
    });
  });

  const list = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return `
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
      ${list.map(([prof, pCourses]) => `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem; display:flex; flex-direction:column; gap:0.85rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="width:42px; height:42px; border-radius:50%; background:var(--primary-gradient); display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff; font-size:1.1rem;">
              ${prof.replace(/(Profa\.|Prof\.|Dra\.|Dr\.|Me\.)/g, '').trim()[0]}
            </div>
            <div>
              <strong style="font-size:0.92rem; color:var(--text-primary); display:block;">${prof}</strong>
              <span style="font-size:0.74rem; color:var(--text-muted);">Docente Educação Especial • UFSCar</span>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.4rem;">
            <span style="font-size:0.72rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">Aulas no Semestre (${pCourses.length}):</span>
            ${pCourses.map(c => `
              <div class="event-card p${c.perfil}-card" data-course-id="${c.id}" style="padding:0.6rem 0.75rem;">
                <strong style="font-size:0.82rem;">${c.shortName || c.name}</strong>
                <span style="font-size:0.72rem; color:var(--text-secondary);">${c.dia} (${c.horario}) • ${c.at} ${c.sala}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderEmptyStateHTML() {
  return `
    <div style="text-align:center; padding: 4rem 1.5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
      <div style="font-size:2.5rem; margin-bottom:0.5rem;">🔍</div>
      <h3 style="font-size:1.2rem; font-weight:800;">Nenhuma aula encontrada</h3>
      <p style="color:var(--text-muted); font-size:0.88rem;">Tente ajustar seus termos de busca ou filtros.</p>
    </div>
  `;
}

/**
 * Attach Card Events
 */
function attachCardEvents() {
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.event-btn-enroll')) return;
      const id = card.getAttribute('data-course-id');
      if (id) openInspector(id);
    });
  });

  document.querySelectorAll('[data-enroll-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-enroll-id');
      toggleEnroll(id);
    });
  });

  // Planner actions
  const btnClear = document.getElementById('btn-clear-studio-plan');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      state.enrolledIds.clear();
      safeSet('academic_schedule_enrolled_courses', '[]');
      render();
      showToast("Plano limpo.");
    });
  }

  const btnDownloadIcs = document.getElementById('btn-download-studio-ics');
  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', () => {
      const list = COURSES.filter(c => state.enrolledIds.has(c.id));
      downloadICSFile(list, "Meu_Plano_UFSCar_2026_02.ics");
      showToast("Calendário (.ics) baixado com sucesso!");
    });
  }
}

/**
 * Toggle Enrollment
 */
function toggleEnroll(id) {
  if (state.enrolledIds.has(id)) {
    state.enrolledIds.delete(id);
    showToast("Removido do seu plano.");
  } else {
    state.enrolledIds.add(id);
    showToast("Adicionado ao seu plano!");
  }

  safeSet('academic_schedule_enrolled_courses', JSON.stringify([...state.enrolledIds]));
  render();
}

/**
 * Slide-out Inspector Drawer
 */
function openInspector(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  const backdrop = document.getElementById('inspector-backdrop');
  const headArea = document.getElementById('inspector-header-area');
  const bodyArea = document.getElementById('inspector-body-area');
  const footArea = document.getElementById('inspector-footer-area');

  if (!backdrop || !headArea || !bodyArea || !footArea) return;

  const isEnrolled = state.enrolledIds.has(course.id);

  headArea.innerHTML = `
    <div>
      <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
        <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted); font-weight:700;">${course.code}</span>
        <span class="event-perfil-chip chip-p${course.perfil}">Perfil ${course.perfil}</span>
        <span class="event-room-tag" style="background:var(--optativa-bg); color:var(--optativa-color); font-size:0.7rem;">${course.carater}</span>
      </div>
      <h2 style="font-size:1.25rem; font-weight:800; color:var(--text-primary);">${course.name}</h2>
    </div>
    <button class="btn-studio btn-studio-icon" id="inspector-close-btn" aria-label="Fechar">✕</button>
  `;

  bodyArea.innerHTML = `
    <div class="inspector-tile-grid">
      <div class="inspector-tile">
        <span class="inspector-tile-label">Horário</span>
        <span class="inspector-tile-value">${course.dia}, ${course.horario}</span>
      </div>
      <div class="inspector-tile">
        <span class="inspector-tile-label">Localização</span>
        <span class="inspector-tile-value">${course.at} • ${course.sala}</span>
      </div>
      <div class="inspector-tile">
        <span class="inspector-tile-label">Carga Semanal</span>
        <span class="inspector-tile-value">${course.duracaoHoras} horas</span>
      </div>
      <div class="inspector-tile">
        <span class="inspector-tile-label">Área</span>
        <span class="inspector-tile-value">${course.area || 'Educação Especial'}</span>
      </div>
    </div>

    <div>
      <span class="inspector-tile-label" style="display:block; margin-bottom:0.35rem;">Corpo Docente:</span>
      <div style="display:flex; flex-direction:column; gap:0.35rem;">
        ${course.professores.map(p => `
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; font-weight:700; color:var(--text-primary);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>${p}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <span class="inspector-tile-label" style="display:block; margin-bottom:0.35rem;">Ementa Oficial:</span>
      <div class="inspector-ementa-box">
        ${course.ementa}
      </div>
    </div>
  `;

  footArea.innerHTML = `
    <button class="btn-studio" id="inspector-btn-copy">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      Copiar Código
    </button>
    <button class="btn-studio" id="inspector-btn-ics">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      Salvar .ICS
    </button>
    <button class="btn-studio btn-studio-primary" id="inspector-btn-toggle">
      ${isEnrolled ? '✓ No Meu Plano' : '+ Adicionar ao Meu Plano'}
    </button>
  `;

  document.getElementById('inspector-close-btn').addEventListener('click', closeInspector);

  document.getElementById('inspector-btn-copy').addEventListener('click', () => {
    navigator.clipboard.writeText(course.code).then(() => showToast(`Código ${course.code} copiado!`));
  });

  document.getElementById('inspector-btn-ics').addEventListener('click', () => {
    downloadICSFile([course], `${course.code}_UFSCar.ics`);
    showToast("Aula exportada para (.ics)!");
  });

  document.getElementById('inspector-btn-toggle').addEventListener('click', () => {
    toggleEnroll(course.id);
    openInspector(course.id);
  });

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeInspector() {
  const backdrop = document.getElementById('inspector-backdrop');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Toast Notification
 */
function showToast(msg) {
  const container = document.getElementById('app-toast-container');
  if (!container) return;

  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = 'all 200ms ease';
    setTimeout(() => t.remove(), 200);
  }, 2400);
}
