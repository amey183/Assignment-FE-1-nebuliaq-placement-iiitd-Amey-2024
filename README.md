# Assignment-FE-1-nebuliaq-placement-iiitd-Amey-2024

Fat Table Implementation
Overview
This project implements a dynamic web table in React.js that displays service metrics in a consolidated "fat row" format. The table supports filtering by service name or side (client/server) and sorting by various metrics.

Features

Dynamic Fat Table: Displays service metrics with client and server data grouped under each service.<br/>
Filtering: Filter services by name or side (client/server).<br/>
Sorting: Sort the table based on different metrics such as requests, rate, and error percentages.<br/>
Responsive Design: The table is responsive and performs well with large datasets.<br/>

Project Structure

src/data.js: Contains the sample data structure used by the table.<br/>
src/FatTable.js: The main component that renders the table with filtering and sorting functionalities.<br/>
src/FatTable.css: Contains the CSS styling for the table.<br/>
src/App.js: The entry point of the application where the FatTable component is imported and rendered.<br/>

Installation
To run this project locally, follow these steps:

Clone the Repository:
git clone <repository-url>

Navigate to the Project Directory:
cd fat-table

Install Dependencies:
npm install

Start the Development Server:
npm start
The application should now be running on http://localhost:3000.

Usage
Filtering: Use the input box to filter services by name and the dropdown to filter by client or server side.
Sorting: Click on the column headers to sort the data by that metric.

Replace <repository-url> with the actual URL of your Git repository. You can also add or remove sections based on the specific details of your project.
