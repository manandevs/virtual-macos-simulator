export const navLinks = [
  { id: "file", name: "File" },
  { id: "edit", name: "Edit" },
  { id: "view", name: "View" },
  { id: "go", name: "Go" },
  { id: "window", name: "Window" },
  { id: "help", name: "Help" },
];

export const navIcons = [
  { id: 1, img: "/icons/wifi.svg", name: "Wifi" },
  { id: 2, img: "/icons/search.svg", name: "Search" },
  { id: 3, img: "/icons/user.svg", name: "Control Center" },
  { id: 4, img: "/icons/mode.svg", name: "Siri" },
];

export const dockApps = [
  { id: "finder", name: "Finder", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Safari", icon: "safari.png", canOpen: true },
  { id: "photos", name: "Photos", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Terminal", icon: "terminal.png", canOpen: true },
  { id: "calculator", name: "Calculator", icon: "calculator.png", canOpen: true },
  { id: "trash", name: "Trash", icon: "trash.png", canOpen: true },
];

// Generic Tech/OS News for Safari
export const blogPosts = [
  {
    id: 1,
    title: "macOS Simulator v1.0 Release",
    desc: "Experience the web-based operating system simulator with enhanced performance and UI.",
    link: "#",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80",
    date: "Today",
  },
  {
    id: 2,
    title: "WebAssembly & The Future",
    desc: "How modern web technologies are enabling desktop-class applications in the browser.",
    link: "#",
    img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Tips for Productivity",
    desc: "Mastering keyboard shortcuts and window management in your virtual environment.",
    link: "#",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    date: "2 days ago",
  },
];

export const techStack = [
  { category: "Core", items: ["React 19", "Vite", "Zustand"] },
  { category: "Styling", items: ["Tailwind CSS", "GSAP Animations"] },
  { category: "System", items: ["Web Filesystem API (Mock)", "Local Storage"] },
];

// Generic mock contacts
export const contactsList = [
  { id: 1, name: "Apple Support", role: "Technical Support", email: "support@apple.com", avatar: "🍎", bg: "#f5f5f7" },
  { id: 2, name: "Tim Cook (Mock)", role: "CEO", email: "tcook@apple.com", avatar: "TC", bg: "#007aff" },
  { id: 3, name: "Craig Federighi", role: "Software Engineering", email: "hairforce1@apple.com", avatar: "CF", bg: "#5856d6" },
  { id: 4, name: "Design Team", role: "Human Interface", email: "design@apple.com", avatar: "🎨", bg: "#ff2d55" },
];

export const photosLinks = [
  { id: "library", name: "Library", icon: "/icons/gallery.svg" },
  { id: "memories", name: "Memories", icon: "/icons/memories.svg" },
  { id: "people", name: "People", icon: "/icons/people.svg" },
  { id: "places", name: "Places", icon: "/icons/location.svg" },
  { id: "recents", name: "Recents", icon: "/icons/clock.svg" },
];

export const gallery = [
  { id: 1, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?auto=format&fit=crop&w=800&q=80" },
  { id: 8, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" },
];

export const INITIAL_Z_INDEX = 1000;

export const WINDOW_CONFIG = {
  finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null }, 
  safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  calculator: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  trash: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z_INDEX, data: null },
};