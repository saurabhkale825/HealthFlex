# Multi-Timer React Native App

# **Setup Instructions**
Ensure you have the following installed:
- Node.js (v14+)
- Expo CLI

#**Project Structure**
 my-timer-app
 ┣  src
 ┃ ┣  components  # Reusable UI components
 ┃ ┣  screens     # Main screens (Home, Add Timer, History)
 ┃ ┣  context     # Timer context and reducer logic
 ┃ ┣  assets      # Images and icons
 ┃ ┣ App.js        # Entry point of the app
 ┃ ┗ styles.js     # Global styles
 ┣  package.json
 ┣  README.md
 ┗  .gitignore 


#**Assumptions made during developement**
- Timers has to be start manually by the user.
- Categories are predefined (Workout, Study, Break , Sleep) but can be extended.
- Timer duration are entered in minutes for better control across all activities.
- Completed timers are stored in history and can be exported as JSON.
- Modal popup notify users when timer is complete .
- Also modal popup notify users at halfway if users enable halfway alert.
- Bulk actions can be triggered for each category.

  
