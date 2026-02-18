import { expect, test } from "../fixtures/baseTest";

test('Orange HRM', async ({ loginPage, loginData, employeeLoginData, testData, employeeData, personalDetailsData, dashboard, pim})=>{
    await test.step('Login Page', async ({ })=>{
        await loginPage.goto();
        await expect(loginPage.page).toHaveTitle('OrangeHRM');
        await expect(loginPage.usernameField).toBeVisible();
        await loginPage.login(loginData[0].username, loginData[0].password);
    }
    );

    await test.step('Dashboard', async ({ })=>{
        await expect(dashboard.getHeader()).toBeVisible();
        await expect(dashboard.getHeader()).toHaveText('Dashboard');
        await expect(dashboard.pim).toBeVisible();
        await dashboard.gotoPIM();

    })

    await test.step('PIM', async ({ })=>{
        console.log(await pim.getMainHeader().innerText());
        await expect(pim.getMainHeader()).toBeVisible();
        console.log(await pim.addEmployeeButton.innerText());
        await pim.addEmployee();
        console.log(await pim.getSubHeader().innerText());
        await expect(pim.getSubHeader()).toBeVisible(); 
        const employee = employeeData[0];
        let employeeID = await pim.getEmployeeID().inputValue();
        await pim.saveEmployee();
        let idExists = await pim.getIdError().isVisible();
        while(idExists){
            employeeID = (parseInt(employeeID) + 1).toString();
            await pim.fillEmployeeID(employeeID);
            await pim.saveEmployee();
            idExists = await pim.getIdError().isVisible();
        }
        await pim.fillEmployeeDetails(employee.firstName, employee.middleName, employee.lastName);
        var username = employee.firstName + employeeID;
        const fileChooserPromise = pim.page.waitForEvent('filechooser');
        await pim.addImage();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(testData.employeeImagePath);
        await pim.toggleLoginDetails();
        const loginData = employeeLoginData[0];
        console.log(await username);
        await pim.fillLoginDetails(username, loginData.password, loginData.status);

        // await Promise.all([
        //     expect(pim.successPop()).toBeVisible({ timeout: 30000 }),
        //     pim.saveEmployee()
        // ]);
        await pim.saveEmployee();
        let success = await pim.successPop().isVisible();
        while(success){
            employeeID = (parseInt(employeeID) + 1).toString();
            await pim.fillEmployeeID(employeeID);
            await pim.saveEmployee();
            success = await pim.successPop().isVisible();
        }
        await testData.updateEmployeeID(employee.firstName, employee.lastName, employeeID);
        await testData.updateUsername(employee.firstName, employeeID);
        var username = employee.firstName + employeeID;
        await expect(pim.getActiveTab()).toContainText('Personal Details');
        await expect(pim.getEmployeeName()).toBeVisible();
        await expect(pim.getEmployeeName()).toContainText(employee.firstName + ' ' + employee.lastName);
        const personalDetails = personalDetailsData[0];
        await pim.fillPersonalDetails(personalDetails.license, personalDetails.licenseExpiry, personalDetails.nationality, personalDetails.maritalStatus, personalDetails.dob, personalDetails.gender);
        await pim.savePersonalDetails();
        await expect(pim.successPop()).toBeVisible({ timeout: 30000 });
        console.log('Successfully updated');
    })  
})