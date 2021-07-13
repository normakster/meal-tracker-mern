# Overview
- Purpose
- Scope

## Product Description
- A Nutritional OKR system (objective and key result) for users and their advisers.
- To facilitate nutritional awareness and answer the question "What should I eat right now".
- Tracks from Grocery through Pantry to Consumption and Nutrients.
- Compares historic data to goals and/or guidelines to influence behavior.

## Product functional capabilities
- Scan UPC
  - Search FDA database and (unknown) UPC database to make a Nutrient Profile (NP).
  - Enter N.P. into "Pantry" with a quantity
  - Store UPC/N.P. in a separate repository.
- Draw from Panty or Scan UPC
  - Combine with other ingredients
  - Either Store in Pantry or Consume.
- Present Dashboard with Graphs and recommendations.
- Meal Plan based on pantry, history, allergies, and preferences.
- Update profile data for formulas' use.
- Generate Shopping lists
- Accept limited input from Advisors.
  - Targets, rates, nutrients requirements.
- Food Journaling subjectives.
- Allergy preferences and consumption history.
- Public Recipe repository.
- Public UPC repository.

## User Roles
- End user
  - Primary
  - Household
    - Groceries, Shared Pantry, Shopping Lists
- Advisers
  - Nutritionists
  - Doctors?
  - Coaches?
- Auditors
  - Researchers?
  - Regulators
- Admin
  - Customer support
  - Technical

## Use Cases for all operations
1. End User
  1. Grocery Shops
    - Pre Store: Generate a shopping list from pantry vs. meal plan.
    - Post Store: Scan UPCs and log quantities into pantry.
  1. Cooks
    - Combine pantry items into a New Meal.
  1. Eats
    - Consume 0-100% of New Meal.
  1. Leftovers
    - Store in pantry (1-Eat%) of New Meal.
  1. Meal Plans
    - Suggest recipes from preferences vs. pantry vs. targets
  1. Records Recipe
  1. Export/Print
    - Shopping List
    - Transactional Meal History
1. Advisers
  1. Reviews specific targeted data needed to advise.
  1. Adjusts 'levers' in users' profile to achieve users' goals.
  1. Serves as a 'Food Journal' by showing aggerate trends.

## General constraints

## Assumptions
- Authoritative nutritional formulas [cite sources when used]
- Possession of a camera for scanning UPC capabilities.
- Access to internet (cloud based service)
- USA demographic (from UPC/FDA use)

## Other software
- API for direct access to meal history to be consumed by approved 3rd party apps (Google Fit, MyFitnessPal, WeightWatchers)
- Export to file transactional history of meals.
- FDA API
- Third party (unknown) UPC/barcode API
- Brocade.io possible integration
