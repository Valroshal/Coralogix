# CurrencyConverter

CurrencyConverter is a web application built with Angular to convert currencies, view historical exchange rates, 
and visualize trends in currency exchange rates over the past week.

## Features

This application consists of three main pages:

### 1. **Currency Converter**
   - A user-friendly page where you can:
     - Enter an amount in the base currency.
     - Select the base and target currencies.
     - View the converted result instantly.
   - Includes validation to ensure the inputs are correct.

### 2. **History**
   - Displays the history of your currency conversion transactions.
   - Conversion history is stored locally using `localStorage` and persists even after the app is refreshed.

### 3. **Chart**
   - Visualizes currency trends over the past week using a line chart.
   - Allows users to:
     - Select a base currency.
     - Select a target currency.
   - The chart dynamically updates based on the selected currencies, showing how the exchange rate changed over time.

## Packages Used

The following packages and libraries were used to build the application:

1. **Angular**
   - Framework used to build the application.

2. **RxJS**
   - Used for managing asynchronous data streams, such as HTTP requests to fetch currency exchange rates.

3. **ng2-charts**
   - A lightweight wrapper around Chart.js to create interactive charts.
   - Used in the **Chart** page to display currency trends.

4. **Chart.js**
   - A JavaScript library used for creating charts and graphs.
   - Provides the core functionality for rendering the line chart in the **Chart** page.

5. **Bootstrap (CSS only)**
   - Provides basic styling for the app's UI components.
   - Helps with responsive design.


---

## Note on the Select Component

The `Select` component was initially intended to be a reusable, general-purpose dropdown component. However, due to time constraints, it was implemented specifically for the needs of this project and is not entirely generalized. Future updates may include enhancements to make it more reusable for other contexts.

---

## How to Run the Project Locally

1. Clone the repository:
   
```bash
git clone https://github.com/Valroshal/Coralogix.git
```
2. Navigate to the project directory:

```bash
cd currency-converter
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
ng serve
```
Open http://localhost:4200 in your browser.

## How to Access the Deployed App

https://valroshal.github.io/Coralogix/browser 

