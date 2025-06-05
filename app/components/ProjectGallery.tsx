"use client";
import React, { useState, useMemo, useRef, Fragment } from "react";
import { BellIcon } from '@heroicons/react/24/outline';
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Candidate', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Calm Blue palette
const palette = {
  background: "#eaf2fb", 
  card: "#f6faff",       
  accent: "#4287f5",
  accentDarker: "#2560c7",
  text: "#102040",       
  tag: "#e3edff",        
  border: "#3a4a6d",     
  star: "#ffd700",
  starInactive: "#b0bedc",
  shadow: "0 4px 32px 0 rgba(30,60,120,0.13)",
};

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  rating: number;
  beforeImg: string;
  afterImg: string;
  architecture: ArchitectureNode[];
  author?: string;
  hourlyRate?: number;
};
type ArchitectureNode = {
  id: string;
  label: string;
  children?: ArchitectureNode[];
  color?: string;
};

// Example Architect structure
const PORTFOLIO_WEBSITE_ARCH = [
  {
    id: 'frontend',
    label: 'Frontend (Next.js)',
    color: '#b3d1ff',
    children: [
      { id: 'pages', label: 'Pages', color: '#d6e8ff' },
      { id: 'api', label: 'API Routes', color: '#d6e8ff' },
    ],
  },
];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Travel app UI',
    description: 'Optimize the existing travel app UI with React, Node.js.',
    techStack: ['React', 'Node.js', 'TypeScript'],
    rating: 5,
    beforeImg: 'https://cdn.dribbble.com/userupload/3687485/file/original-adbea9884482ba04c52d402a033c9481.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/3687486/file/original-fd63fd977dd65f2ce3cd9f1290dca791.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Alex',
    hourlyRate: 50,
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'Optimize the existing Portfolio Website with Next.js and TailwindCSS.',
    techStack: ['Next.js', 'TailwindCSS', 'TypeScript'],
    rating: 4,
    beforeImg: 'https://cdn.dribbble.com/userupload/43029329/file/original-fedd999bb58fb244d5e49e1cab5c6e6e.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/43029330/file/original-1b0ba0cc234185232d3d4784ca78dcc8.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Jamie',
    hourlyRate: 42,
  },
  {
    id: '3',
    title: 'Insurance website',
    description: 'Optimize the existing Insurance website with Socket.IO and Firebase authentication.',
    techStack: ['React', 'Socket.IO', 'Firebase', 'TypeScript'],
    rating: 5,
    beforeImg: 'https://cdn.dribbble.com/userupload/2715803/file/original-2daa043d16e519835d6a677fe2ee0b93.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/2715804/file/original-9fdf75a6f2e456a1a5d28c22ab23c14c.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Morgan',
    hourlyRate: 60,
  },
  {
    id: '4',
    title: 'Agency landing page',
    description: 'Optimize the existing Agency landing page with Next.js and TailwindCSS.',
    techStack: ['Next.js', 'TensorFlow.js', 'TypeScript', 'TailwindCSS'],
    rating: 4,
    beforeImg: 'https://cdn.dribbble.com/userupload/14880980/file/original-07a5f8a850dd6e4a60da2480c2c9f91d.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/14880982/file/original-64e6ad37d76f31e89553edeb36d79feb.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Taylor',
    hourlyRate: 55,
  },
  {
    id: '5',
    title: 'IoT Device Dashboard',
    description: 'Optimize the existing IoT Device Dashboard with MQTT and charts.',
    techStack: ['React', 'MQTT', 'Chart.js', 'Node.js'],
    rating: 5,
    beforeImg: 'https://cdn.dribbble.com/userupload/18342600/file/original-6e4fd0d892b9142a79ddd3aca3d04a64.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/7081492/file/original-57c4c4a75b3704da93c47776de539600.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Jordan',
    hourlyRate: 48,
  },
  {
    id: '6',
    title: 'Online shopping Platform',
    description: 'Optimize the existing Online shopping Platform with video, quizzes, and analytics.',
    techStack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'TypeScript'],
    rating: 4,
    beforeImg: 'https://cdn.dribbble.com/userupload/41558486/file/original-4e5cb50521b51527e12361f05caca141.png?resize=1504x3834&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/41509382/file/original-dc204f59854ae827c6f88e72464ba3a7.png?resize=1024x2477&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Alex',
    hourlyRate: 50,
  },
  // New card 1 (fixed images)
  {
    id: '7',
    title: 'E-Learning Platform',
    description: 'A modern e-learning platform with real-time collaboration and video streaming.',
    techStack: ['React', 'WebRTC', 'Node.js', 'TypeScript'],
    rating: 5,
    beforeImg: 'https://cdn.dribbble.com/userupload/43029329/file/original-fedd999bb58fb244d5e49e1cab5c6e6e.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/43029330/file/original-1b0ba0cc234185232d3d4784ca78dcc8.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Jamie',
    hourlyRate: 42,
  },
  // New card 2 (fixed images)
  {
    id: '8',
    title: 'Fitness Tracker Dashboard',
    description: 'A dashboard for tracking fitness activities, goals, and analytics.',
    techStack: ['Vue.js', 'D3.js', 'Node.js', 'TypeScript'],
    rating: 4,
    beforeImg: 'https://cdn.dribbble.com/userupload/14880980/file/original-07a5f8a850dd6e4a60da2480c2c9f91d.png?resize=1504x1128&vertical=center',
    afterImg: 'https://cdn.dribbble.com/userupload/14880982/file/original-64e6ad37d76f31e89553edeb36d79feb.png?resize=1504x1128&vertical=center',
    architecture: PORTFOLIO_WEBSITE_ARCH,
    author: 'Morgan',
    hourlyRate: 60,
  },
];


