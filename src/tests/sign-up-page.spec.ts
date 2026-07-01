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
        const alertMessageInvalidEmail = 'Invalid e-mail';
        await signUpPage.completeSignUpFlow('invalid_email_user');          
        await signUpPage.verifyAlertMessageInvalidEmail(alertMessageInvalidEmail);          
    }); 

    test('Existing email credentials flow', async ({page})=> {
        const errorMessageExistingEmail = 'User with this email already exist';    
        await signUpPage.completeSignUpFlow('existing_user');
        await signUpPage.verifyErrorMessageExistingEmail(errorMessageExistingEmail);          
    });
    
    test('Missing password flow', async ({page})=> {        
        const alertMessageMissingPassword = 'Required field';                             
        await signUpPage.completeSignUpFlow('missing_pwd_user');
        await signUpPage.verifyAlertMsgMissingPwd(alertMessageMissingPassword);          
    });

    test('Valid credentials and checkbox NOT checked', async ({page})=> {        
        const alerMessage = 'Required field';                             
        await signUpPage.completeSignUpFlow('new_user', false);
        await signUpPage.verifyAlertMsgMissingCheckBox(alerMessage);          
    });
});
test.describe.skip('Sign Up Page - Additional Tests', () => {
  let loginPage: LoginPage;
  let signUpPage: SignUpPage;
  
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    signUpPage = new SignUpPage(page);
    await loginPage.openLoginPage();
    await loginPage.joinHereLinkClick();
  });

  // Edge Cases
  test('Email with spaces', async ({page})=> {
    // TODO: implement
  });
  
  test('Very long email address', async ({page})=> {
    // TODO: implement
  });
  
  test('Email case sensitivity', async ({page})=> {
    // TODO: implement
  });
  
  test('Password with special characters', async ({page})=> {
    // TODO: implement
  });  

  // Form Submission
  test('Double click register button - should not submit twice', async ({page})=> {
    // TODO: implement
  });  

  // Verification & Input Behavior
  test('Can enter verification code', async ({page})=> {
    // TODO: implement
  });  
  
  test('Password visibility toggle (if exists)', async ({page})=> {
    // TODO: implement
  });

  test('Submit form with Enter key on password field', async ({page})=> {
    // TODO: implement
  });

  // Links & Navigation
  test('Links are clickable', async ({page})=> {
    // TODO: implement
  });
  
  test('Links are redirecting in another tab', async ({page})=> {
    // TODO: implement
  });  
});

