
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

// --- Types & Mock Data ---
interface Product {
  id: string;
  name: { ru: string; uz: string };
  category: string;
  priceRetail: number;
  priceWholesale: number;
  stock: number;
  sellerId: string;
}

interface Order {
  id: string;
  customerId: string;
  items: any[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin' | 'courier';
}

let products: Product[] = [
  { id: '1', name: { ru: 'Цемент М450', uz: 'Sement M450' }, category: 'materials', priceRetail: 45000, priceWholesale: 38000, stock: 200, sellerId: 's1' },
  { id: '5', name: { ru: 'Дрель Makita', uz: 'Makita drel' }, category: 'tools', priceRetail: 1250000, priceWholesale: 1100000, stock: 15, sellerId: 's5' },
];

let orders: Order[] = [
  { id: 'ORD-001', customerId: 'u1', items: [], total: 1200000, status: 'pending', createdAt: new Date().toISOString() }
];

let users: User[] = [
  { id: 'u1', name: 'Иван Иванов', email: 'ivan@stroy.uz', role: 'buyer' },
  { id: 's1', name: 'StroyMarket LLC', email: 'sales@stroy.uz', role: 'seller' },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---

  // Products CRUD
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const newProduct = { ...req.body, id: Date.now().toString() };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    products = products.map(p => p.id === id ? { ...p, ...req.body } : p);
    res.json(products.find(p => p.id === id));
  });

  app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== id);
    res.status(204).send();
  });

  // Orders CRUD
  app.get("/api/orders", (req, res) => {
    res.json(orders);
  });

  app.patch("/api/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    orders = orders.map(o => o.id === id ? { ...o, status } : o);
    res.json(orders.find(o => o.id === id));
  });

  // Users CRUD
  app.get("/api/users", (req, res) => {
    res.json(users);
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
