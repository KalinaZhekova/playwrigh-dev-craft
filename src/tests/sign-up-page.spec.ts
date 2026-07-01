import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { SignUpPage } from '../pages/sign-up-page';


test.describe('Register new memeber', () => {
  let loginPage: LoginPage;
  let signUpPage: SignUpPage;
    test.beforeEach(async ({page}) => {
            loginPage = new LoginPage(page);
            signUpPage = new SignUpPage(page);
            await loginPage.openLoginPage(); 
            await loginPage.joinHereLinkClick();
    });    
      
    test('Valid credentials flow', async ({page})=> {        
        await signUpPage.completeSignUpFlow('new_user');
        await signUpPage.verifyVerificationCodeFormVisibility();
        await signUpPage.verifyVerificationFormTextVisibility();
    }); 
    
    test('Invalid email credentials flow', async ({page})=> {        
        const alertMessgaeInvalidEmail = 'Invalid e-mail';
        await signUpPage.completeSignUpFlow('invalid_email_user');          
        await signUpPage.verifyAlertMessageInvalidEmail(alertMessgaeInvalidEmail);          
    }); 

    test('Existing email credentials flow', async ({page})=> {
        const errorMessageExistingEmail = 'User with this email already exist';    
        await signUpPage.completeSignUpFlow('existing_user');
        await signUpPage.verifyErrorMessageExistingEmail(errorMessageExistingEmail);          
    });
    
    test('Missing password flow', async ({page})=> {        
        const alerMessageMissingPassword = 'Required field';                             
        await signUpPage.completeSignUpFlow('missing_pwd_user');
        await signUpPage.verifyAlertMsgMissingPwd(alerMessageMissingPassword);          
    });

    test('Valid credentials and checkbox NOT checked', async ({page})=> {        
        const alerMessage = 'Required field';                             
        await signUpPage.completeSignUpFlow('new_user', false);
        await signUpPage.verifyAlertMsgMissingCheckBox(alerMessage);          
    });
});

