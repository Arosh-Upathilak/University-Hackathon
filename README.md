# University Mini Hackathon Project

A full-stack web application built with Next.js frontend and .NET backend for the University Mini Hackathon.

## 🚀 Project Structure

```
University-Mini-Hackathon/
├── frontend/          # Next.js React application
│   ├── app/          # App router pages and components
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/          # .NET Web API
│   ├── backend/      # Main API project
│   └── backend.sln   # Solution file
└── README.md         # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Library**: React 19.2.3
- **Linting**: ESLint

### Backend
- **Framework**: .NET 10.0
- **Type**: ASP.NET Core Web API
- **Documentation**: OpenAPI/Swagger

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **.NET 10.0 SDK**
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd University-Mini-Hackathon
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend
dotnet restore
dotnet run --project backend
```

The backend API will be available at `https://localhost:5001` or `http://localhost:5000`

## 📝 Available Scripts

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Scripts

```bash
dotnet run       # Start development server
dotnet build     # Build the project
dotnet test      # Run tests (if available)
```

## 🔧 Development

### Frontend Development
- The frontend uses Next.js App Router
- Components are located in `frontend/app/components/`
- Pages are in `frontend/app/`
- Global styles are in `frontend/app/globals.css`

### Backend Development
- The API follows RESTful conventions
- Controllers should be added to handle different endpoints
- Configuration is managed through `appsettings.json`

## 📁 Key Files

- `frontend/package.json` - Frontend dependencies and scripts
- `backend/backend/backend.csproj` - Backend project configuration
- `frontend/next.config.ts` - Next.js configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `backend/backend/Program.cs` - Backend entry point

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

### Backend Deployment
The backend can be deployed to:
- Azure App Service
- AWS Elastic Beanstalk
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of the University Mini Hackathon.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in the configuration files
2. **Dependencies not installing**: Delete `node_modules` and `package-lock.json`, then run `npm install`
3. **.NET build errors**: Ensure you have .NET 10.0 SDK installed

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Ensure all prerequisites are installed
3. Verify that both frontend and backend are running
4. Check the API endpoints are accessible

## 📞 Contact

For questions or support regarding this project, please contact the development team.

---

**Happy Coding! 🎉**
