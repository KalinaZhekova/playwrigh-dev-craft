import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


test.describe('Verify UI elements on the login page', () => {
  let loginPage: LoginPage;
    test.beforeEach(async ({page}) => {
            loginPage = new LoginPage(page);
            await loginPage.openLoginPage(); 
    });   
      
    test('Verify UI elements', async ({page})=> {
        const pageTextTitle = 'Member Login';
        const textInfo = ' Welcome back, enter your login details below to access your account ';                
    
          await loginPage.verifyTextTitle(pageTextTitle);
          await loginPage.verifyTextInfo(textInfo);  
          await loginPage.validateLoginButtonVisibility();     
          await loginPage.validateJoinHereLinkVisibility();            
    });      
});

