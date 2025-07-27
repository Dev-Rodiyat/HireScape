import React from 'react';
import { Calendar, DollarSign, Paperclip } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const TaskForm = () => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    attachments: []
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const categories = [
    'Hairdressing',
    'Mechanics',
    'Welder',
    'Tailoring',
    'Tutoring',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar/>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900">Post a New Task</h2>
            <p className="mt-2 text-gray-600">Fill in the details below to create your task</p>
            
            {success && (
              <div className="mt-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                Task has been successfully created!
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Task Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a clear title for your task"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide detailed information about your task requirements"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget
                  </label>
                  <div className="mt-1 relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="budget"
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <div className="mt-1 relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="deadline"
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                  Attachments
                </label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                  <Paperclip className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag and drop files here, or click to browse
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    min-w-32 px-6 py-2 rounded-lg text-white font-medium
                    ${loading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'}
                    transition-colors duration-200
                  `}
                >
                  {loading ? 'Creating...' : 'Post Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TaskForm;