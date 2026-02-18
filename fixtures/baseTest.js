import {test as base} from '@playwright/test';
import { ExcelOperations } from '../abeer_utils/excelOperations';
import { LoginPage } from '../abeer_pages/loginPage';
import { Dashboard } from '../abeer_pages/dashboard';
import { PIM } from '../abeer_pages/pim';

export const test = base.extend({
    testData: async({}, use)=>{
        const excelOperations = new ExcelOperations();
        await use(excelOperations);
    },
    
    loginData: async ({ testData }, use)=>{
        const loginData = testData.getLoginData();
        await use(loginData);
    },

    employeeData: async ({ testData }, use)=>{
        const employeeData = testData.getEmployeeData();
        await use(employeeData);
    },

    employeeLoginData: async ({ testData }, use)=>{
        const employeeLoginData = testData.getEmployeeLoginData();
        await use(employeeLoginData);
    },

    personalDetailsData: async ({ testData }, use)=>{
        const personalDetailsData = testData.getPersonalDetails();
        await use(personalDetailsData);
    },

    loginPage: async ({page}, use)=>{
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboard: async ({page}, use)=>{
        const dashboard = new Dashboard(page);
        await use(dashboard);
    },
    
    pim: async ( {page}, use)=>{
        const pim = new PIM(page);
        await use(pim);
    },
});

export { expect } from '@playwright/test';