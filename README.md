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


Create a new household form, none demo version

![blank create house form](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/blank-form.png)


After a user has entered household data for submission, they are redirected to the house stats page.  This page shows expenses each roommate is responsible for and all of the household expenses.  The page allows a user to edit and delete all info.  The expense divider evenly splits all expenses over 300 dollars and pass out each expense under 300.  If there is any difference between each roommmates total amount due, the difference is made even through adding and subtracting from the largest monthly expense.


![Bills divided image](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/bills-divided.png)


![all bills image](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/all-bills.png)


Each household is given a unique url as opposed to a traditional log in system


![unique url image](https://github.com/sretundijr/second-capstone-bill-tracker/blob/master/images/unique-url.png)



Live app https://secure-coast-72425.herokuapp.com/

