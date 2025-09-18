# Install command
    1. npx create-next-app@latest frontend-nextjs [This is folder name]
        √ Would you like to use TypeScript? ... No / Yes
        √ Would you like to use ESLint? ... No / Yes
        √ Would you like to use Tailwind CSS? ... No / Yes
        √ Would you like your code inside a `src/` directory? ... No / Yes
        √ Would you like to use App Router? (recommended) ... No / Yes
        √ Would you like to use Turbopack for `next dev`? ... No / Yes
        √ Would you like to customize the import alias (`@/*` by default)? ... No / Yes
        Creating a new Next.js app in D:\2025\MERN\flask\frontend-nextjs.
    2. cd frontend-nextjs
    3. npm install
    4. npm run dev

# Bootstrap Setup
    open this file frontend-nextjs\pages\_document.js
    Paste this in after html tag
    <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
          crossorigin="anonymous"
          defer
        ></script>
    </Head>

# Route 
    nextjs in built route use pages folder and here

    Here's how routing works with the files you mentioned:
    File	                    URL Route	            Purpose
    pages/index.js	            /	                    Homepage
    pages/about.js	            /about	                About Page
    pages/contact.js	        /contact	            Contact Page
    pages/services.js	        /services	            Services Page (you can add this)
    pages/gallery.js	        /gallery	            Gallery Page (optional)
    pages/admin/login.js	    /admin/login	        Admin Login Page
    pages/admin/dashboard.js	/admin/dashboard	    Admin Dashboard Page
    pages/_app.js	            (global wrapper)	    Used to wrap every page (e.g., layout)
    pages/_document.js	        (HTML template)	        Used for customizing <html> and <body>

# Our basic Route
    /pages
    ├── index.js           --> "/"
    ├── about.js           --> "/about"
    ├── contact.js         --> "/contact"
    ├── admin/
    │   ├── login.js       --> "/admin/login"
    │   └── dashboard.js   --> "/admin/dashboard"

# route setup done but click and navigation krna eassy ho Yeh simple, clean, aur Next.js recommended way hai client-side routing ka.
    
    import Link from 'next/link';

    <Link href="/about">About</Link> 


# Nextjs build Command as production level
    for check
        npm i 
        npm run dev 
    then
        package.json
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint",
            "export": "next build && next export"               // Add this line
        
        next.config.mjs
            const nextConfig = {
                    reactStrictMode: true,
                    output: "export"                            // Add this line 
                };

            export default nextConfig;

    after use this command
        npm run export 
    
    check directory out folder name and this is build and copy or make zip and deploye

