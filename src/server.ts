import * as path from "path";
import * as fs from "fs";
import PDFDocument from "pdfkit";

const dirName: string = "files";

const document: PDFKit.PDFDocument = new PDFDocument;
document.pipe(fs.createWriteStream("file.pdf"));

const files: string[] = fs.readdirSync(path.join(__dirname, `../${dirName}`));
files.forEach((file: string, index: number) => {
    if (index !== 0) {
        document.addPage();
    }
    if (file.endsWith(".txt")) {
        const content = fs.readFileSync(`${dirName}/${file}`, "utf8").replace(/\r\n|\r/g, '\n');;
        document.text(content);
    } else if (file.endsWith(".jpg") || file.endsWith(".png")) {
        document.image(`${dirName}/${file}`, {
            fit: [500, 400],
            align: 'center',
            valign: 'center'
        });
    }
    if (!file.startsWith(`${index + 1}`)) {
        fs.renameSync(`${dirName}/${file}`, `${dirName}/${index + 1}-${file}`);
    }
});
document.end();