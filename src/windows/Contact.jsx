import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { contactsList } from "@constants";
import { IoSearch, IoAdd } from "react-icons/io5";

const Contact = () => {
  const [selectedId, setSelectedId] = useState(1);
  const selectedContact = contactsList.find(c => c.id === selectedId) || contactsList[0];

  return (
    <div className="flex h-full bg-white text-gray-800">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
        <div className="h-12 border-b border-gray-200 flex items-center px-3 gap-2">
            <div className="relative flex-1">
                <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-gray-200 rounded pl-7 pr-2 py-1 text-sm outline-none focus:ring-1 ring-blue-500"
                />
            </div>
            <button className="text-gray-500 hover:text-black"><IoAdd size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">
            {contactsList.map(contact => (
                <div 
                    key={contact.id}
                    onClick={() => setSelectedId(contact.id)}
                    className={`flex items-center gap-3 p-3 cursor-pointer border-b border-gray-100 ${selectedId === contact.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                >
                    <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: contact.bg, color: '#fff' }}
                    >
                        {contact.avatar}
                    </div>
                    <div className="flex-col flex">
                        <span className="font-semibold text-sm">{contact.name}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Details View */}
      <div className="flex-1 p-8 flex flex-col items-center pt-20">
         <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg mb-4"
            style={{ backgroundColor: selectedContact.bg, color: '#fff' }}
         >
            {selectedContact.avatar}
         </div>
         <h2 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h2>
         <p className="text-gray-500 mb-6">{selectedContact.role}</p>
         
         <div className="w-full max-w-sm space-y-4">
             <div className="flex justify-between border-b border-gray-100 pb-2">
                 <span className="text-gray-400 text-sm">home</span>
                 <a href={`mailto:${selectedContact.email}`} className="text-blue-500 hover:underline">{selectedContact.email}</a>
             </div>
             <div className="flex justify-between border-b border-gray-100 pb-2">
                 <span className="text-gray-400 text-sm">mobile</span>
                 <span className="text-gray-800">+1 (555) 123-4567</span>
             </div>
             <div className="flex justify-between pb-2">
                 <span className="text-gray-400 text-sm">notes</span>
                 <span className="text-gray-600 text-sm">Simulator Mock Data</span>
             </div>
         </div>
         
         <div className="mt-8 flex gap-6">
             <button className="flex flex-col items-center gap-1 text-blue-500 hover:opacity-80">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">💬</div>
                 <span className="text-xs">message</span>
             </button>
             <button className="flex flex-col items-center gap-1 text-blue-500 hover:opacity-80">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">📞</div>
                 <span className="text-xs">call</span>
             </button>
             <button className="flex flex-col items-center gap-1 text-blue-500 hover:opacity-80">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">📹</div>
                 <span className="text-xs">video</span>
             </button>
             <button className="flex flex-col items-center gap-1 text-blue-500 hover:opacity-80">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">✉️</div>
                 <span className="text-xs">mail</span>
             </button>
         </div>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;