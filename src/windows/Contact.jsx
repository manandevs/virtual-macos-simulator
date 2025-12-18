import React from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { socials } from "@constants";

const Contact = () => {
  return (
    <div className="flex flex-col h-full bg-[#fbfbfb] p-8 items-center justify-center">
      <div className="text-center mb-8">
        <img src="/images/adrian.jpg" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
        <h2 className="text-2xl font-bold text-gray-800">Contact Me</h2>
        <p className="text-gray-500 text-sm">Let's connect on social media</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-inner"
                style={{ backgroundColor: social.bg }}
            >
                <img src={social.icon} alt={social.text} className="w-6 h-6 invert brightness-0" />
            </div>
            <div>
                <h3 className="font-bold text-gray-800">{social.text}</h3>
                <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">View Profile &rarr;</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WindowWrapper(Contact, "contact");