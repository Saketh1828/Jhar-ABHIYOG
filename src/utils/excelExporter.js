/**
 * Excel / CSV Dataset Exporter for Samasya Nivark / Jharkhand Samadhan
 * Generates an Excel-compatible CSV file containing all 21 structured columns.
 */

export const exportProblemsToExcelCSV = (problems = []) => {
  const headers = [
    "Problem ID",
    "Title",
    "Description",
    "Category",
    "Subcategory",
    "District",
    "Location",
    "People Affected",
    "Severity",
    "Urgency",
    "AI Priority",
    "Status",
    "Submitted By",
    "Submitted Date",
    "Assigned Department",
    "Assigned University",
    "Assigned Student Team",
    "Industry Partner",
    "Likes",
    "Resolution Date",
    "Resolution Description"
  ];

  const csvRows = [];
  csvRows.push(headers.join(","));

  problems.forEach(p => {
    const row = [
      escapeCsv(p.id),
      escapeCsv(p.title),
      escapeCsv(p.description),
      escapeCsv(p.category),
      escapeCsv(p.subcategory || p.category),
      escapeCsv(p.district),
      escapeCsv(`${p.village || 'Village'}, ${p.district}, Jharkhand`),
      p.affectedPeople || 0,
      escapeCsv(p.severity),
      escapeCsv(p.targetResponse || 'Normal'),
      escapeCsv(p.priority),
      escapeCsv(p.status),
      escapeCsv(p.reportedBy),
      escapeCsv(p.dateReported),
      escapeCsv(p.assignedDepartment || "DWSD Dumka"),
      escapeCsv(p.assignedUniversity || "BIT Mesra"),
      escapeCsv(p.assignedTeam || "Student Innovation Cell"),
      escapeCsv(p.industryPartner || "Tata Steel CSR"),
      p.supportersCount || 0,
      escapeCsv(p.resolutionDate || (p.status === 'Resolved' ? '2026-08-25' : 'N/A')),
      escapeCsv(p.solutionProposed || p.resolutionDescription || 'Under ground implementation')
    ];
    csvRows.push(row.join(","));
  });

  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
  const link = document.createElement("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", `Jharkhand_Samadhan_Dataset_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const escapeCsv = (str = "") => {
  const cleaned = String(str).replace(/"/g, '""').replace(/\n/g, ' ');
  return `"${cleaned}"`;
};
