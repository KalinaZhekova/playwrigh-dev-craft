import {Locator, Page, expect} from '@playwright/test';
import { BasePage } from './base-page';
import { users, User } from '../data/users';
import { config } from '../config/config';



export class SignUpPage extends BasePage {
    private emailAddressInput: Locator;
    private passwordInput: Locator;
    private registerButton: Locator;
    private welcomeSubtitle: Locator;
    private welcomeTitle: Locator;     
    private checkBoxTermsConditions: Locator;
    private verificationCodeForm: Locator;
    private verificationCodeText: Locator;
    private alertMsgInvalidEmail: Locator;
    private errorMsgExistingEmail: Locator;
    private alertMsgMissingPsw: Locator;
    private alertIconCheckBox: Locator;
    private requiredFieldMsg: Locator;
    private signupUrl: string;

    constructor(page: Page) {
        super(page); 
        this.page = page; 
        this.emailAddressInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.registerButton = page.locator('#signupStep1Next'); 
        this.welcomeTitle = page.locator('#welcomeTitle'); 
        this.welcomeSubtitle = page.locator('#welcomeSubtitle');         
        this.checkBoxTermsConditions = page.locator('.q-checkbox__icon-container'); 
        this.verificationCodeForm = page.locator('#verificationCodeForm');
        this.verificationCodeText = page.getByText('Verification code sent', { exact: true });
        this.alertMsgInvalidEmail = page.locator('div[role="alert"]');
        this.errorMsgExistingEmail = page.locator('div.q-banner__content');
        this.alertMsgMissingPsw = page.locator('div.q-field__messages div[role="alert"]');
        this.alertIconCheckBox = page.locator('i.q-icon.text-negative');
        this.requiredFieldMsg = page.locator('.q-field__messages > div[role="alert"]');
        this.signupUrl = `${config.baseUrl}${config.signupUrl}`;       


      }

async openSignupPage(): Promise<void> {
    await this.navigate(this.signupUrl);
  }

async verifyWelcomeTitle(expectedText: string) {
    await expect(this.welcomeTitle).toHaveText(expectedText); 
  }

async verifyWelcomeSubtitle(expectedText: string) {
    await expect(this.welcomeSubtitle).toHaveText(expectedText);  
  }

async validateRegisterButtonVisibility() {
    const registerButton = this.registerButton;
    await expect(registerButton).toBeVisible();  
  }

async loginAs(userKey: keyof typeof users) {
        const user: User = users[userKey];
        await this.emailAddressInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.registerButton.click();
    }

async checkBoxClick() {
    const checkBoxTermsConditions = this.checkBoxTermsConditions;
    await expect(checkBoxTermsConditions).toBeVisible();
    await this.checkBoxTermsConditions.click();
    }

async registerButtonClick() {
    const registerButton = this.registerButton;
    await expect(registerButton).toBeVisible();
    await this.registerButton.click();
    }

async verifyVerificationCodeFormVisibility() {
    const verificationCodeForm = this.verificationCodeForm;
    await expect(verificationCodeForm).toBeVisible();
    }

async verifyVerificationFormTextVisibility() {
    const verificationCodeText = this.verificationCodeText;
    await expect(verificationCodeText).toBeVisible();
    }

async verifyAlertMessageInvalidEmail(expectedText: string) {
  await expect(this.alertMsgInvalidEmail).toHaveText(expectedText);
}

async verifyErrorMessageExistingEmail(expectedText: string) {
  await expect(this.errorMsgExistingEmail.first()).toHaveText(expectedText);
}

async verifyAlertMsgMissingPwd(expectedText: string) {
  await expect(this.alertMsgMissingPsw.first()).toHaveText(expectedText);
}

async verifyAlertMsgMissingCheckBox(expectedText: string) {
    await expect(this.alertIconCheckBox).toBeVisible(); //check if the alert icon is visible
    await expect(this.requiredFieldMsg).toHaveText(expectedText);

}

async completeSignUpFlow(
  userKey: keyof typeof users,
  clickCheckbox: boolean = true,
  welcomeTitle: string = '7 days free',
  welcomeSubtitle: string = 'Then £4.99/month'
): Promise<void> {
  await this.verifyWelcomeTitle(welcomeTitle);
  await this.verifyWelcomeSubtitle(welcomeSubtitle);
  await this.validateRegisterButtonVisibility();
  
  await this.loginAs(userKey); 
  if (clickCheckbox) {
    await this.checkBoxClick();
  }
  await this.registerButtonClick();
}
}
