"use client";
import React, { useEffect, useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Github,
    Linkedin,
    Twitter,
    MessageSquare,
} from "lucide-react";
import { fetchBasicDetails } from "@/services/basicDetails.service";

// --- Contact Item Component (Minor text size adjustments) ---
const ContactItem = ({ icon: Icon, title, value, href }) => (
    <div className="flex items-start mb-4 sm:mb-5">
        <div className="p-2 sm:p-3 mr-3 sm:mr-4 rounded-xl bg-purple-600/20 text-purple-400 flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" /> {/* Responsive icon size */}
        </div>
        <div>
            <p className="text-xs sm:text-sm font-semibold text-gray-300">{title}</p>
            {href ? (
                <a
                    href={href}
                    className={`text-sm sm:text-md text-white transition-colors ${title === "Availability"
                        ? "cursor-default"
                        : "hover:text-purple-400"
                        }`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {value}
                </a>
            ) : (
                <p className="text-sm sm:text-md text-white">{value}</p>
            )}
        </div>
    </div>
);

// --- Social Button Component (Minor size adjustments) ---
const SocialButton = ({ icon: Icon, name, href, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-start p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-800 transition-colors ${color}`}
        aria-label={`Follow me on ${name}`}
    >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
        <span className="text-sm font-medium text-white">{name}</span>
    </a>
);

// --- Main Footer Component ---
const Footer = () => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await fetchBasicDetails();
                setDetails(data || {});
            } catch (err) {
                console.error("Failed to load basic details:", err);
            }
        };
        loadDetails();
    }, []);

    if (!details)
        return (
            <footer className="bg-gray-900 text-gray-400 text-center py-12">
                Loading contact details...
            </footer>
        );

    const contactInfo = [
        {
            title: "Email",
            value: details.Email,
            icon: Mail,
            href: `mailto:${details.Email}`,
        },
        {
            title: "Phone",
            value: details.Phone ? `+91 ${details.Phone}` : "",
            icon: Phone,
            href: `tel:${details.Phone}`,
        },
        {
            title: "Location",
            value: details.Location,
            icon: MapPin,
            href: details.location_map_link || "",
        },
        {
            title: "Availability",
            value: details.Availability,
            icon: Calendar,
            href: null,
        },
    ];

    const socialIcons = {
        GitHub: { icon: Github, color: "hover:bg-gray-700" },
        LinkedIn: { icon: Linkedin, color: "hover:bg-blue-700" },
        Twitter: { icon: Twitter, color: "hover:bg-sky-500" },
        Discord: { icon: MessageSquare, color: "hover:bg-indigo-600" },
    };

    const socialLinks =
        details.Social?.map(({ name, link }) => ({
            name,
            icon: socialIcons[name]?.icon,
            color: socialIcons[name]?.color || "hover:bg-gray-600",
            href: link,
        })) || [];

    return (
        // Adjusted vertical padding and removed w-screen/extra horizontal padding
        <footer className="bg-gray-50 dark:bg-gray-800 text-white pt-16 pb-12 sm:pt-20 sm:pb-16 transition-colors duration-500 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 sm:mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                        Ready to bring your ideas to life? Let’s discuss your project and
                        build something amazing together.
                    </p>
                </div>

                {/* Main Content Grid (1-column on mobile, 3-column on large screens) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">

                    {/* --- Left Column: Contact --- */}
                    {/* Reduced padding and added a subtle transition */}
                    <div className="p-5 sm:p-6 lg:p-8 bg-slate-900 rounded-xl lg:col-span-1 h-fit shadow-2xl shadow-gray-900/50">
                        <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-white">Get In Touch</h3>
                        <div>
                            {contactInfo.map((item) => (
                                <ContactItem key={item.title} {...item} />
                            ))}
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Follow Me</h3>
                            {/* Ensured adequate spacing for social buttons on mobile */}
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map(
                                    (link) =>
                                        link.icon && (
                                            <SocialButton key={link.name} {...link} />
                                        )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Message Form --- */}
                    {/* Reduced padding and added a subtle transition */}
                    <div className="p-5 sm:p-6 lg:p-8 bg-slate-900 rounded-xl lg:col-span-2 shadow-2xl shadow-gray-900/50">
                        <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-white">
                            Send a Message
                        </h3>

                        <form className="space-y-4 sm:space-y-6">
                            {/* Input grid remains 2-column on MD+, stacks on mobile */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    className="p-3 bg-slate-800 rounded-lg text-white border border-slate-700/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                                />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    className="p-3 bg-slate-800 rounded-lg text-white border border-slate-700/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Project inquiry"
                                required
                                className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                            />

                            <textarea
                                placeholder="Tell me about your project..."
                                rows={4} // Reduced rows slightly for mobile compactness
                                required
                                maxLength={500}
                                className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition duration-200"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full py-3 text-base sm:text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;