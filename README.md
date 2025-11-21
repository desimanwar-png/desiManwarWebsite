# Desi Manwar Pvt Ltd Website

This repository contains the codebase for the official website of Desi Manwar Private Limited, an export-import company specializing in premium food commodities. The website is built using Next.js and aims to provide a comprehensive online presence, showcasing products, services, company information, and facilitating customer inquiries.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Pages & Components](#key-pages--components)
- [Admin Panel](#admin-panel)
- [Database Schemas](#database-schemas)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Dynamic Homepage:** Engaging hero section with image carousel, "About Us" overview, "Our Top Products", "Why Choose Us" section, "Meet Our Members" and customer testimonials.
- **Products Page:** Displays a catalog of all available products with detailed product pages.
  - Product Details: Dedicated page for each product with image, description, specifications, FSSAI certification status, and options for "One Pager" and "COA Report" downloads.
- **Commodity Page:** Showcases specific commodities (e.g., Brazilian Sugar) with detailed features and a call to action.
- **Certificates Page:** Displays company certificates, with a full-screen image view on click.
- **About Us Page:** Provides in-depth information about the company's mission, vision, values, and team members.
- **Contact Us Page:** Features contact information, a contact form with submission functionality, and an embedded Google Map.
- **FAQ Page:** Comprehensive list of frequently asked questions with an interactive accordion design.
- **Terms & Conditions Page:** Detailed terms and conditions for using the service.
- **Privacy Policy Page:** Outlines the company's privacy practices and data handling.
- **Admin Panel:** (Backend functionality for managing content)
- **Responsive Design:** Optimized for various screen sizes (desktop, tablet, mobile).
- **Theme Toggling:** Light and dark mode support for improved user experience.
- **Form Handling:** Robust form submissions for quotes and contact messages via server actions.
- **Image Uploads:** Handled for dynamic content (e.g., certificates, member profiles).

## Technologies Used

- **Next.js:** React framework for building performant web applications (App Router, Server Components, Client Components, Server Actions).
- **React.js:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript for type-safe code.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Shadcn/ui:** Reusable UI components built with Tailwind CSS and Radix UI.
- **Mongoose & MongoDB:** ODM (Object Data Modeling) for MongoDB, providing schema-based solution to model application data.
- **bcryptjs:** Library for hashing passwords.
- **jsonwebtoken:** For implementing JWT-based authentication (used in admin/login).
- **Sonner:** A toast library for notifications.
- **Lucide React:** A collection of beautiful open-source icons.

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd desi_manwar_pvt_ltd
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=a_very_secret_key_for_jwt_token_generation
    ```
    Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., from MongoDB Atlas) and `a_very_secret_key_for_jwt_token_generation` with a strong, random string for JWT signing.

## Environment Variables

-   `MONGODB_URI`: Your MongoDB connection string.
-   `ACCESS_TOKEN_SECRET`: A secret key used for signing JWT tokens for authentication.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
-   `npm run build`: Builds the application for production to the `.next` folder.
-   `npm run start`: Starts a production Next.js server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

```
.
├── app/
│   ├── (client)/             # Client-facing pages (products, commodity, certificates, about-us, contact, faq, terms-and-conditions, privacy-policy, get-a-quote)
│   ├── admin/                # Admin panel pages and server actions
│   ├── components/           # Layout components (FooterWrapper, NavbarWrapper)
│   ├── login/                # Login page and server actions
│   ├── About.tsx             # Homepage About section
│   ├── Footer.tsx            # Global Footer component
│   ├── Hero.tsx              # Homepage Hero section (carousel)
│   ├── Navbar.tsx            # Global Navbar component
│   ├── page.tsx              # Homepage main entry
│   ├── TeamMembers.tsx       # Homepage Team Members section
│   ├── TestimonialsSection.tsx # Homepage Testimonials section
│   ├── TopProducts.tsx       # Homepage Top Products section
│   └── WhyChooseUs.tsx       # Homepage Why Choose Us section
├── components/               # Reusable UI components (shadcn/ui overrides, custom elements)
│   └── ui/                   # Shadcn/ui components (button, input, card, etc.)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions (dbConnect, imageUtils, utils)
├── models/                   # Mongoose schemas for MongoDB (Product, User, Certificate, etc.)
├── public/                   # Static assets (images, fonts, etc.)
├── .env                      # Environment variables (not committed)
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── ... other config files
```

## Key Pages & Components

-   **Home Page (`app/page.tsx`):** Orchestrates various sections like `Hero`, `About`, `TopProducts`, `WhyChooseUs`, `TeamMembers`, `TestimonialsSection`.
-   **Products Page (`app/(client)/products/page.tsx`):** Displays a grid of `ProductCard` components, linking to individual product detail pages.
-   **Product Details Page (`app/(client)/products/[slug]/page.tsx`):** Dynamic page showcasing detailed product information fetched by slug.
-   **Commodity Page (`app/(client)/commodity/page.tsx`):** Features "Brazilian Sugar" with specific highlights and a call-to-action.
-   **Certificates Page (`app/(client)/certificates/page.tsx`):** Lists company certificates with a full-screen image viewer.
-   **About Us Page (`app/(client)/about-us/page.tsx`):** Sections for Mission, Vision, Values, and Team Members.
-   **Contact Us Page (`app/(client)/contact/page.tsx`):** Form for inquiries and contact details.
-   **FAQ Page (`app/(client)/faq/page.tsx`):** Accordion-style display of common questions.
-   **Terms & Conditions (`app/(client)/terms-and-conditions/page.tsx`):** Static content for legal terms.
-   **Privacy Policy (`app/(client)/privacy-policy/page.tsx`):** Static content for privacy policy.
-   **Get a Quote (`app/(client)/get-a-quote/page.tsx`):** Multi-step form for requesting product quotes.

## Admin Panel

The `app/admin` directory contains pages and server actions for managing various aspects of the website content, including:

-   **Certificates:** Add, edit, delete company certificates.
-   **Contact Us Submissions:** View and manage messages from the contact form.
-   **Members:** Manage team members, their details, and social links.
-   **Newsletter Subscribers:** View and export newsletter subscriptions.
-   **Products:** Add, edit, delete products, manage their visibility and details.
-   **Quotes:** View and manage quote requests.
-   **Testimonials:** Manage customer testimonials.
-   **Users:** Manage user accounts (admin privileges, etc.).

## Database Schemas

The `models` directory defines the Mongoose schemas for the MongoDB database:

-   `Category.ts`
-   `Certificates.ts`
-   `ContactUs.ts`
-   `Member.ts`
-   `NewsLetter.ts`
-   `Product.ts`
-   `Quotes.ts`
-   `Testimonials.ts`
-   `User.ts`

## Deployment

The project is a Next.js application and can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or a custom Node.js server. Ensure all environment variables are correctly set during deployment.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

[Specify your license here, e.g., MIT License]

## Contact

For any inquiries or support, please contact [Your Name/Company Name] at [Your Email Address].