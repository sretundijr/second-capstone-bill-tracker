# second-capstone-bill-tracker

This web app is used to track monthly household expenses and divide these expenses among roommates

The landing page as shown below, includes two entry points.  The first is used to create a new household 
and the second is a demo.  The demo is loaded with mock data to spare the users the time and energy of 
enter expenses and roommates.  While in the demo, the user can add and modify any existing data to experience 
the functionality.

![App intro page](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/landingPage.png)


The following screen is used to create a household.  It includes three forms, the first for entering the household name.  The second is used to enter a roommate and the third is for entering an expense.  User data is validated for each submission.  In order to submit the household, there is a requirement of atleast one roommate and one expense.  Once this requirement is met a submit button renders to the UI.  

Demo version

![Create house form](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/demo-create-house-form.png)


Submit house rendering


![Submit house button rendered](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/submit-house-image.png)


Create a new household form, non-demo version

![blank create house form](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/blank-form.png)


After a user has entered household data for submission, they are redirected to the house stats page.  This page shows expenses each roommate is responsible for and all of the household expenses.  The page allows a user to edit and delete all info.  The expense divider evenly splits all expenses over 300 dollars and pass out each expense under 300.  If there is any difference between each roommmates total amount due, the difference is made even through adding and subtracting from the largest monthly expense.


Divison of bills


![Bills divided image](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/bills-divided.png)


All bills listed


![all bills image](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/all-bills.png)


Each household is given a unique url as opposed to a traditional log in system


![unique url image](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/unique-url.png)


Due to the amount of content displayed on each page, there is seperate mobile rendering strategy

The following screen shots show the household creation process on a mobile device

Create a roommate

 ![create roommate mobile rendering](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/mobile-create-roommate.png)

 Create an expense

 ![create an expense mobiile rendering](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/mobile-create-expense.png)


The following are screen shots of the mobile rendering for the household stats page

View all expenses

![mobile rendering for all expenses](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/mobile-stats-expenses.png)

View roommates amount due

![mobile rendering for roommates expenses](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/mobile-stats-roommate-expenses.png)

Add a new roommate in mobile

![mobile add a new roommate in the stats page](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/mobile-stats-add-roommate.png)

Add a new expense view in mobile 

![mobile add a new expense in the stats page](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/mobile-stats-add-expense.png)


This application included unit tests and endpoint test

![image of unit tests and endpoint test](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/all-test-passing.png)


The application used webpack for the client side build.  See package json and webpack config for setup details

![webpack build](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/webpack-build.png)


Thank you for visiting my app.  I hope that you have enjoyed it as much as I enjoyed building it.  It was a great learing expeirence and my first full stack app.  The link below is to the live version.


Live app https://secure-coast-72425.herokuapp.com/

