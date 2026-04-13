import React from 'react';

export const Button = ({ children, variant = 'primary', ...props }: any) => {
  const baseStyle = "px-6 py-3 rounded-full font-bold transition transform hover:scale-105 active:scale-95 shadow-lg";
  const variants: any = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export const Card = ({ children, className = '' }: any) => (
  <div className={`bg-slate-800 border border-slate-700 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

export const Input = ({ label, ...props }: any) => (
  <div className="mb-4">
    {label && <label className="block text-sm text-slate-400 mb-1">{label}</label>}
    <input
      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition"
      {...props}
    />
  </div>
);
