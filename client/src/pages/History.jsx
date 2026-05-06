import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Clock, Cpu, Database, LayoutTemplate, Server, Trash2 } from 'lucide-react';

const History = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data.data);
    } catch (err) {
      setError('Failed to load project history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await axios.delete(`http://127.0.0.1:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  if (loading) return <div className="py-20 text-center"><Cpu className="w-8 h-8 animate-spin mx-auto text-primary-500" /></div>;

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
        <h1 className="text-3xl font-bold mb-2 relative z-10">Generation History</h1>
        <p className="text-slate-300 relative z-10">View and manage your previously configured boilerplates.</p>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-4 border rounded-lg mb-6">{error}</div>}

      {projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-light-border dark:border-dark-border rounded-xl">
          <Clock className="w-12 h-12 text-light-textMuted dark:text-dark-textMuted mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No projects yet</h3>
          <p className="text-light-textMuted dark:text-dark-textMuted">You haven't generated any stacks. Go to Generator to build one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project._id} className="card p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-primary-500/50 transition-colors">
              <div>
                <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 font-mono mb-2">{project.name}</h3>
                
                <div className="flex flex-wrap gap-3 text-sm text-light-textMuted dark:text-dark-textMuted">
                  <span className="flex items-center gap-1"><LayoutTemplate className="w-4 h-4" /> {project.frontend}</span>
                  <span className="flex items-center gap-1"><Server className="w-4 h-4" /> {project.backend}</span>
                  <span className="flex items-center gap-1"><Database className="w-4 h-4" /> {project.database}</span>
                  <span className="flex items-center gap-1"><Cpu className="w-4 h-4" /> {project.architecture}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-light-border dark:border-dark-border">
                <span className="text-slate-400 shrink-0">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
                
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
