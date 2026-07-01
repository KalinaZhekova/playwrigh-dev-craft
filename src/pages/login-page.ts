import {Locator, Page, expect} from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    private loginButton: Locator;
    private textTitle: Locator;
    private textInfo: Locator; 
    private joinHereLink: Locator;
    private loginUrl = 'https://code-staging-web.on.dev-craft.tech/login';

    constructor(page: Page) {
        super(page); 
        this.page = page; 
        this.loginButton = page.locator('#login'); 
        this.textInfo = page.locator('span.helvetica.text-h6'); 
        this.textTitle = page.locator('h1.text-primary'); 
        this.joinHereLink = page.getByRole('link', { name: 'Join here' });//page.locator('a.wc\:underline[href="/signup"]');                        
      }

async openLoginPage(): Promise<void> {
      await this.navigate(this.loginUrl);
    }

async verifyTextTitle(pageTextTitle: string) {
    await expect(this.textTitle).toHaveText(pageTextTitle);  
  }

async verifyTextInfo(pageTextInfo: string) {
    await expect(this.textInfo).toHaveText(pageTextInfo);  
  }

async validateLoginButtonVisibility() {
    const loginButton = this.loginButton;
    await expect(loginButton).toBeVisible();  
  } 

async validateJoinHereLinkVisibility() {
    const joinHereLink = this.joinHereLink;
    await expect(joinHereLink).toBeVisible();  
  }
  
async joinHereLinkClick(): Promise<void> {
  await expect(this.joinHereLink).toBeVisible();
  await this.joinHereLink.click();
}

async verifyUsersVisible(users: string[]) {
    for (const user of users) {
      const userLocator = this.page.locator('#login_credentials', { hasText: user });      
      await expect(userLocator).toBeVisible();
    }
  }

}
