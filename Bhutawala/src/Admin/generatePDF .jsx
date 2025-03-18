import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = (InvoiceNo) => {



  doc.text(`Invoice No: ${InvoiceNo}`, 10, 10);
  doc.save(`Invoice_${InvoiceNo}.pdf`);
};
