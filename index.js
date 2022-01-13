const PdfPrinter = require('pdfmake');
const fs = require('fs');


// Chnage these to change the PDF content
const numberOfDaysFromToday = 30;
const locale = 'en-US';
const titles = ['First Title', 'Second Title', 'Third Title'];

let fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
    },
};


let content = [];
for (let i = 0; i < numberOfDaysFromToday; i++) {
    var options = {year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date();
    date.setDate(date.getDate() + i)
    content.push(
        {
            text: date.toLocaleDateString(locale, options),
            alignment: 'left',
            fontSize: 30,
            margin: [10, 36],
        });
    content.push(
        {
            text: titles[0],
            alignment: 'left',
            fontSize: 30,
            margin: [10, 30],
        });
    content.push(
        {
            text: titles[1],
            alignment: 'left',
            fontSize: 30,
            margin: [10, 310],
        });
    content.push(
        {
            text: titles[2],
            alignment: 'left',
            fontSize: 30,
            margin: [10, 318],
        })
    // @TODO: Quick Fix for empty last page
    if (i !== (numberOfDaysFromToday - 1)) {
        content.push(
            {
                text: '',
                pageBreak: 'after',
            });
    }

}

let dd = {
    content,
    pageMargins: [10, 10, 10, 10],
    pageSize: {
        width: 1354,
        height: 1772
    },
    background: [
        {
            image: './templates/daily-journal.png',
            width: 1354
        }
    ],
    defaultStyle: {font: 'Helvetica'},
};
const printer = new PdfPrinter(fonts);
let pdfDoc = printer.createPdfKitDocument(dd);

pdfDoc.pipe(fs.createWriteStream('./out.pdf'));
pdfDoc.end();



