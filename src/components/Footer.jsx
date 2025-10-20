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

const ContactItem = ({ icon: Icon, title, value, href }) => (
    <div className="flex items-start mb-4">
        <div className="p-3 mr-4 rounded-xl bg-purple-600/20 text-purple-400">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-300">{title}</p>
            {href ? (
                <a
                    href={href}
                    className={`text-md text-white transition-colors ${title === "Availability"
                            ? "cursor-default"
                            : "hover:text-purple-400"
                        }`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {value}
                </a>
            ) : (
                <p className="text-md text-white">{value}</p>
            )}
        </div>
    </div>
);

const SocialButton = ({ icon: Icon, name, href, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-start p-4 rounded-xl bg-slate-800 transition-colors ${color}`}
        aria-label={`Follow me on ${name}`}
    >
        <Icon className="w-5 h-5 mr-3" />
        <span className="text-md font-medium text-white">{name}</span>
    </a>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();
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
            <footer className="bg-gray-900 text-gray-400 text-center py-16">
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
        <footer className="bg-gray-50 dark:bg-gray-800 text-white pt-20 py-16 px-6 md:px-12 lg:px-20 w-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-extrabold text-white mb-4">
                        Let's Work Together
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Ready to bring your ideas to life? Let’s discuss your project and
                        build something amazing together.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* --- Left Column: Contact --- */}
                    <div className="p-6 lg:p-8 bg-slate-900 rounded-xl lg:col-span-1 h-fit">
                        <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
                        <div>
                            {contactInfo.map((item) => (
                                <ContactItem key={item.title} {...item} />
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-bold mb-4 text-white">Follow Me</h3>
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
                    <div className="p-6 lg:p-8 bg-slate-900 rounded-xl lg:col-span-2">
                        <h3 className="text-2xl font-bold mb-6 text-white">
                            Send a Message
                        </h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    className="p-3 bg-slate-800 rounded-lg text-white border-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    className="p-3 bg-slate-800 rounded-lg text-white border-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Project inquiry"
                                required
                                className="w-full p-3 bg-slate-800 rounded-lg text-white border-none focus:ring-2 focus:ring-purple-500"
                            />

                            <textarea
                                placeholder="Tell me about your project..."
                                rows={5}
                                required
                                maxLength={500}
                                className="w-full p-3 bg-slate-800 rounded-lg text-white border-none focus:ring-2 focus:ring-purple-500 resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
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
