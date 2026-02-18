export class Dashboard{
    constructor(page){
        this.page = page;
        this.header = page.locator('//h6');
        this.pim = page.locator('//span[@class="oxd-text oxd-text--span oxd-main-menu-item--name"]').filter({ hasText: 'PIM' });
    }

    getHeader(){
        return this.header;
    }

    async gotoPIM(){
        await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });
        await this.pim.click()
    }
}