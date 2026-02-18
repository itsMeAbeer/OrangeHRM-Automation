export class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name : 'Username' });
        this.passwordField = page.getByRole('textbox', { name : 'Password' });
        this.loginButton = page.getByRole('button', { name : 'Login' });
    }

    async goto(){
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username, password){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });
        await this.loginButton.click();
    }

    async getUsernameField(){
        return this.usernameField;
    }

}