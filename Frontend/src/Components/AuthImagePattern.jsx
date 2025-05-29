import { Code, Terminal, FileCode, Braces } from "lucide-react";
import { useEffect, useState } from "react";

const CodeBackground = ({
  title = "Welcome to CodeRush",
  subtitle = "Where learners meet real-world coding challenges and cutting-edge tech.",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const codeSnippets = [
    `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  return stack.length === 0;
}`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-8 py-16 overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[Braces, FileCode, Terminal, Code].map((Icon, index) => (
          <div
            key={index}
            className={`absolute animate-float-${index}`}
            style={{
              top: `${10 + index * 22}%`,
              left: `${8 + index * 18}%`,
            }}
          >
            <Icon size={44 + index * 6} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 max-w-5xl text-center">
        {/* VSCode-style Code Box */}
        <div className="w-full max-w-3xl mx-auto backdrop-blur-md bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl shadow-2xl mb-12 overflow-hidden transition-all duration-500">
          <div className="bg-slate-800/70 px-4 py-2 flex items-center border-b border-white/10 text-left">
            <div className="flex space-x-2 mr-4">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-mono text-white/60">main.js</span>
          </div>
          <div className="p-4 font-mono text-xs sm:text-sm relative text-green-400 overflow-y-auto max-h-80 bg-black/40">
            <pre className="whitespace-pre-wrap text-left pr-8">
              {codeSnippets[activeIndex]}
            </pre>
            <div className="absolute bottom-4 right-4 w-1 h-4 bg-white animate-blink" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-400/30 shadow-lg backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
            <Code className="w-7 h-7 text-blue-300" />
          </div>
        </div>

        {/* Title + Subtitle */}
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 animate-typewriter border-r-2 border-white/80 pr-2 inline-block whitespace-nowrap overflow-hidden max-w-full">
          {title}
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mt-2">
          {subtitle}
        </p>
      </div>

      {/* Floating Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }

        .animate-float-0 { animation: float 7s ease-in-out infinite; }
        .animate-float-1 { animation: float 8s ease-in-out infinite; }
        .animate-float-2 { animation: float 9s ease-in-out infinite; }
        .animate-float-3 { animation: float 10s ease-in-out infinite; }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }

        @keyframes typewriter {
          from { width: 0 }
          to { width: 100% }
        }

        .animate-typewriter {
          animation: typewriter 3s steps(30) 1;
        }
      `}</style>
    </div>
  );
};

export default CodeBackground;
