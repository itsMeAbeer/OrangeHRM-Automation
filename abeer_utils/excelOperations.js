import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filePath = path.join( dirname, 'testData.xlsx');
const employeeImagePath = path.join(process.cwd(),'test-data' ,'images', 'employee.png');

export class ExcelOperations{
    constructor(){
        this.workbook = XLSX.readFile(filePath);
        this.employeeImagePath = employeeImagePath;
    }

    getLoginData(){
        const loginSheet = this.workbook.Sheets['LoginData'];
        const loginData = XLSX.utils.sheet_to_json(loginSheet);
        return loginData;
    }

    getEmployeeData(){
        const employeeSheet = this.workbook.Sheets['EmployeeData'];
        const employeeData = XLSX.utils.sheet_to_json(employeeSheet);
        return employeeData;
    }

    getEmployeeLoginData(){
        const employeeLoginSheet = this.workbook.Sheets['EmployeeLoginData'];
        const employeeLoginData = XLSX.utils.sheet_to_json(employeeLoginSheet);
        return employeeLoginData;
    }

    getPersonalDetails(){
        const personalDetailsSheet = this.workbook.Sheets['PersonalDetails'];
        const personalDetailsData = XLSX.utils.sheet_to_json(personalDetailsSheet);
        return personalDetailsData;
    }

    updateEmployeeID(firstName, lastName, newID) {
        const sheetName = 'EmployeeData';
        const sheet = this.workbook.Sheets[sheetName];
        
        // Convert sheet to JSON to find the row index
        const data = XLSX.utils.sheet_to_json(sheet);
        
        const rowIndex = data.findIndex(emp => 
            emp.firstName === firstName && emp.lastName === lastName
        );

        if (rowIndex !== -1) {
            /* The header is row 1 (index 0). 
            The first data row is row 2.
            So, data[rowIndex] corresponds to Excel row (rowIndex + 2).
            */
            const excelRowNumber = rowIndex + 2; 
            
            // Let's find the column letter for 'employeeID'
            // This assumes employeeID is, for example, Column C
            const headers = Object.keys(data[0]);
            const colIndex = headers.indexOf('employeeID');
            const colLetter = XLSX.utils.encode_col(colIndex);
            const cellAddress = `${colLetter}${excelRowNumber}`;

            // Update the specific cell directly in the existing sheet
            XLSX.utils.sheet_add_aoa(sheet, [[newID]], { origin: cellAddress });

            // Write the file
            XLSX.writeFile(this.workbook, filePath);
            
            console.log(`Updated ${cellAddress} with ID: ${newID}`);
        } else {
            console.error("Employee not found.");
        }
    }

    updateUsername(firstName, newID) {
        const sheetName = 'EmployeeLoginData';
        const sheet = this.workbook.Sheets[sheetName];
        
        // Safety check for sheet existence
        if (!sheet) return console.error(`Sheet ${sheetName} not found`);

        // 1. Get headers to find the column index
        // Using { header: 1 } returns an array of arrays (much faster for finding headers)
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers = rows[0]; 
        const colIndex = headers.indexOf('username');

        if (colIndex === -1) {
            console.error("Could not find 'username' column.");
            return;
        }

        // 2. Target Row 2 (Index 1)
        const excelRowIndex = 1; 
        const cellAddress = XLSX.utils.encode_cell({ r: excelRowIndex, c: colIndex });
        const username = firstName + newID;

        // 3. Update the cell directly
        // This ensures the cell exists in the workbook object before writing
        XLSX.utils.sheet_add_aoa(sheet, [[username]], { origin: cellAddress });

        // 4. WRITE THE FILE - Critical: Check the variable name for path!
        try {
            // Use 'this.filePath' if it's stored in your class
            XLSX.writeFile(this.workbook, filePath); 
            console.log(`Success: Updated ${cellAddress} to ${username} in ${filePath}`);
        } catch (err) {
            console.error("Save failed. Check if the Excel file is currently open.", err);
        }
    }

}


