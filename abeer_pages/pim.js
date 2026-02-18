export class PIM{
    constructor(page){
        this.page = page;
        this.addEmployeeButton = page.getByRole('button', { name: ' Add ' });
        this.mainHeader = page.locator("//h6[@class='oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module']");
        this.subHeader = page.locator("//h6[@class='oxd-text oxd-text--h6 orangehrm-main-title']")
        this.firstNameBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameBox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameBox = page.getByRole('textbox', { name: 'Last Name' });
        this.employeeID = page.locator('//input[@class="oxd-input oxd-input--active"]').nth(1);
        this.idError = page.locator('//span').filter({ hasText: 'Employee Id already exists' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.addImageButton = page.locator('//i[@class="oxd-icon bi-plus"]');
        this.loginDetailsButton = page.locator('//span[@class="oxd-switch-input oxd-switch-input--active --label-right"]');
        this.usernameBox = page.locator('//div[@class="oxd-form-row"]//input[@class="oxd-input oxd-input--active"]').nth(1);
        this.passwordBox = page.locator('//div[@class="oxd-form-row user-password-row"]//input[@class="oxd-input oxd-input--active"]').nth(0);
        this.confirmPasswordBox = page.locator('//div[@class="oxd-form-row user-password-row"]//input[@class="oxd-input oxd-input--active"]').nth(1);
        this.employeeName = page.locator('//h6[@class="oxd-text oxd-text--h6 --strong"]');
        this.activeTab = page.locator('//a[@class="orangehrm-tabs-item --active"]');
        this.license = page.locator('//input[@class="oxd-input oxd-input--active"]').nth(3);
        this.licenseExpiry = page.locator('//input[@class="oxd-input oxd-input--active"]').nth(4);
        this.nationality = page.locator('//div[@class="oxd-select-text oxd-select-text--active"]').nth(0);
        this.maritalStatus = page.locator('//div[@class="oxd-select-text oxd-select-text--active"]').nth(1);
        this.dob = page.locator('//input[@class="oxd-input oxd-input--active"]').nth(5);
        this.savePersonDetailsButton = page.locator('//button[@class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]').nth(0);
        // this.gender = page.locator('//div[@class="oxd-radio-wrapper"]');
    }

    async addEmployee(){
        await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });
        await this.addEmployeeButton.click();
    }

    async fillEmployeeDetails(firstName, middleName, lastName){
        await this.firstNameBox.fill(firstName);
        await this.middleNameBox.fill(middleName);
        await this.lastNameBox.fill(lastName);   
    }

    async fillEmployeeID(employeeID){
        await this.employeeID.fill(employeeID);
    }


    getMainHeader(){
        return this.mainHeader;
    }

    getSubHeader(){
        return this.subHeader;
    }

    getEmployeeID(){
        return this.employeeID;
    }

    getIdError(){
        return this.idError;
    }

    async saveEmployee(){
        // await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });
        // await this.page.waitForTimeout(5*1000);
        await this.saveButton.click({timeout:15000});
    }

    async addImage(){
        await this.addImageButton.click();
    }

    async toggleLoginDetails(){
        await this.loginDetailsButton.click();
    }

    async fillLoginDetails(username, password, status){
        await this.usernameBox.fill(username);
        await this.confirmPasswordBox.fill(password);
        await this.passwordBox.fill(password);
        await this.page.getByLabel(status).check();
    }

    async fillPersonalDetails(license, licenseExpiry, nationality, maritalStatus, dob, gender){
        await this.license.fill(license);
        await this.licenseExpiry.fill(licenseExpiry);
        await this.nationality.click();
        await this.page.locator(`//div[@role="listbox"]//span[text()="${nationality}"]`).click();
        await this.maritalStatus.click();
        await this.page.locator(`//div[@role="listbox"]//span[text()="${maritalStatus}"]`).click();
        await this.dob.fill(dob);
        await this.page.getByLabel(gender, { exact: true }).click({ force: true });
    }


    successPop(){
        return this.page.locator('.oxd-toast');
    }

    getEmployeeName(){
        return this.employeeName;
    }

    getActiveTab(){
        return this.activeTab;
    }

    async savePersonalDetails(){
        await this.savePersonDetailsButton.click();
    }
}