# 🐳 Docker + PostgreSQL Setup Guide (Codespaces)

This guide walks you through installing Docker, setting up PostgreSQL inside a Docker container, connecting it to your app (via `.env`), and managing your container with common commands. Ideal for **first-time users**, **new team members**, or **anyone using GitHub Codespaces**.

---

## 📥 1. Docker Installation (If Needed)

> ⚠️ **Docker is pre-installed** in most GitHub Codespaces. You may skip this if it's already available.

To check if Docker is available:

```bash
docker --version
```

If it's not installed or you're setting this up locally instead of Codespaces, follow the steps below:

### 🖥️ Local Installation (Mac / Windows / Linux)

* **Install Docker Desktop**:
  [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

* **Linux (Debian/Ubuntu-based)**:

```bash
# Update the apt package index and install packages to allow apt to use a repository over HTTPS
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

# Add Docker’s official GPG key and set up the stable repository
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
docker --version
```

> 💡 You may need to add your user to the `docker` group to avoid using `sudo`:
>
> ```bash
> sudo usermod -aG docker $USER
> newgrp docker
> ```

---

## ⚙️ 2. Start PostgreSQL in Docker

Run the following command to start a PostgreSQL container in your Codespace or local machine:

```bash
docker run --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres
```

This will:

* Download the `postgres` Docker image (if not already present)
* Start a new container named `postgres`
* Expose PostgreSQL on `localhost:5432`

---

## 🧾 3. Set Up `.env` File

Update or create a `.env` file in the root of your project to match the container config:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

---

## 🛠️ 4. Run Prisma Migration (Optional, for Prisma Users)

If you're using Prisma for DB schema management, run:

```bash
npx prisma migrate dev --name init
```

This will create your schema tables in the Dockerized PostgreSQL instance.

---

## ▶️ 5. Manage Your PostgreSQL Container

| Action       | Command                   | Description                            |
| ------------ | ------------------------- | -------------------------------------- |
| ✅ Start DB   | `docker start postgres`   | Start the PostgreSQL container         |
| ⏹ Stop DB    | `docker stop postgres`    | Stop the running container             |
| ❌ Remove DB  | `docker rm -f postgres`   | Force remove the container             |
| 🔄 View Logs | `docker logs -f postgres` | View real-time logs from the container |

---

## 🧰 6. Useful Docker Commands

| Purpose                 | Command            | Description                             |
| ----------------------- | ------------------ | --------------------------------------- |
| Check Docker version    | `docker --version` | Verify Docker is installed              |
| List running containers | `docker ps`        | View active containers                  |
| List all containers     | `docker ps -a`     | View all containers (running + stopped) |
| List images             | `docker images`    | Show downloaded Docker images           |
| List volumes            | `docker volume ls` | View Docker volumes for persistent data |

---

## 🧹 7. Optional: Clean Up

To completely remove the PostgreSQL container and optionally the image:

```bash
# Stop and remove container
docker rm -f postgres

# (Optional) Remove the downloaded image
docker rmi postgres
```

> ⚠️ Warning: This will delete all your PostgreSQL data unless you’re using a volume.

---

## 📌 Additional Notes

* **Port Conflicts**: If port `5432` is already in use, change the `-p` flag in your `docker run` command. For example, `-p 5433:5432`.
* **Data Persistence**: This setup does **not** persist data after container removal. Use Docker volumes for long-term data storage.
* **Multi-Container Setup**: Consider using `docker-compose` if you're managing multiple services (e.g., Postgres + API server).

---


npx prisma studio