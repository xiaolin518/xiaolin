import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, LogIn, LogOut, BookOpen, Trophy, UserCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">DataLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>
              首页
            </NavLink>
            <NavLink to="/courses" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>
              课程中心
            </NavLink>
            <NavLink to="/achievements" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>
              成就系统
            </NavLink>
            {user ? (
              <>
                <NavLink to="/profile">
                  {({ isActive }) => (
                    <div className={`flex items-center space-x-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
                      <UserCircle className="h-4 w-4" />
                      <span>{user.name}</span>
                    </div>
                  )}
                </NavLink>
                <button 
                  onClick={handleSignOut} 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>登出</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>
                  <LogIn className="h-4 w-4 inline mr-1" />
                  登录
                </NavLink>
                <NavLink to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  注册
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700 hover:text-blue-600'}
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </NavLink>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700 hover:text-blue-600'}
              onClick={() => setIsMenuOpen(false)}
            >
              课程中心
            </NavLink>
            <NavLink 
              to="/achievements" 
              className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700 hover:text-blue-600'}
              onClick={() => setIsMenuOpen(false)}
            >
              成就系统
            </NavLink>
            {user ? (
              <>
                <NavLink 
                  to="/profile" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <div className={`flex items-center space-x-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
                      <UserCircle className="h-4 w-4" />
                      <span>{user.name}</span>
                    </div>
                  )}
                </NavLink>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>登出</span>
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? 'block text-blue-600 font-medium' : 'block text-gray-700 hover:text-blue-600'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  登录
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  注册
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;