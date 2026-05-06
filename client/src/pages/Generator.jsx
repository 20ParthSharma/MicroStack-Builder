import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Check, Download, Loader2, Package } from 'lucide-react';

const options = {
  frontend: [
    { id: 'react', name: 'React', description: 'Vite + React SPA' },
    { id: 'nextjs', name: 'Next.js', description: 'React Framework' },
    { id: 'vue', name: 'Vue.js', description: 'Vite + Vue SPA' },
    { id: 'angular', name: 'Angular', description: 'Angular CLI build' },
    { id: 'svelte', name: 'SvelteKit', description: 'Svelte framework' },
    { id: 'none', name: 'None', description: 'No frontend' }
  ],
  backend: [
    { id: 'express', name: 'Node.js', description: 'Express REST API' },
    { id: 'nest', name: 'NestJS', description: 'Progressive Node.js' },
    { id: 'python', name: 'Python', description: 'FastAPI server' },
    { id: 'go', name: 'Go', description: 'Gin HTTP web framework' },
    { id: 'none', name: 'None', description: 'No backend' }
  ],
  database: [
    { id: 'mongodb', name: 'MongoDB', description: 'Mongoose ODM / NoSQL' },
    { id: 'postgres', name: 'PostgreSQL', description: 'Relational database' },
    { id: 'mysql', name: 'MySQL', description: 'SQL relational database' },
    { id: 'sqlite', name: 'SQLite', description: 'Lightweight local database' },
    { id: 'redis', name: 'Redis', description: 'In-memory data store' },
    { id: 'none', name: 'None', description: 'No database' }
  ],
  architecture: [
    { id: 'mvc', name: 'MVC', description: 'Model-View-Controller' },
    { id: 'microservices', name: 'Microservices', description: 'Dockerized services' }
  ]
};

const Generator = () => {
  const { token } = useAuth();
  const [config, setConfig] = useState({
    name: 'my-microstack-app',
    frontend: 'react',
    backend: 'express',
    database: 'mongodb',
    architecture: 'mvc'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = (category, value) => {
    setConfig(prev => ({ ...prev, [category]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/generate', config, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // important for downloading files
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${config.name}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
    } catch (err) {
      console.error(err);
      setError('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
      
      {/* Left Column: Form */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Build Your Stack</h1>
          <p className="text-light-textMuted dark:text-dark-textMuted">Select the technologies for your new project. We'll wire everything together.</p>
        </div>

        <div className="card p-6">
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <input 
            type="text" 
            className="input-field" 
            value={config.name}
            onChange={e => handleSelect('name', e.target.value.replace(/[^a-z0-9-]/gi, '-').toLowerCase())}
          />
        </div>

        {Object.entries(options).map(([category, choices]) => (
          <div key={category} className="card p-6">
            <h3 className="text-lg font-bold capitalize mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-500" />
              {category}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {choices.map(choice => (
                <div 
                  key={choice.id}
                  onClick={() => handleSelect(category, choice.id)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    config[category] === choice.id 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 ring-1 ring-primary-500' 
                    : 'border-light-border dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-semibold ${config[category] === choice.id ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                      {choice.name}
                    </span>
                    {config[category] === choice.id && <Check className="w-5 h-5 text-primary-500" />}
                  </div>
                  <p className="text-sm text-light-textMuted dark:text-dark-textMuted">{choice.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Preview & Action */}
      <div className="space-y-6">
        <div className="card p-6 sticky top-24">
          <h3 className="text-lg font-bold mb-4">Architecture Preview</h3>
          
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto mb-6">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <span className="text-blue-400">~/projects/{config.name}</span>
            </div>
            <div className="pl-4 border-l border-slate-700 space-y-1 mt-2">
              {config.architecture !== 'none' && (config.architecture === 'microservices' || config.architecture === 'mvc') && (
                <>
                  <p className="text-yellow-400">docker-compose.yml</p>
                  <p className="text-yellow-400">.github/workflows/main.yml</p>
                </>
              )}
              {config.frontend !== 'none' && (
                <div>
                  <p className="text-green-400">client/</p>
                  <div className="pl-4 border-l border-slate-700 space-y-1">
                    <p>package.json</p>
                    <p>vite.config.js</p>
                    <p className="text-blue-300">src/</p>
                  </div>
                </div>
              )}
              {config.backend !== 'none' && (
                <div>
                  <p className="text-green-400">server/</p>
                  <div className="pl-4 border-l border-slate-700 space-y-1">
                    <p>package.json</p>
                    <p>server.js</p>
                    <p className="text-purple-300">config/</p>
                    {config.database !== 'none' && (
                      <p className="text-purple-300 pl-4">db.js</p>
                    )}
                  </div>
                </div>
              )}
              <p>README.md</p>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">{error}</div>}

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg h-14"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><Download className="w-5 h-5" /> Generate Project</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generator;
