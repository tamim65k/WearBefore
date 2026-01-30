import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
    const teamMembers = [
        {
            name: 'MD Emon Sarkar',
            id: '08',
            image: 'https://i.pravatar.cc/300?img=12',
            email: 'emon.sarkar@diu.edu.bd',
            phone: '+880 1XXX-XXXXXX',
            role: 'Project Lead',
        },
        {
            name: 'Showrov Shahriarar',
            id: '11',
            image: 'https://i.pravatar.cc/300?img=33',
            email: 'showrov.shahriarar@diu.edu.bd',
            phone: '+880 1XXX-XXXXXX',
            role: 'Technical Lead',
        },
        {
            name: 'Mohammad Tamim Hossen',
            id: '24',
            image: '/tamim.jpeg',
            email: 'tamim.hossen@diu.edu.bd',
            phone: '+880 1XXX-XXXXXX',
            role: 'Frontend Developer',
        },
        {
            name: 'Montasir Hasan Peal',
            id: '27',
            image: 'https://i.pravatar.cc/300?img=68',
            email: 'montasir.peal@diu.edu.bd',
            phone: '+880 1XXX-XXXXXX',
            role: 'UI/UX Designer',
        },
        {
            name: 'Nusrat Jahan',
            id: '38',
            image: 'https://i.pravatar.cc/300?img=47',
            email: 'nusrat.jahan@diu.edu.bd',
            phone: '+880 1XXX-XXXXXX',
            role: 'Content Manager',
        },
        {
            name: 'Nushaiba Kawser Era',
            id: '41',
            image: 'https://i.pravatar.cc/300?img=44',
            email: 'nushaiba.era@diu.edu.bd',
            phone: '+880 1XXX-XXXXXX',
            role: 'QA Specialist',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Team Section */}
                <div className="mb-16 md:mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900">Meet Our Team</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Dedicated professionals from the Department of CSE, DIU
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Profile Image */}
                                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className={`group-hover:scale-110 transition-transform duration-500 ${member.id === '24' ? 'object-cover object-top' : 'object-cover'
                                            }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900 mb-2">
                                            ID: {member.id}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                        <p className="text-sm text-purple-300 font-medium">{member.role}</p>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start space-x-3 group/item">
                                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-purple-100 transition-colors">
                                            <Mail className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-slate-500 mb-1 font-medium">Email</p>
                                            <p className="text-sm font-medium text-slate-900 break-all">{member.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 group/item">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-100 transition-colors">
                                            <Phone className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-500 mb-1 font-medium">Phone</p>
                                            <p className="text-sm font-medium text-slate-900">{member.phone}</p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group/button">
                                        <Send className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                        <span>Send Message</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-4xl mx-auto mb-16 md:mb-24">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                        <div className="bg-gradient-to-br from-slate-900 to-purple-900 p-8 md:p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Send Us a Message</h2>
                            <p className="text-slate-300 text-lg">We'll get back to you within 24 hours</p>
                        </div>

                        <form className="p-8 md:p-12 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-slate-900">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-slate-900">Your Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-900">Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help you?"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-900">Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="Tell us more about your inquiry..."
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-slate-900 placeholder:text-slate-400"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-slate-900 to-purple-900 hover:from-slate-800 hover:to-purple-800 text-white py-5 rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 group"
                            >
                                <span>Send Message</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* University Info */}
                <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Dhaka International University</h3>
                        <p className="text-lg text-slate-300 mb-8">
                            Department of Computer Science & Engineering
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-purple-400" />
                                <span className="text-white">Satarkul, Uttar Badda, Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
