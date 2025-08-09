# Redis Pub/Sub with NestJS

This repository demonstrates **Redis Pub/Sub** using two separate NestJS applications:

1. **Publisher** (`nest-redis-publisher`)

   - Runs on port **3001**
   - Exposes a `POST` REST endpoint to publish messages to Redis.

2. **Subscriber** (`nest-redis-subscriber`)
   - Runs on port **3000**
   - Subscribes to the Redis channel `"my-channel"`, logs received messages, and stores them in Redis with the **timestamp** as the key and **message** as the value.
3. **Redis**
   - Runs on port **6379**

---

## 📂 Folder Structure

```plaintext
redis-pub-sub-nestjs-app/
│
├── nest-redis-publisher/   # Publisher app
├── nest-redis-subscriber/  # Subscriber app
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed on your system:

- **Node.js** ≥ 22.x
- **npm** ≥ 10.x
- **Redis** (running locally or via Docker)

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd redis-pub-sub-nestjs-app

```

# 🚀 Setup & Installation

## 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd redis-pub-sub-nestjs-app
```

## 2️⃣ Start Redis

You can run Redis locally or via Docker.

### **Option 1 — Local Redis**

If Redis is already installed on your system:

```bash
redis-server
```

### **Option 2 — Docker Redis**

If you prefer running Redis via Docker:

```bash
docker run --name redis-pubsub -p 6379:6379 -d redis
```

The container will run in detached mode and expose Redis on localhost:6379.

## 3️⃣ Install Dependencies

### **Install Publisher Dependencies**

```bash
cd nest-redis-publisher
npm install
```

### **Install Subscriber Dependencies**

```bash
cd nest-redis-subscriber
npm install
```

## ▶️ Running the Applications

### **Start the Subscriber (Port 3000)**

```bash
cd nest-redis-subscriber
npm run start:dev
```

- Connects to Redis and subscribes to `my-channel`.
- Logs all received messages.
- Saves messages in Redis with the current timestamp as the key.

### **Start the Publisher (Port 3001)**

```bash
cd nest-redis-publisher
npm run start:dev
```

- Exposes a **POST** endpoint for publishing messages to Redis.

## 📡 Testing Redis Pub/Sub

### **Step 1 — Send a Message via Publisher**

```bash
curl -X POST http://localhost:3001/publish \
  -H "Content-Type: application/json" \
  -d '{ "message": "Test Message" }'
```

#### **Channel**: my-channel

#### **Payload Example**:

```json
{
  "message": "Test Message"
}
```

### **Step 2 — Check Subscriber Logs**

In the Subscriber terminal, you should see:

```vbnet
📩 Received message from channel "my-channel": Test Message
💾 Saved to Redis: 1723189045123 -> Test Message
```

### **Step 3 — Verify Saved Data in Redis**

Open Redis CLI:

```bash
redis-cli
```

List all saved keys:

```bash
KEYS *
```

Retrieve a value:

```bash
GET <key>
```

## 📝 How It Works

### Publisher

- Receives POST requests at `/publish`.
- Publishes the message to Redis channel `my-channel`.

### Subscriber

- Subscribes to `my-channel`.
- Logs each incoming message.
- Stores each message in Redis:
