// assets/js/pdf-generator.js
// Precisa incluir a lib jsPDF no HTML
export function generateSplit(bookingData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Manzuá Hotel - Ficha de Registro", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Hóspede: ${bookingData.guest}`, 20, 40);
    doc.text(`Quarto: ${bookingData.room}`, 20, 50);
    doc.text(`Valor Total: R$ ${bookingData.amount}`, 20, 60);
    doc.text(`Check-in: ${new Date().toLocaleString()}`, 20, 70);

    doc.text("___________________________________", 20, 100);
    doc.text("Assinatura do Hóspede", 20, 110);
    
    doc.text("Declaro ter utilizado a diária conforme descrito.", 20, 120);

    doc.save(`split_${bookingData.guest}.pdf`);
}