/**
 * Calendar utilities and iCalendar (.ics) exporter for Academic Schedule 2026/02
 */

// Semester Dates (2026/02)
export const SEMESTER_CONFIG = {
  startDate: "20260817", // 2026-08-17 (Segunda-feira)
  endDate: "20261218",   // 2026-12-18 (Sexta-feira)
  dayOffsets: {
    segunda: 0,
    terca: 1,
    quarta: 2,
    quinta: 3,
    sexta: 4
  },
  byDayMap: {
    segunda: "MO",
    terca: "TU",
    quarta: "WE",
    quinta: "TH",
    sexta: "FR"
  }
};

/**
 * Format date string YYYYMMDDTHHMMSS
 */
function formatIcsDateTime(year, month, day, hours, minutes) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${year}${pad(month)}${pad(day)}T${pad(hours)}${pad(minutes)}00`;
}

/**
 * Calculate first occurrence date for a given weekday in the semester
 */
function getFirstDayDate(weekdayKey) {
  // Semester starts on Monday, August 17, 2026
  const baseYear = 2026;
  const baseMonth = 8; // August (1-indexed)
  const baseDay = 17;

  const offset = SEMESTER_CONFIG.dayOffsets[weekdayKey] || 0;
  const actualDay = baseDay + offset;
  return { year: baseYear, month: baseMonth, day: actualDay };
}

/**
 * Generate iCalendar RFC 5545 content for a list of courses
 */
export function generateICS(courses, title = "Horario_Academico_2026_02") {
  if (!courses || courses.length === 0) return null;

  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  let ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gabriel Klaus Aguiar//PHRONESIS UFSCar Educacao Especial 2026-02//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:" + title,
    "X-WR-TIMEZONE:America/Sao_Paulo"
  ];

  courses.forEach((course) => {
    const firstDate = getFirstDayDate(course.diaKey);
    const byDay = SEMESTER_CONFIG.byDayMap[course.diaKey] || "MO";

    // Split hours
    const [startTimeStr, endTimeStr] = course.horario.split("-").map(s => s.trim());
    const [startH, startM] = startTimeStr.split(":").map(Number);
    const [endH, endM] = endTimeStr.split(":").map(Number);

    const dtStart = formatIcsDateTime(firstDate.year, firstDate.month, firstDate.day, startH, startM);
    const dtEnd = formatIcsDateTime(firstDate.year, firstDate.month, firstDate.day, endH, endM);
    const untilStr = `${SEMESTER_CONFIG.endDate}T235959Z`;

    const description = `Disciplina: ${course.name}\\nCódigo: ${course.code}\\nPerfil: ${course.perfil} (${course.carater})\\nDocente(s): ${course.professores.join(', ')}\\nLocal: ${course.localFull}\\n\\nEmenta:\\n${course.ementa}`;

    ics.push(
      "BEGIN:VEVENT",
      `UID:${course.code}-2026-02@ufscar.br`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;TZID=America/Sao_Paulo:${dtStart}`,
      `DTEND;TZID=America/Sao_Paulo:${dtEnd}`,
      `RRULE:FREQ=WEEKLY;UNTIL=${untilStr};BYDAY=${byDay}`,
      `SUMMARY:[${course.code}] ${course.shortName || course.name}`,
      `LOCATION:${course.localFull} - UFSCar`,
      `DESCRIPTION:${description}`,
      `CATEGORIES:Educação Especial,Perfil ${course.perfil},${course.carater}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  });

  ics.push("END:VCALENDAR");
  return ics.join("\r\n");
}

/**
 * Triggers browser download of generated .ics file
 */
export function downloadICSFile(courses, filename = "Meu_Horario_2026_02.ics") {
  const icsData = generateICS(courses, "Horário Acadêmico 2026/02 - Ed. Especial");
  if (!icsData) return false;

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  return true;
}

/**
 * Checks for time collisions between an array of courses
 * Returns an array of conflict objects: { courseA, courseB, day, timeRange }
 */
export function detectScheduleConflicts(courses) {
  const conflicts = [];
  if (!courses || courses.length < 2) return conflicts;

  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const a = courses[i];
      const b = courses[j];

      if (a.diaKey === b.diaKey) {
        // Compare intervals [startHour, endHour]
        const hasOverlap = Math.max(a.startHour, b.startHour) < Math.min(a.endHour, b.endHour);
        if (hasOverlap) {
          conflicts.push({
            courseA: a,
            courseB: b,
            dia: a.dia,
            overlapPeriod: `${Math.max(a.startHour, b.startHour)}:00 - ${Math.min(a.endHour, b.endHour)}:00`
          });
        }
      }
    }
  }

  return conflicts;
}
