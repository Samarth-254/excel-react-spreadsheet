# Excel-like React Spreadsheet Application

A modern, Excel-like spreadsheet application built with React 18, TypeScript, and Tailwind CSS. Features a fully functional data grid with search, filtering, and interactive cell selection capabilities.

## 🚀 Features

### Core Functionality
- **Excel-like Interface**: 30-row spreadsheet with professional styling matching Figma designs
- **Interactive Cell Selection**: Click cells to select with green border highlighting
- **Keyboard Navigation**: Arrow keys for cell navigation, Escape to deselect
- **Context Menu**: Right-click cells for additional options
- **Search Functionality**: Global search across all data columns
- **Advanced Filtering**: Filter by Status and Priority with dropdown controls
- **Responsive Design**: Works seamlessly across different screen sizes

### Data Management
- **Mock Data Integration**: Pre-populated with realistic job request data
- **Real-time Filtering**: Instant results as you type or change filters
- **Combined Filters**: Search + Status + Priority filters work together
- **Empty Row Support**: Excel-like experience with 25 empty rows for expansion

### UI/UX Excellence
- **Work Sans Font**: Consistent typography throughout the application
- **Color-coded Headers**: Organized sections (Financial Overview, ABC, Answer a question, Extract)
- **Status Badges**: Pill-style badges with specific color schemes
- **Priority Indicators**: Color-coded priority levels (High, Medium, Low)
- **Professional Styling**: Pixel-perfect implementation matching design specifications

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **@tanstack/react-table** - Powerful table library for data management
- **Vite** - Fast build tool and development server
- **ESLint + Prettier** - Code quality and formatting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ExcelReact
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage Guide

### Search Functionality
- Use the search bar in the header to search across all columns
- Search is case-insensitive and matches partial text
- Results update in real-time as you type

### Filtering Data
1. Click the **Filter** button in the toolbar
2. Use the **Status** dropdown to filter by:
   - In-progress
   - Need to start
   - Complete
   - Blocked
3. Use the **Priority** dropdown to filter by:
   - High
   - Medium
   - Low
4. Click **Clear filters** to reset all filters

### Cell Interaction
- **Click** any cell to select it (green border appears)
- **Arrow keys** to navigate between cells
- **Right-click** for context menu options
- **Escape** key to deselect current cell

### Toolbar Features
- **Tool bar**: Expandable toolbar controls
- **Hide fields**: Toggle field visibility
- **Sort**: Button visible but functionality disabled (as requested)
- **Filter**: Toggle filter panel
- **Cell view**: Alternative view options
- **Import/Export/Share**: Action buttons for data management
- **New Action**: Primary action button

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation with search and user info
│   ├── Toolbar.tsx         # Action buttons and filter controls
│   ├── Spreadsheet.tsx     # Main data grid component
│   ├── ContextMenu.tsx     # Right-click context menu
│   ├── Footer.tsx          # Bottom navigation tabs
│   └── index.ts           # Component exports
├── types.ts               # TypeScript type definitions
├── mockData.ts           # Sample data for the spreadsheet
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🎨 Design System

### Colors
- **Primary Green**: `#2F4F2F` (action buttons)
- **Selection Green**: `#6C8B70` (cell borders)
- **Background Green**: `#E8F0E9` (active tabs)
- **Text Colors**: `#121212` (primary), `#757575` (secondary)

### Typography
- **Font Family**: Work Sans
- **Header Text**: 14px/500 weight for section headers
- **Content Text**: 12-13px/400-500 weight for cell content
- **Button Text**: 14px/400 weight for toolbar elements

### Status Colors
- **In-progress**: Yellow background (`#FFF3D6`), dark yellow text (`#85640B`)
- **Need to start**: Light blue background (`#E2E8F0`), dark blue text (`#475569`)
- **Complete**: Light green background (`#D3F2E3`), dark green text (`#0A6E3D`)
- **Blocked**: Light red background (`#FFE1DE`), dark red text (`#C22219`)

### Priority Colors
- **High**: `#EF4D44`
- **Medium**: `#C29210`
- **Low**: `#1A8CFF`

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Code Quality
- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict mode enabled for maximum type safety
- **Component Architecture**: Modular, reusable components with clear interfaces

## 📋 Data Schema

```typescript
interface JobRequest {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'In-progress' | 'Need to start' | 'Complete' | 'Blocked' | '';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low' | '';
  dueDate: string;
  estValue: string;
}
```


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design specifications provided via Figma
- Built with modern React ecosystem tools
- Inspired by Excel's user experience patterns