// Tag component
function Tag({ children, selected, onClick }: { children: React.ReactNode; selected?: boolean; onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      className={`text-[14px] px-[18px] py-[6px] rounded-full cursor-pointer mr-[10px] mb-[10px] font-medium select-none transition-all duration-200 border-[1.5px] ${selected ? 'bg-[#4287f5] text-white shadow-[0_2px_8px_rgba(66,135,245,0.08)] border-[#2560c7]' : 'bg-[#e3edff] text-[#102040] border-transparent'} tracking-[0.02em]`}
    >
      {children}
    </span>
  );
}


function StarRating({ rating, setRating, readOnly = false, size = 28 }: { rating: number; setRating?: (r: number) => void; readOnly?: boolean; size?: number }) {
  return (
    <div className="flex gap-1 items-center justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`transition-colors duration-200 ${i < rating ? 'text-[#ffd700] drop-shadow-[0_2px_6px_#ffd70033]' : 'text-[#b0bedc]'} ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          style={{ fontSize: size }}
          onClick={() => !readOnly && setRating && setRating(i + 1)}
          role="img"
          aria-label={i < rating ? 'Star filled' : 'Star empty'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function FilterBar({ tags, selectedTags, onTagToggle }: { tags: string[]; selectedTags: string[]; onTagToggle: (tag: string) => void }) {
  return (
    <div
      className="backdrop-blur-md bg-[#eaf2fb]/80 border-[1.5px] border-[#d6e8ff] shadow-[0_4px_32px_0_rgba(66,135,245,0.07)] rounded-[32px] flex flex-wrap justify-center items-center px-8 py-3 mb-9 mx-auto max-w-[820px] z-20 transition-all duration-500"
    >
      {tags.map((tag) => (
        <Tag key={tag} selected={selectedTags.includes(tag)} onClick={() => onTagToggle(tag)}>{tag}</Tag>
      ))}
      <button
        type="button"
        onClick={() => onTagToggle('__clear_all__')}
        className="ml-4 px-4 py-1.5 rounded-full bg-white text-black font-semibold text-[14px] shadow hover:bg-[#f6faff] transition-colors duration-150 border border-[#e3edff] focus:outline-none focus:ring-2 focus:ring-[#2560c7] focus:ring-offset-2"
        style={{ minWidth: 64 }}
      >
        Clear
      </button>
    </div>
  );
}


// Masonry card layout
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {

  return (
    <div
      className="bg-[#f6faff] rounded-[22px] m-[18px_14px] w-full max-w-[300px] min-w-[210px] h-[350px] flex flex-col relative overflow-hidden cursor-pointer transition-shadow transition-transform duration-1000 shadow-[0_8px_32px_0_rgba(30,60,120,0.18),0_1.5px_8px_0_rgba(66,135,245,0.10)] hover:shadow-[0_16px_48px_0_rgba(30,60,120,0.22),0_2px_12px_0_rgba(66,135,245,0.13)] transform-gpu hover:scale-[1.2]"
      onClick={onClick}
      tabIndex={0}
      aria-label={`Open ${project.title} details`}
      onKeyPress={e => e.key === 'Enter' && onClick()}
    >
      <div className="relative w-full h-[160px] bg-[#e8f1ff] flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img
          src={project.afterImg}
          alt={project.title + ' cover'}
          className="w-full h-full object-cover block transition-transform duration-200"
        />
        <div className="absolute top-3 right-4 z-20 bg-white/90 rounded-xl shadow-md px-2 py-0.5 flex items-center">
          <StarRating rating={project.rating} readOnly size={22} />
        </div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col px-[18px] pt-[14px] pb-[10px] gap-2 relative">
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="font-bold text-[18px] text-[#2560c7] mb-1 tracking-wide truncate" title={project.title}>{project.title}</div>
          <div className="text-[14px] text-[#102040] opacity-85 mb-2 break-words min-h-[36px] max-h-[40px] overflow-hidden text-ellipsis">{project.description}</div>
          <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1 max-h-[32px] overflow-y-auto">
            {project.techStack.map(tag => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>
        <div className="flex items-end justify-end min-h-[38px] max-h-[38px]">
          <div className="opacity-15 pointer-events-none z-0 w-[120px] h-[38px] flex items-end justify-end">
            <MiniArchitecture architecture={project.architecture} />
          </div>
        </div>
        <div className="absolute left-4 bottom-3 z-30 text-[13px] text-[#2560c7] font-medium bg-white/80 rounded-lg px-2 py-0.5 shadow-sm flex items-center gap-1 select-none pointer-events-none whitespace-nowrap max-w-[90%] overflow-hidden text-ellipsis">
          {project.author && project.hourlyRate !== undefined ? (
            <span>
              Completed by: <span className="font-bold">{project.author}</span> <span className="text-[#4287f5] font-semibold">${project.hourlyRate}/hour</span>
            </span>
          ) : (() => {
            const people = [
              { name: 'Alex', rate: 50 },
              { name: 'Jamie', rate: 42 },
              { name: 'Morgan', rate: 60 },
              { name: 'Taylor', rate: 55 },
              { name: 'Jordan', rate: 48 },
            ];
            const idx = parseInt(project.id, 10) % people.length;
            const p = people[idx];
            return (
              <span>
                Completed by: <span className="font-bold">{p.name}</span> <span className="text-[#4287f5] font-semibold">${p.rate}/hour</span>
              </span>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

function MiniArchitecture({ architecture }: { architecture: ArchitectureNode[] }) {

  const nodes = [] as { x: number; y: number; label: string; color?: string }[];
  let y = 20;
  architecture.forEach((node, i) => {
    nodes.push({ x: 20, y: y + i * 30, label: node.label, color: node.color });
    if (node.children) {
      node.children.forEach((c, j) => {
        nodes.push({ x: 90, y: y + i * 30 + j * 18, label: c.label, color: c.color });
      });
    }
  });
  return (
    <svg width={120} height={70}>
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={22} height={12} rx={4} fill={n.color || palette.card} />
          <text x={n.x + 11} y={n.y + 9} textAnchor="middle" fontSize={7} fill={palette.accentDarker}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}


// Before/After slider
function BeforeAfterSlider({ beforeImg, afterImg }: { beforeImg: string; afterImg: string }) {
  const [isBefore, setIsBefore] = useState(true);
  return (
    <div className="relative w-full h-[60vh] min-h-[320px] max-h-[600px] rounded-[18px] overflow-hidden bg-[#e8f1ff] mx-auto my-[52px] shadow-[0_4px_32px_0_rgba(30,60,120,0.13)] flex flex-row items-center justify-center">

      <div className="flex-1 h-full flex items-center justify-center">
        <img
          src={isBefore ? beforeImg : afterImg}
          alt={isBefore ? 'Before' : 'After'}
          className="w-full h-full object-cover select-none rounded-[18px]"
          draggable="false"
        />
      </div>

      <div className="absolute right-6 bottom-6 z-20 flex flex-col items-center">
        <button
          onClick={() => setIsBefore(b => !b)}
          className="bg-white hover:bg-[#f6faff] text-black font-semibold rounded-full min-w-[56px] h-14 px-5 flex items-center justify-center shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2560c7] focus:ring-offset-2 overflow-hidden border border-[#e3edff]"
          aria-label="Toggle before/after image"
        >
          <span
            className="w-full flex items-center justify-center text-[1.08rem] md:text-[1.13rem] lg:text-[1.18rem] xl:text-[1.22rem] font-semibold select-none text-center px-1 leading-tight font-serif"
            style={{ fontFamily: 'Georgia, Times, Times New Roman, serif' }}
          >
            {isBefore ? 'Before' : 'After'}
          </span>
        </button>
      </div>
    </div>
  );
}


// Architecture diagram 
function ArchitectureDiagram({ architecture }: { architecture: ArchitectureNode[] }) {

  type NodePos = { node: ArchitectureNode; x: number; y: number; parent?: NodePos };
  function flatten(nodes: ArchitectureNode[], depth = 0, parent?: NodePos, out: NodePos[] = [], idxOffset = 0): number {
    let idx = 0;
    for (let n = 0; n < nodes.length; n++) {
      const node = nodes[n];
      const siblings = nodes.length;
      const x = 40 + depth * 140;
      const y = 30 + (idx + idxOffset) * 70 + (siblings === 1 ? 30 : 0);
      const pos: NodePos = { node, x, y, parent };
      out.push(pos);
      let childrenCount = 0;
      if (node.children) {
        childrenCount = flatten(node.children, depth + 1, pos, out, idx + idxOffset);
      }
      idx += 1 + childrenCount;
    }
    return idx;
  }
  const nodes = useMemo(() => { const out: NodePos[] = []; flatten(architecture, 0, undefined, out, 0); return out; }, [architecture]);
  const svgWidth = 340;
  const svgHeight = nodes.length > 0 ? Math.max(...nodes.map(n => n.y + 60), 160) : 180;
  return (
    <div className="relative mx-auto mb-0 select-none bg-white rounded-[14px] shadow-[0_4px_32px_0_rgba(30,60,120,0.13)] p-[10px]" style={{ width: svgWidth }}>
      <svg width={svgWidth} height={svgHeight} className="bg-none rounded-[10px] block">
        {nodes.map(pos => pos.parent ? (
          <line key={pos.node.id + '-l'} x1={pos.parent.x + 90} y1={pos.parent.y + 25} x2={pos.x + 10} y2={pos.y + 25} stroke={palette.accent} strokeWidth={2} opacity={0.13} />
        ) : null)}
        {nodes.map((pos, i) => (
          <g key={pos.node.id}>
            <rect x={pos.x} y={pos.y} width={110} height={50} rx={13} fill={pos.node.color || palette.card} stroke={palette.accent} strokeWidth={1.2} opacity={0.97} />
            <text x={pos.x + 55} y={pos.y + 29} textAnchor="middle" fontSize={14} fill={palette.accentDarker} fontWeight={500} style={{ fontFamily: 'inherit' }}>{pos.node.label}</text>
          </g>
        ))}
      </svg>
      <div className="text-center mt-[6px] text-[13px] text-[#2560c7] opacity-80">Architecture</div>
    </div>
  );
}


function Modal({ open, onClose, children, ariaLabel }: { open: boolean; onClose: () => void; children: React.ReactNode; ariaLabel?: string }) {
  React.useEffect(() => {
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      tabIndex={-1}
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed z-30 inset-0 flex items-center justify-center bg-[rgba(35,60,120,0.14)] animate-fadein"
      onClick={onClose}
    >
      <div
        className="bg-[#eaf2fb] shadow-[0_4px_32px_0_rgba(30,60,120,0.13)] rounded-[22px] min-w-[700px] max-w-[980px] w-[98vw] max-h-[92vh] overflow-y-auto p-0 relative flex flex-row gap-0"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[22px] top-[18px] bg-none border-none text-[#4287f5] text-[32px] font-bold cursor-pointer opacity-70 z-20 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

// PDF export with error handling
async function exportProjectPDF(project: Project, targetRef: React.RefObject<HTMLDivElement>) {
  if (!targetRef.current) {
    alert('Export failed: Target element not found.');
    return;
  }
  const element = targetRef.current;
  try {
    // Wait for images to load
    const imgs = Array.from(element.querySelectorAll('img')) as HTMLImageElement[];
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
      return new Promise((res, rej) => {
        img.onload = () => res(0);
        img.onerror = () => rej(new Error('Image failed to load: ' + img.src));
      });
    }));
    let canvas;
    try {
      canvas = await html2canvas(element, { backgroundColor: palette.background, scale: window.devicePixelRatio, useCORS: true, allowTaint: true });
    } catch (err) {
      alert('Export failed: Unable to render canvas. ' + (err instanceof Error ? err.message : ''));
      return;
    }
    let imgData;
    try {
      imgData = canvas.toDataURL('image/png');
    } catch (err) {
      alert('Export failed: Unable to generate image data. ' + (err instanceof Error ? err.message : ''));
      return;
    }
    let pdf;
    try {
      pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${project.title.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      alert('Export failed: Unable to generate PDF. ' + (err instanceof Error ? err.message : ''));
      return;
    }
  } catch (err) {
    alert('Export failed: ' + (err instanceof Error ? err.message : String(err)));
  }
}


// Main component
export default function ProjectGallery() {

  // Tag filtering
  const allTags = useMemo(() => Array.from(new Set(PROJECTS.flatMap(p => p.techStack))).sort(), []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projects, setProjects] = useState(PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('Dashboard');
  const filteredProjects = useMemo(() => {
    let result = selectedTags.length === 0 ? projects : projects.filter(p => selectedTags.every(tag => p.techStack.includes(tag)));
    if (searchTerm.trim()) {
      const lower = searchTerm.trim().toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        (p.author && p.author.toLowerCase().includes(lower)) ||
        p.techStack.some(t => t.toLowerCase().includes(lower))
      );
    }
    return result;
  }, [selectedTags, projects, searchTerm]);

  // Candidate data: aggregate authors from all projects
  const candidateList = useMemo(() => {
    // Map: authorName -> { hourlyRate, years, available, projects: [projectIds] }
    const map = new Map();
    projects.forEach(p => {
      if (p.author) {
        if (!map.has(p.author)) {
          // Mock data for status, years, available
          map.set(p.author, {
            hourlyRate: p.hourlyRate ?? 50,
            years: 2 + (parseInt(p.id, 10) % 5),
            available: parseInt(p.id, 10) % 2 === 0,
            projects: [p],
          });
        } else {
          map.get(p.author).projects.push(p);
        }
      }
    });
    // If no author, fallback to default people
    if (map.size === 0) {
      const people = [
        { name: 'Alex', hourlyRate: 50, years: 5, available: true },
        { name: 'Jamie', hourlyRate: 42, years: 3, available: false },
        { name: 'Morgan', hourlyRate: 60, years: 7, available: true },
        { name: 'Taylor', hourlyRate: 55, years: 4, available: true },
        { name: 'Jordan', hourlyRate: 48, years: 2, available: false },
      ];
      people.forEach(p => map.set(p.name, { hourlyRate: p.hourlyRate, years: p.years, available: p.available, projects: [] }));
    }
    return Array.from(map.entries()).map(([name, data]) => ({ name, ...data }));
  }, [projects]);

  // Candidate chart/list click handler
  const [candidateJumpProject, setCandidateJumpProject] = useState<string|null>(null);
  React.useEffect(() => {
    if (candidateJumpProject) {
      // Find project and open modal
      const proj = projects.find(p => p.id === candidateJumpProject);
      if (proj) setModalProject(proj);
      setCandidateJumpProject(null);
    }
  }, [candidateJumpProject, projects]);

  function handleTagToggle(tag: string) {
    if (tag === '__clear_all__') {
      setSelectedTags([]);
    } else {
      setSelectedTags(tags => tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]);
    }
  }

  const [modalProject, setModalProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  async function handleExportPDF() {
    if (!modalProject) return;
    setExporting(true);
    await exportProjectPDF(modalProject, modalRef);
    setExporting(false);
  }

  // Upload page state
  const [showUpload, setShowUpload] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      if (darkMode) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [darkMode]);

  // Add new project handler
  function handleAddProject(newProject: Project) {
    setProjects(prev => [...prev, newProject]);
    setShowUpload(false);
  }

  // Masonry responsive layout with nav bar
  if (showUpload) {
    return <UploadProjectPage onFinish={handleAddProject} onCancel={() => setShowUpload(false)} />;
  }

  // Tab navigation handler
  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className={darkMode ? 'bg-[#181c24] min-h-screen font-sans p-0 text-white transition-colors duration-300' : 'bg-[#eaf2fb] min-h-screen font-sans p-0 text-[#102040] transition-colors duration-300'}>
      {/* Navigation Bar */}
      <nav className={darkMode ? 'bg-gradient-to-r from-[#232a36] via-[#2d3a4d] to-[#3a4a6d]' : 'bg-gradient-to-r from-[#2560c7] via-[#4287f5] to-[#6dd5ed]'}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      aria-current={activeTab === item.name ? 'page' : undefined}
                      className={classNames(
                        activeTab === item.name ? (darkMode ? 'bg-[#2d3a4d] text-white' : 'bg-blue-900 text-white') : (darkMode ? 'text-[#b0bedc] hover:bg-[#232a36] hover:text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'),
                        'rounded-md px-3 py-2 text-sm font-medium outline-none',
                      )}
                      onClick={() => handleTabClick(item.name)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
              {/* Search box */}
              <div className="mr-2">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={darkMode
                    ? 'px-3 py-2 rounded-lg bg-[#232a36] text-white border border-[#2d3a4d] focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-[#ffd700] placeholder:text-[#b0bedc] w-48 transition-colors'
                    : 'px-3 py-2 rounded-lg bg-white text-[#102040] border border-[#e3edff] focus:outline-none focus:ring-2 focus:ring-[#2560c7] focus:border-[#2560c7] placeholder:text-[#b0bedc] w-48 transition-colors'}
                  style={{ minWidth: 160 }}
                />
              </div>
              <button
                type="button"
                className={darkMode ? 'ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3a4a6d] text-white font-semibold hover:bg-[#232a36] transition-colors shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#232a36]' : 'ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4287f5] text-white font-semibold hover:bg-[#2560c7] transition-colors shadow focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2560c7]'}
                onClick={() => setShowUpload(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4m-8 8h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Upload
              </button>
              {/* Profile dropdown and dark mode toggle */}
              <div className="relative ml-3 flex items-center gap-2">
                <div>
                  <button className={darkMode ? 'relative flex rounded-full bg-[#232a36] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#232a36] focus:outline-hidden' : 'relative flex rounded-full bg-[#2560c7] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2560c7] focus:outline-hidden'}>
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Toggle dark mode"
                  className={darkMode ? 'ml-2 p-2 rounded-full bg-[#232a36] hover:bg-[#2d3a4d] text-[#ffd700] shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd700]' : 'ml-2 p-2 rounded-full bg-white/80 hover:bg-white text-[#2560c7] shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#2560c7]'}
                  onClick={() => setDarkMode(dm => !dm)}
                >
                  {/* Sun icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      {activeTab === 'Dashboard' && (
        <div className={darkMode ? 'bg-[#181c24] min-h-screen font-sans p-0 text-white transition-colors duration-300' : 'bg-[#eaf2fb] min-h-screen font-sans p-0 text-[#102040] transition-colors duration-300'}>
          {/* Header */}
          <header className="pt-[48px] text-center">
            <div className={darkMode ? 'text-[38px] font-extrabold tracking-[0.04em] text-[#ffd700] mb-[10px]' : 'text-[38px] font-extrabold tracking-[0.04em] text-[#2560c7] mb-[10px]'}>Candidate Portfolio Gallery</div>
            <div className={darkMode ? 'text-[17px] text-white opacity-80 max-w-[600px] mx-auto font-normal mb-[18px]' : 'text-[17px] text-[#102040] opacity-72 max-w-[600px] mx-auto font-normal mb-[18px]'}>Quickly filter and find the right one</div>
          </header>

          {/* Filter bar */}
          <FilterBar tags={allTags} selectedTags={selectedTags} onTagToggle={handleTagToggle} />

          {/* Gallery - Flex responsive card layout */}
          <main
            className="max-w-[1240px] mx-auto flex flex-wrap justify-center items-start gap-0 min-h-[400px]"
          >
            {filteredProjects.length === 0 && (
              <div className={darkMode ? 'py-10 text-[#ffd700] font-semibold text-[18px] opacity-80 w-full text-center' : 'py-10 text-[#4287f5] font-semibold text-[18px] opacity-70 w-full text-center'}>No projects found</div>
            )}
            {filteredProjects.map(project => (
              <div key={project.id} className="flex-1 max-w-[360px] min-w-[280px] flex justify-center">
                <ProjectCard project={project} onClick={() => setModalProject(project)} />
              </div>
            ))}
          </main>

          <Modal open={!!modalProject} onClose={() => setModalProject(null)} ariaLabel={modalProject?.title}>
            {modalProject && (
              <div ref={modalRef} className={darkMode ? 'w-full max-w-[700px] mx-auto flex flex-col items-stretch bg-[#232a36] text-white rounded-[22px]' : 'w-full max-w-[700px] mx-auto flex flex-col items-stretch'}>
                {/* Large image slider */}
                <BeforeAfterSlider beforeImg={modalProject.beforeImg} afterImg={modalProject.afterImg} />
                {/* All other content below */}
                <div className={darkMode ? 'w-full flex flex-col justify-start items-stretch py-[36px] px-[24px] min-w-0 relative bg-[#232a36] rounded-b-[22px]' : 'w-full flex flex-col justify-start items-stretch py-[36px] px-[24px] min-w-0 relative bg-white rounded-b-[22px]'}>
                  <div className={darkMode ? 'text-[25px] text-[#ffd700] font-extrabold mb-2 text-left tracking-[0.02em]' : 'text-[25px] text-[#2560c7] font-extrabold mb-2 text-left tracking-[0.02em]'}>{modalProject.title}</div>
                  <div className={darkMode ? 'text-[15px] text-white opacity-90 mb-[14px] text-left min-h-[36px]' : 'text-[15px] text-[#102040] opacity-88 mb-[14px] text-left min-h-[36px]'}>{modalProject.description}</div>
                  <div className="mb-[10px] flex flex-wrap">{modalProject.techStack.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
                  <div className="mb-[18px]"><StarRating rating={modalProject.rating} readOnly size={28} /></div>
                  <ArchitectureDiagram architecture={modalProject.architecture} />
                  <div className="flex-1" />

                  <div className="w-full flex justify-center items-center mt-8 mb-2">
                    <button
                      onClick={handleExportPDF}
                      disabled={exporting}
                      className={darkMode ? `px-[32px] py-[13px] bg-[#3a4a6d] text-[#ffd700] font-bold rounded-[13px] text-[17px] tracking-[0.04em] shadow-[0_2px_12px_rgba(60,110,220,0.09),0_0_0_1px_#232a36] transition-colors duration-100 ${exporting ? 'cursor-wait opacity-70' : 'cursor-pointer hover:bg-[#232a36]'}` : `px-[32px] py-[13px] bg-[#4287f5] text-white font-bold rounded-[13px] text-[17px] tracking-[0.04em] shadow-[0_2px_12px_rgba(60,110,220,0.09),0_0_0_1px_#d6e8ff] transition-colors duration-100 ${exporting ? 'cursor-wait opacity-70' : 'cursor-pointer hover:bg-[#2560c7]'}`}
                      aria-busy={exporting}
                    >
                      {exporting ? 'Exporting...' : 'Export PDF'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      )}

      {/* Candidate Tab Content */}
      {activeTab === 'Candidate' && (
        <div className={darkMode ? 'bg-[#181c24] min-h-screen font-sans p-0 text-white transition-colors duration-300' : 'bg-[#eaf2fb] min-h-screen font-sans p-0 text-[#102040] transition-colors duration-300'}>
          <header className="pt-[48px] text-center">
            <div className={darkMode ? 'text-[38px] font-extrabold tracking-[0.04em] text-[#ffd700] mb-[10px]' : 'text-[38px] font-extrabold tracking-[0.04em] text-[#2560c7] mb-[10px]'}>Candidate List</div>
            <div className={darkMode ? 'text-[17px] text-white opacity-80 max-w-[600px] mx-auto font-normal mb-[18px]' : 'text-[17px] text-[#102040] opacity-72 max-w-[600px] mx-auto font-normal mb-[18px]'}>All authors from the dashboard, with status and details</div>
          </header>
          <div className="max-w-3xl mx-auto mt-10 mb-20">
            {/* Candidate chart/list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {candidateList.map((c, idx) => (
                <div
                  key={c.name}
                  className={
                    (darkMode
                      ? 'bg-[#232a36] text-white border-[#2d3a4d]'
                      : 'bg-white text-[#102040] border-[#e3edff]') +
                    ' rounded-2xl shadow-lg border p-6 flex flex-col gap-2 hover:shadow-2xl transition-shadow duration-200 cursor-pointer relative group'
                  }
                  onClick={() => {
                    // Open the first project detail for this author
                    if (c.projects && c.projects.length > 0) setModalProject(c.projects[0]);
                  }}
                  tabIndex={0}
                  aria-label={`View ${c.name}'s project`}
                  onKeyPress={e => e.key === 'Enter' && c.projects && c.projects.length > 0 && setModalProject(c.projects[0])}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4287f5] to-[#2560c7] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {c.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className={darkMode ? 'text-lg font-bold text-[#ffd700]' : 'text-lg font-bold text-[#2560c7]'}>{c.name}</div>
                      <div className="text-sm opacity-80">{c.projects.length} project{c.projects.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-3 items-center mb-2">
                    <span className={c.available ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold' : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold'}>
                      {c.available ? 'Available' : 'Unavailable'}
                    </span>
                    <span className="bg-[#e3edff] text-[#2560c7] px-3 py-1 rounded-full text-xs font-semibold">${c.hourlyRate}/hour</span>
                    <span className="bg-[#f6faff] text-[#4287f5] px-3 py-1 rounded-full text-xs font-semibold">{c.years} yrs exp</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {c.projects.map((p: Project) => (
                      <span key={p.id} className="bg-[#4287f5] text-white px-2 py-1 rounded text-xs font-medium">{p.title}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors font-medium"
                    onClick={e => {
                      e.stopPropagation();
                      alert(`Contact info for ${c.name}:\nEmail: ${c.name.toLowerCase()}@example.com\nPhone: 123-456-7890`);
                    }}
                  >
                    Contact
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>      )}

      {/* Footer */}
      <footer className={darkMode ? 'bg-gradient-to-r from-[#232a36] via-[#2d3a4d] to-[#3a4a6d] text-white mt-16 py-12 px-6 shadow-[0_0_32px_0_rgba(30,60,120,0.13)]' : 'bg-gradient-to-r from-[#2560c7] via-[#4287f5] to-[#6dd5ed] text-white mt-16 py-12 px-6 shadow-[0_0_32px_0_rgba(30,60,120,0.13)]'}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className={darkMode ? 'text-4xl font-extrabold mb-2 tracking-wider drop-shadow-lg text-[#ffd700]' : 'text-4xl font-extrabold mb-2 tracking-wider drop-shadow-lg'}>AAProject</div>
            <div className={darkMode ? 'text-xl opacity-90 mb-3 font-medium text-white' : 'text-xl opacity-90 mb-3 font-medium'}>Empowering Digital Transformation</div>
            <div className={darkMode ? 'text-base opacity-70 text-white' : 'text-base opacity-70'}>© {new Date().getFullYear()} AAProject. All rights reserved.</div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-end w-full md:w-auto justify-center md:justify-end">
            <div className={darkMode ? 'flex flex-col items-center md:items-end gap-2 bg-white/10 rounded-2xl px-8 py-6 shadow-lg border border-white/10 text-white' : 'flex flex-col items-center md:items-end gap-2 bg-white/10 rounded-2xl px-8 py-6 shadow-lg border border-white/10'}>
              <div className={darkMode ? 'text-lg font-bold mb-1 tracking-wide text-[#ffd700]' : 'text-lg font-bold mb-1 tracking-wide'}>Contact Us</div>
              <div className={darkMode ? 'text-base opacity-90 text-white' : 'text-base opacity-90'}>Email: <span className={darkMode ? 'font-semibold text-[#ffd700]' : 'font-semibold'}>info@aaproject.com</span></div>
              <div className={darkMode ? 'text-base opacity-90 text-white' : 'text-base opacity-90'}>Phone: <span className={darkMode ? 'font-semibold text-[#ffd700]' : 'font-semibold'}>+1 (555) 123-4567</span></div>
              <div className={darkMode ? 'text-base opacity-90 text-white' : 'text-base opacity-90'}>Address: <span className={darkMode ? 'font-semibold text-[#ffd700]' : 'font-semibold'}>1234 Innovation Ave, Tech City</span></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
// --- UploadProjectPage component ---
function UploadProjectPage({ onFinish, onCancel }: { onFinish: (p: Project) => void; onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [rating, setRating] = useState(4);
  const [beforeImg, setBeforeImg] = useState("");
  const [afterImg, setAfterImg] = useState("");
  const [arch, setArch] = useState<ArchitectureNode[]>(PORTFOLIO_WEBSITE_ARCH);
  const [beforeImgFile, setBeforeImgFile] = useState<File|null>(null);
  const [afterImgFile, setAfterImgFile] = useState<File|null>(null);
  const [author, setAuthor] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  function handleBeforeImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setBeforeImgFile(file);
      const reader = new FileReader();
      reader.onload = ev => setBeforeImg(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleAfterImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAfterImgFile(file);
      const reader = new FileReader();
      reader.onload = ev => setAfterImg(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleAddTech(tag: string) {
    if (tag && !techStack.includes(tag)) setTechStack([...techStack, tag]);
  }
  function handleRemoveTech(tag: string) {
    setTechStack(techStack.filter(t => t !== tag));
  }

  function handleSubmit() {
    if (!title.trim() || !description.trim() || !beforeImg || !afterImg || !author.trim() || !hourlyRate.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      techStack,
      rating,
      beforeImg,
      afterImg,
      architecture: arch,
      author: author.trim(),
      hourlyRate: Number(hourlyRate),
    };
    onFinish(newProject);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eaf2fb] p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-[#e3edff] relative">
        {/* Close button */}
        <button onClick={onCancel} className="absolute right-4 top-4 text-[#2560c7] text-2xl font-bold opacity-60 hover:opacity-100">×</button>
        <div className="text-2xl font-bold text-[#2560c7] mb-2 text-center">Create New Project Card</div>
        <label className="block">
          <span className="text-[#2560c7] font-semibold">Title</span>
          <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded-lg border border-[#e3edff] px-3 py-2 text-[#102040] bg-[#f6faff] focus:outline-none focus:ring-2 focus:ring-[#2560c7] text-base" />
        </label>
        <label className="block">
          <span className="text-[#2560c7] font-semibold">Author</span>
          <input value={author} onChange={e => setAuthor(e.target.value)} className="mt-1 block w-full rounded-lg border border-[#e3edff] px-3 py-2 text-[#102040] bg-[#f6faff] focus:outline-none focus:ring-2 focus:ring-[#2560c7] text-base" placeholder="Enter author name" />
        </label>
        <label className="block">
          <span className="text-[#2560c7] font-semibold">Hourly Rate ($/hour)</span>
          <input type="number" min="0" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="mt-1 block w-full rounded-lg border border-[#e3edff] px-3 py-2 text-[#102040] bg-[#f6faff] focus:outline-none focus:ring-2 focus:ring-[#2560c7] text-base" placeholder="Enter hourly rate" />
        </label>
        <label className="block">
          <span className="text-[#2560c7] font-semibold">Description</span>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full rounded-lg border border-[#e3edff] px-3 py-2 text-[#102040] bg-[#f6faff] focus:outline-none focus:ring-2 focus:ring-[#2560c7] text-base min-h-[80px]" />
        </label>
        <label className="block">
          <span className="text-[#2560c7] font-semibold">Tech Stack</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map(tag => (
              <span key={tag} className="bg-[#4287f5] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                {tag}
                <button type="button" className="ml-1 text-white/80 hover:text-white text-xs" onClick={() => handleRemoveTech(tag)}>×</button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tech..."
              className="border border-[#e3edff] rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2560c7]"
              onKeyDown={e => { if (e.key === 'Enter') { handleAddTech(e.currentTarget.value); e.currentTarget.value = ''; } }}
            />
          </div>
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block">
              <span className="text-[#2560c7] font-semibold">Upload Before Image</span>
              <input type="file" accept="image/*" onChange={handleBeforeImageChange} className="mt-1 w-full" />
              {beforeImg && <img src={beforeImg} alt="Before Preview" className="mt-3 rounded-lg w-full max-h-48 object-contain border border-[#e3edff]" />}
            </label>
          </div>
          <div className="flex-1">
            <label className="block">
              <span className="text-[#2560c7] font-semibold">Upload After Image</span>
              <input type="file" accept="image/*" onChange={handleAfterImageChange} className="mt-1 w-full" />
              {afterImg && <img src={afterImg} alt="After Preview" className="mt-3 rounded-lg w-full max-h-48 object-contain border border-[#e3edff]" />}
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#2560c7] font-semibold">Rating</span>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        {/* Architecture is fixed for now */}
        <div className="flex flex-row justify-end gap-4 mt-4">
          <button
            className="px-8 py-3 rounded-full bg-[#4287f5] text-white font-bold text-lg shadow-lg hover:bg-[#2560c7] transition-colors"
            onClick={onCancel}
          >Return</button>
          <button
            className="px-8 py-3 rounded-full bg-[#4287f5] text-white font-bold text-lg shadow-lg hover:bg-[#2560c7] transition-colors"
            onClick={handleSubmit}
            disabled={!title.trim() || !description.trim() || !beforeImg || !afterImg || !author.trim() || !hourlyRate.trim()}
          >Finish</button>
        </div>
      </div>
    </div>
  );
}