import PDFDocument from "pdfkit";

export const generateMonthlyPDF = (report, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=temple-report-${report.month}-${report.year}.pdf`
  );

  doc.pipe(res);

  /* ---------- TITLE ---------- */
  doc
    .fontSize(18)
    .text("Temple Monthly Financial Report", { align: "center" })
    .moveDown();

  doc
    .fontSize(12)
    .text(`Month: ${report.month}/${report.year}`)
    .moveDown(1.5);

  /* ---------- INCOME ---------- */
  doc.fontSize(14).text("Income Summary").moveDown(0.5);
  doc.fontSize(11);

  report.income.breakdown.forEach((item) => {
    doc.text(`${item._id}: Rs. ${item.totalAmount}`);
  });

  doc.moveDown();
  doc.text(`Total Income: Rs. ${report.income.total}`);
  doc.moveDown(1.5);

  /* ---------- EXPENSE ---------- */
  doc.fontSize(14).text("Expense Summary").moveDown(0.5);
  doc.fontSize(11);

  report.expense.breakdown.forEach((item) => {
    doc.text(`${item._id}: Rs. ${item.totalAmount}`);
  });

  doc.moveDown();
  doc.text(`Total Expense: Rs. ${report.expense.total}`);
  doc.moveDown(1.5);

  /* ---------- SURPLUS ---------- */
  doc.fontSize(14).text("Final Balance").moveDown(0.5);
  doc.fontSize(12);
  doc.text(`Surplus / Deficit: Rs. ${report.surplus}`);

  doc.end();
};
