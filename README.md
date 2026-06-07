# Movie Booking System

A full-stack movie ticket booking platform built with React.js and Spring Boot, featuring real-time seat selection, Stripe payment integration, and role-based access control for 2 user types.

**Live Demo:** https://movie-booking-systm.netlify.app  
**Backend API:** https://movie-booking-system-479f.onrender.com/app

---

## Features

### Customer
- Register and login with email verification
- Browse now-showing movies
- Search movies by title, genre, language
- Real-time seat selection
- Stripe payment integration
- View booking history and download receipts
- Booking confirmation email

### Theater Owner
- Register as theater owner
- Add and manage theaters
- Add movies with poster upload
- Create screens and configure seating
- Schedule shows with pricing

### Authentication
- JWT-based authentication
- Email verification via Brevo API
- Role-based access control (Customer, Theater Owner)
- Google OAuth2 login support

---

## Tech Stack

**Frontend:** React.js, React Router, Axios, Material UI, Stripe.js

**Backend:** Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL, Stripe, Cloudinary, Brevo API

**Deployment:** Netlify (frontend), Railway (backend), Railway MySQL, Cloudinary

---

## Local Setup

### Backend

1. Clone the repository
```bash
git clone https://github.com/Haarika-krishna/movie_booking_system.git
cd movie_booking_system/Backend
```

2. Set environment variables in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/movie_booking
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
brevo.api.key=your_brevo_api_key
stripe.api.key=your_stripe_secret_key
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret
```

3. Run the backend:
```bash
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

---

### Frontend

1. Navigate to frontend:
```bash
cd movie_booking_system/Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api'
```

4. Run the frontend:
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Login |
| GET | `/api/auth/verify?token=` | Verify email |

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/shows/now-showing` | Get now showing |
| GET | `/api/public/movies` | Get all movies |
| GET | `/api/public/theaters` | Get all theaters |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/dashboard` | User dashboard |
| GET | `/api/user/bookings` | My bookings |
| POST | `/api/user/booking` | Create booking |
| POST | `/api/user/create-payment-intent` | Stripe payment |
| GET | `/api/user/shows/{id}/seats` | Get show seats |

### Theater Owner
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/theater-owner/theaters` | Add theater |
| GET | `/api/theater-owner/theaters` | My theaters |
| POST | `/api/theater-owner/movies` | Add movie |
| POST | `/api/theater-owner/screens` | Add screen |
| POST | `/api/theater-owner/shows` | Schedule show |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SPRING_DATASOURCE_URL` | MySQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | DB password |
| `JWT_SECRET` | JWT signing secret |
| `BREVO_API_KEY` | Brevo email API key |
| `STRIPE_API_KEY` | Stripe secret key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## Test Payment

| Field | Value |
|-------|-------|
| Card Number | 4242 4242 4242 4242 |
| Expiry | 12/34 |
| CVC | 123 |

---

## Author

**Harika Boini**  
Full Stack Developer | MCA Graduate, Osmania University

- Email: harika.boini.dev@gmail.com
- LinkedIn: https://linkedin.com/in/harika-boini
- GitHub: https://github.com/Haarika-krishna
