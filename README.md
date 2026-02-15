# ITX Frontend Mobile Store

Single Page Application built with **React** and **Vite** for a mobile product catalog.

This project implements product listing, product detail navigation, cart persistence and client-side caching with TTL, following the requirements of the ITX frontend technical test.

---

## 🚀 Tech Stack

- React
- Vite
- React Router
- Vitest + Testing Library
- ESLint
- LocalStorage caching (TTL strategy)

---

### Product List Page (PLP)

- Fetches product list from API
- Real-time search filtering by brand and model
- Responsive product grid

### Product Details Page (PDP)

- Displays detailed product information
- Select product options (color & storage)
- Add to cart functionality

### Cart

- Persistent cart counter using Context API
- LocalStorage synchronization

### Caching

- Client-side caching layer
- Time To Live (TTL) strategy (1 hour)
- Prevents unnecessary API calls

### Testing

- Integration test for ProductDetailsPage
- API calls mocked with Vitest

---

## 🛠 Installation

```bash
npm install
```
